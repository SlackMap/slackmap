import {ItemUtils, getSpotSubtypeOptions} from './item-utils';
import { AccessType } from './spot-access';
import { ItemType } from '.';
import { DrawType } from './spot-shape-type';

describe('ItemUtils', () => {
  const itemUtils = new ItemUtils();

  test('getSpotSubtypeOptions(SpotCategory.AREA)', () => {
    const options = getSpotSubtypeOptions(DrawType.POLYGON);
    expect(options[0].order < options[1].order).toBe(true);
  });
  // test('getType(ItemType.SPOT)', () => {
  //   const type = getType(ItemType.SPOT);
  //   expect(type.id).toBe(ItemType.SPOT);
  // });
  // test('getSubtype(SpotSubtype.HIGHLINE)', () => {
  //   const type = itemUtils.getSubtype(SpotSubtype.HIGHLINE);
  //   expect(type.id).toBe(SpotSubtype.HIGHLINE);
  // });
  // test('getAccess({}) should return null', () => {
  //   const type = itemUtils.getAccess({});
  //   expect(type).toBe(null);
  // });
  // test('getAccess(null) should return null', () => {
  //   const type = itemUtils.getAccess(null);
  //   expect(type).toBe(null);
  // });
  // test('getAccess({access: }) should return null', () => {
  //   const type = itemUtils.getAccess({access: SpotAccess.FORBIDDEN});
  //   expect(type).toHaveProperty('name', 'forbidden');
  // });
});
