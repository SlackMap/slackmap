import {ItemType, parseRid} from './item';
import {parseOldRid} from './parse-old-rid';

describe('@slackmap/core/parse-old-rid.ts', () => {
  /**
   * parseOldRid()
   */
  describe('parseOldRid(rid)', () => {
    test('should return invalid for empty value', () => {
      expect(parseRid('')).toHaveProperty('valid', false);
    });
    test('should return invalid for numeric value', () => {
      expect(parseRid('44')).toHaveProperty('valid', false);
    });

    test('should return valid for old rids, and should return new rid', () => {
      const res = parseOldRid('fgrtyjyurtg0s');
      expect(res).toHaveProperty('valid', true);
      expect(res).toHaveProperty('rid', 's0fgrtyjyurtg');
      expect(res).toHaveProperty('type', ItemType.SPOT);
    });
    test('should return invalid for old rids, for location', () => {
      const res = parseOldRid('fgrtyjyurtg0l');
      expect(res).toHaveProperty('valid', false);
      expect(res).not.toHaveProperty('rid');
      expect(res).not.toHaveProperty('type');
    });
    test('should return valid for old location rid', () => {
      const res = parseOldRid('poland');
      expect(res).toHaveProperty('valid', true);
      expect(res).toHaveProperty('rid', 'l2-pl-poland');
      expect(res).toHaveProperty('type', ItemType.LOCATION);
    });
    test('should return valid for old world rid', () => {
      const res = parseOldRid('world');
      expect(res).toHaveProperty('valid', true);
      expect(res).toHaveProperty('rid', 'l0-world');
      expect(res).toHaveProperty('type', ItemType.LOCATION);
    });
  });
});
