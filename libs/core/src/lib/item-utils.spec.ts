import {ItemUtils} from './item-utils';
import {SpotCategory, ItemType, SpotSubtype, SpotAccess} from './item';

describe('ItemUtils', () => {
  const itemUtils = new ItemUtils();
  test('getSpotSubtypeOptions(SpotCategory.AREA)', () => {
    const options = itemUtils.getSpotSubtypeOptions(SpotCategory.AREA);
    expect(options[0].option_order < options[1].option_order).toBe(true);
  });
  test('getType(ItemType.SPOT)', () => {
    const type = itemUtils.getType(ItemType.SPOT);
    expect(type.id).toBe(ItemType.SPOT);
  });
  test('getSubtype(SpotSubtype.HIGHLINE)', () => {
    const type = itemUtils.getSubtype(SpotSubtype.HIGHLINE);
    expect(type.id).toBe(SpotSubtype.HIGHLINE);
  });
  test('getAccess({}) should return null', () => {
    const type = itemUtils.getAccess({});
    expect(type).toBe(null);
  });
  test('getAccess(null) should return null', () => {
    const type = itemUtils.getAccess(null);
    expect(type).toBe(null);
  });
  test('getAccess({access: }) should return null', () => {
    const type = itemUtils.getAccess({access: SpotAccess.FORBIDDEN});
    expect(type).toHaveProperty('name', 'forbidden');
  });
});
