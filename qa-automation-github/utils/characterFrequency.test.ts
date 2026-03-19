import { describe, it, expect } from 'vitest';
import { characterFrequency } from './characterFrequency.js';

describe('characterFrequency', () => {
  it('"hello world" → h:1, e:1, l:3, o:2, w:1, r:1, d:1', () => {
    expect(characterFrequency('hello world')).toBe('h:1, e:1, l:3, o:2, w:1, r:1, d:1');
  });

  it('empty string → empty output', () => {
    expect(characterFrequency('')).toBe('');
  });

  it('all same characters', () => {
    expect(characterFrequency('aaaa')).toBe('a:4');
  });

  it('case sensitivity (A vs a)', () => {
    expect(characterFrequency('Aa')).toBe('A:1, a:1');
  });

  it('special characters and punctuation', () => {
    expect(characterFrequency('hello!')).toBe('h:1, e:1, l:2, o:1, !:1');
  });

  it('unicode/emoji characters', () => {
    const result = characterFrequency('a😀a');
    expect(result).toContain('a:2');
    expect(result).toContain('😀:1');
  });

  it('whitespace-only string', () => {
    expect(characterFrequency('   ')).toBe('');
  });

  it('single character string', () => {
    expect(characterFrequency('x')).toBe('x:1');
  });

  it('very long string (performance)', () => {
    const long = 'a'.repeat(10000) + 'b';
    const result = characterFrequency(long);
    expect(result).toContain('a:10000');
    expect(result).toContain('b:1');
  });
});
