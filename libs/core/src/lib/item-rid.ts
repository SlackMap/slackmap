import { ItemType, ItemSubtype } from './item-type';
import { isNumeric } from "./helpers";
export const RIDS = [
  { id: 's0', name: 'spot' },
  { id: 'u0', name: 'user' },
  { id: 'p0', name: 'photo' },
  { id: 'v0', name: 'video' },
  { id: 'c0', name: 'content' },
  { id: 'o0', name: 'comment' },
  { id: 'm0', name: 'map' },
  { id: 't0', name: 'post' }
];

export class ItemRids {
  static WORLD = 'l0-world';
}
export enum ItemRidPrefix {
  s = ItemType.SPOT,
  u = ItemType.USER,
  p = ItemType.PHOTO,
  v = ItemType.VIDEO,
  c = ItemType.CONTENT,
  o = ItemType.COMMENT,
  m = ItemType.MAP,
  t = ItemType.POST,
  l = ItemType.LOCATION,
  b = ItemType.CLUSTER
}

export const itemRidPrefixes = ['s0', 'u0', 'p0', 'p1', 'v0', 'c0', 'o0', 'm0', 't0', 'l0', 'l1', 'l2', 'l3', 'l4', 'l5', 'l6', 'l7', 'l9'];
export function rid2type(rid: string): ItemType {
  const prefix = rid.substr(0, 1);
  const no = rid.substr(1, 1);
  if (!isNumeric(no)) {
    return null;
  }
  return (ItemRidPrefix as any)[prefix] || null;
}

export function parseRid(rid: string): ParseRidResult {
  if (!rid || typeof rid !== 'string' || isNumeric(rid)) {
    return {
      valid: false
    };
  }
  rid = rid.trim();

  const prefix: string = rid.substr(0, 2);
  if (itemRidPrefixes.indexOf(prefix) >= 0) {
    return {
      valid: true,
      rid: rid,
      type: (ItemRidPrefix as any)[prefix.substr(0, 1)] || null
    };
  }

  return {
    valid: false
  };
}

export interface ParseRidResult {
  valid: boolean;
  rid?: string;
  type?: ItemType;
  subtype?: ItemSubtype;
}
