#!/usr/bin/env node
// Cross-exchange spread scanner (Opportunity 2 prototype).
// Paper-only: reads public tickers, computes net-of-fee spreads, logs signals.
// No orders are placed. Fee assumptions are explicit.
const https = require('https');
const fs = require('fs');
const path = require('path');

const PAIRS = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'BNBUSDT', 'XRPUSDT', 'ADAUSDT'];
// Maker fee assumptions per exchange (conservative default 0.10% unless known slightly lower)
const FEES = { binance: 0.0008, kraken: 0.0010, bybit: 0.0008, okx: 0.0008, coinbase: 0.0010 };

function get(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'spread-scanner/0.1' } }, (res) => {
      let d = '';
      res.on('data', (c) => (d += c));
      res.on('end', () => {
        try { resolve(JSON.parse(d)); } catch { reject(new Error('bad json')); }
      });
    });
    req.on('error', reject);
    req.setTimeout(8000, () => req.destroy(new Error('timeout')));
  });
}

async function tickBinance(pair) {
  const j = await get(`https://api.binance.com/api/v3/ticker/price?symbol=${pair}`);
  return { bid: +j.price, ask: +j.price }; // Binance public price endpoint
}
async function tickKraken(pair) {
  // Kraken uses XBTUSD / ETHUSD style
  let sym = pair === 'BTCUSDT' ? 'XBTUSDT' : pair;
  const j = await get(`https://api.kraken.com/0/public/Ticker?pair=${sym}`);
  const k = Object.values(j.result || {})[0];
  return k ? { bid: +k.b[0], ask: +k.a[0] } : null;
}
async function tickBybit(pair) {
  const j = await get(`https://api.bybit.com/v5/market/tickers?category=spot&symbol=${pair}`);
  const k = j.result?.list?.[0];
  return k ? { bid: +k.bid1Price, ask: +k.ask1Price } : null;
}
async function tickOKX(pair) {
  const j = await get(`https://www.okx.com/api/v5/market/ticker?instId=${pair}`);
  const k = j.data?.[0];
  return k ? { bid: +k.bidPx, ask: +k.askPx } : null;
}
async function tickCoinbase(pair) {
  const sym = pair.replace('USDT', '-USD');
  const j = await get(`https://api.exchange.coinbase.com/products/${sym}/ticker`);
  return j ? { bid: +j.bid, ask: +j.ask } : null;
}

const TICKERS = {
  binance: tickBinance, kraken: tickKraken, bybit: tickBybit, okx: tickOKX, coinbase: tickCoinbase,
};

// Net-of-fee cross-exchange arb check: buy on venue B ask, sell on venue A bid.
function score(pair, quotes, minEdge) {
  const exNames = Object.keys(quotes).filter((e) => quotes[e]);
  const signals = [];
  for (let i = 0; i < exNames.length; i++) {
    for (let j = 0; j < exNames.length; j++) {
      if (i === j) continue;
      const A = exNames[i], B = exNames[j];
      const bidAtA = quotes[A].bid, askAtB = quotes[B].ask;
      const fees = FEES[A] + FEES[B];
      const gross = (bidAtA / askAtB - 1);
      const net = gross - fees;
      if (net > minEdge) {
        signals.push({
          pair, buy: B, sell: A,
          buyAsk: askAtB, sellBid: bidAtA,
          grossPct: +(gross * 100).toFixed(4),
          feesPct: +(fees * 100).toFixed(3),
          netPct: +(net * 100).toFixed(4),
          ts: new Date().toISOString(),
        });
      }
    }
  }
  return signals;
}

async function main() {
  const minEdge = +(process.env.MIN_EDGE_PCT || 0.12); // percentage net edge required
  const out = path.join(__dirname, '..', 'state', 'arb-signals.jsonl');
  await fs.promises.mkdir(path.dirname(out), { recursive: true });
  const signals = [];
  for (const pair of PAIRS) {
    const quotes = {};
    for (const [ex, fn] of Object.entries(TICKERS)) {
      try { quotes[ex] = await fn(pair); } catch { quotes[ex] = null; }
    }
    signals.push(...score(pair, quotes, minEdge));
  }
  const line = JSON.stringify({ ts: new Date().toISOString(), signals: signals.length, pairs: PAIRS.length });
  fs.appendFileSync(out, line + '\n');
  if (signals.length) {
    for (const s of signals) fs.appendFileSync(out, JSON.stringify(s) + '\n');
  }
  const summary = { ts: new Date().toISOString(), signals }
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((e) => { console.error('scanner error:', e.message); process.exit(1); });