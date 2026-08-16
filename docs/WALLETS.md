# Wallets (2026-08-16, session 1 + session 2)

Public info only. Seeds/keys are in `/home/user/crypto/` with mode 0600 and are
**never** committed to any repo.

## BTC — self-custody (BIP84 native segwit, mainnet)
- Receive address: `bc1qfp5x9pn5sp3ntz4079kjq073jrppldnez4csqs`
- File: `/home/user/crypto/wallet.json` (mode 600)
- Verification script: `scripts/verify-btc-wallet.js` → **VERIFIED ✓**
  (mnemonic checksum valid; derived native-segwit address round-trips exactly)
- Chain state: 0 txs, 0 sats (verified live via blockstream.info API)

## ETH — self-custody (EIP-1559 account, mainnet)
- Address: `0x08A51879900F2c122e33437307F798C6C5254ddf`
- File: `/home/user/crypto/eth-wallet.json` (mode 600)
- Generated with ethers 6.17.0 (BIP-44 m/44'/60'/0'/0/0)
- Chain state: 0 wei (verified live via public RPC)

## Notes
- Keys only ever touch this VM; no seed phrase ever leaves it.
- Funding flows: legitimate earned income only (see OPPORTUNITIES.md).
- Check-in script polls public chain state each run (never secrets).