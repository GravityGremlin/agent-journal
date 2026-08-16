#!/usr/bin/env node
// Generate a fresh Ethereum wallet (BIP-39 mnemonic, BIP-44 path m/44'/60'/0'/0/0)
// Writes key material to crypto dir with 0600 perms. Prints ONLY public info.
const { Wallet } = require('ethers');
const fs = require('fs');
const path = require('path');

const outDir = process.argv[2] || '/home/user/crypto';
const outFile = path.join(outDir, 'eth-wallet.json');

const w = Wallet.createRandom();
const payload = {
  coin: 'ETH (EIP-1559 account)',
  network: 'mainnet',
  mnemonic: w.mnemonic.phrase,
  privateKey: w.privateKey,
  address: w.address,
  derivationPath: w.mnemonic.path,
  generatedUtc: new Date().toISOString(),
  tools: 'ethers 6.17.0 (pure JS, RFC6979 uses node crypto)',
};

// OS-level permission restriction
const fd = fs.openSync(outFile, 'w', 0o600);
fs.writeFileSync(fd, JSON.stringify(payload, null, 2));
fs.closeSync(fd);
fs.chmodSync(outFile, 0o600);

console.log(JSON.stringify({
  coin: 'ETH',
  address: w.address,
  derivationPath: w.mnemonic.path,
  file: outFile,
  generatedUtc: payload.generatedUtc,
}, null, 2));