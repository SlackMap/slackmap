import { rid2type, ItemType, AccessType, PhotoSize, DislikeReason, ItemRidPrefix, parseRid, ItemSubtype } from ".";

describe('@slackmap/core/item.ts', () => {
  describe('rid2type(rid:string)', () => {
    test('should return spot type', () => {
      expect(rid2type('s024fggdhdghgh')).toBe(ItemType.SPOT);
    });
    test('should return photo type', () => {
      expect(rid2type('p0bmku6rdf')).toBe(ItemType.PHOTO);
    });
    test('should return video type', () => {
      expect(rid2type('v0nhfdx')).toBe(ItemType.VIDEO);
    });
    test('should return null', () => {
      expect(rid2type('poland')).toBeNull();
    });
  });
  describe('ItemType', () => {
    test('should return spot type', () => {
      expect(ItemType.SPOT).toBe(1);
    });
  });
  describe('SpotSubtype', () => {
    test('should return spot highline subtype', () => {
      expect(ItemSubtype.SPOT_HIGHLINE).toBe(1);
    });
  });
  describe('SpotAccess', () => {
    test('should return open access', () => {
      expect(AccessType.OPEN).toBe(1);
    });
  });
  describe('PhotoSize', () => {
    test('should return XS_S photo size', () => {
      expect(PhotoSize.XS_S).toBe('xs_s');
    });
  });
  describe('DislikeReason', () => {
    test('should return DOES_NOT_EXISTS reason', () => {
      expect(DislikeReason.DOES_NOT_EXISTS).toBe(1);
    });
  });

  describe('ItemRidPrefix', () => {
    test('should return ItemType.CONTENT for c0 prefix', () => {
      expect(ItemRidPrefix.c).toBe(ItemType.CONTENT);
    });
  });

  /**
   * parseRid()
   */
  describe('parseRid(rid)', () => {
    test('should return invalid for empty value', () => {
      expect(parseRid('')).toHaveProperty('valid', false);
    });
    test('should return invalid for numeric value', () => {
      expect(parseRid('44')).toHaveProperty('valid', false);
    });
    test('should return valid for valid rid, even if the end is old', () => {
      const res = parseRid('s0fgrtyjyurtg0s');
      expect(res).toHaveProperty('valid', true);
      expect(res).toHaveProperty('rid', 's0fgrtyjyurtg0s');
      expect(res).toHaveProperty('type', ItemType.SPOT);
    });
    test('should return valid for valid rid', () => {
      const res = parseRid('v0fgrtyjyurtg');
      expect(res).toHaveProperty('valid', true);
      expect(res).toHaveProperty('rid', 'v0fgrtyjyurtg');
      expect(res).toHaveProperty('type', ItemType.VIDEO);
    });
    test('should return invalid for old rids, and should return new rid', () => {
      const res = parseRid('fgrtyjyurtg0s');
      expect(res).toHaveProperty('valid', false);
      expect(res).not.toHaveProperty('rid');
      expect(res).not.toHaveProperty('type');
    });
    test('should return invalid for old rids, with invalid type', () => {
      const res = parseRid('fgrtyjyurtg0q');
      expect(res).toHaveProperty('valid', false);
      expect(res).not.toHaveProperty('rid');
    });
    test('should return invalid for valid rids, with invalid type', () => {
      const res = parseRid('q0fgrtyjyurtg0q');
      expect(res).toHaveProperty('valid', false);
      expect(res).not.toHaveProperty('rid');
    });
  });
});
