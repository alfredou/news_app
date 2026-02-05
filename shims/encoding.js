// Minimal shim for the `encoding` package used by node-fetch in some environments.
// Provides a basic `convert` implementation and `encodingExists` to satisfy runtime checks.
const Buffer = require('buffer').Buffer;

function convert(input, to, from) {
  // If already a Buffer, return as-is
  if (Buffer.isBuffer(input)) return input;
  // If input is string, create buffer from specified source encoding or utf8
  if (typeof input === 'string') {
    const src = (from && from.toLowerCase()) || 'utf8';
    return Buffer.from(input, src);
  }
  // Fallback: stringify
  return Buffer.from(String(input));
}

function encodingExists(name) {
  return true;
}

module.exports = { convert, encodingExists };
