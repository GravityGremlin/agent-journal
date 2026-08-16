#!/usr/bin/env node
// Verify existing BTC wallet: derive native segwit address from stored mnemonic
// and confirm it matches wallet.json's recorded receive address.
const bip39 = require('bip39');
const bip32 = require('bip32');
const bech32mod = require('bech32');
const bech32 = bech32mod.bech32;
const ecc = require('@bitcoinerlab/secp256k1');
const crypto = require('crypto');
const fs = require('fs');

const p = process.argv[2] || '/home/user/crypto/wallet.json';
const wallet = JSON.parse(fs.readFileSync(p, 'utf8'));
const mnemonic = wallet.mnemonic;

if (!bip39.validateMnemonic(mnemonic)) { console.error('FAIL: invalid mnemonic'); process.exit(1); }

const BIP32Factory = bip32.BIP32Factory;
const root = BIP32Factory(ecc).fromSeed(bip39.mnemonicToSeedSync(mnemonic));
const node = root.derivePath("m/84'/0'/0'/0/0");      // BIP84 external chain, index 0
const pubKey = node.publicKey;
const sha = crypto.createHash('sha256').update(pubKey).digest();
const ripemd = crypto.createHash('ripemd160').update(sha).digest();
const words = bech32.toWords(ripemd);
const addr = bech32.encode('bc', [0, ...words]);       // witness v0 => p2wpkh

console.log('stored receive_address_0 :', wallet.receive_address_0);
console.log('derived native segwit    :', addr);
console.log('xpub matches record?     :', root.neutered().toBase58() === wallet.xpub);
console.log('checksum valid?          :', bip39.validateMnemonic(mnemonic));
console.log('RESULT:', addr === wallet.receive_address_0 ? 'VERIFIED ✓' : 'MISMATCH ✗');

process.exit(addr === wallet.receive_address_0 ? 0 : 1);