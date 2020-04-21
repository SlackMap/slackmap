
import { ItemType } from '@slackmap/core';
import { RidGenerator } from './rid-generator';

describe('RidGenerator', () => {
  const itemRid = new RidGenerator();
  describe('itemRid.generateItemRid(ItemType)', () => {
    test('should generate spot rid type', () => {
      expect(typeof itemRid.forItem(ItemType.SPOT)).toBe('string');
      expect(itemRid.forItem(ItemType.SPOT).substr(0, 2)).toBe('s0');
    });

    test('should generate video rid type', () => {
      expect(typeof itemRid.forItem(ItemType.VIDEO)).toBe('string');
      expect(itemRid.forItem(ItemType.VIDEO).substr(0, 2)).toBe('v0');
    });

    test('should throw error for location rid generation', () => {
      expect(() => itemRid.forItem(ItemType.LOCATION)).toThrowError(Error);
    });
  });
  describe('itemRid.generateCountryRid(code, name)', () => {
    test('should generate rid for poland', () => {
      expect(itemRid.forCountry('PL', 'Poland')).toEqual('l2-pl-poland');
    });

    test('should throw error when no code provided', () => {
      expect(() => itemRid.forCountry('', 'Poland')).toThrowError(Error);
    });

    test('should throw error when no name provided', () => {
      expect(() => itemRid.forCountry('PL', '')).toThrowError(Error);
    });
  });
  describe('photoRidGenerator(fileName)', () => {
    test('should generate rid for filename', () => {
      const rid = itemRid.forPhoto('jakos-gdzies-cos.jpg');
      expect(typeof rid).toBe('string');
      expect(rid.substr(rid.length - 4)).toBe('.jpg');
      expect(rid.substr(0, 2)).toBe('p0');
    });
  });
});
