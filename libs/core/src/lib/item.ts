export function isNumeric(n: any) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
export class ItemRids {
  static WORLD = 'l0-world';
}
export enum ItemType {
  SPOT = 1,
  USER = 4,
  PHOTO = 5,
  VIDEO = 6,
  LOCATION = 7,
  CONTENT = 8,
  RIG = 9,
  CLUSTER = 10,
  MAP = 11,
  COMMENT = 12,
  POST = 13
}

export type ItemSubtype = SpotSubtype | LocationSubtype | ContentSubtype | CommentSubtype | PostSubtype | UserSubtype | PhotoSubtype;

export enum SpotSubtype {
  HIGHLINE = 1,
  MIDLINE = 2,
  LONGLINE = 3,
  WATERLINE = 4,
  RODEOLINE = 5,
  SLACKLINE = 6,
  TRICKLINE = 7,
  SPACELINE = 8,

  AREA = 50,
  PARK = 52,
  GYM = 51,
  URBAN = 54,
  MOUNTAIN = 55,

  WATERLINE_AREA = 53,
  HIGHLINE_AREA = 54
}
export enum SpotCategory {
  LINE = 'LINE',
  AREA = 'AREA'
}
export enum LocationSubtype {
  WORLD = 100,
  CONTINENT = 101,
  COUNTRY = 102,
  REGION = 103,
  COUNTY = 104,
  CITY = 105,
  DISTRICT = 106,
  STREET = 107,

  GEOLOCATION = 109
}

export enum ClusterSubtype {
  CLUSTER = 150,
  SPOT = 151
}
export enum ContentSubtype {
  NOTES = 201,
  DESCRIPTION = 202,
  ANCHORS = 203,
  ASCEND = 204,
  ACCESS = 205
}
export enum CommentSubtype {
  COMMENT = 300,
  REPLY = 301
}
export enum PostSubtype {
  TEXT = 400,
  USER = 401,
  SPOT = 402,
  PHOTO = 403
}

export enum UserSubtype {
  ADMIN = 500,
  USER = 501
}

export enum PhotoSubtype {
  PHOTO = 600
}

export enum SpotAccess {
  OPEN = 1,
  RESTRICTED = 2,
  FORBIDDEN = 3,
  UNKNOWN = 4
}

export enum PhotoSize {
  XS_S = 'xs_s',
  S_S = 's_s',
  L = 'l'
}

export enum DislikeReason {
  DOES_NOT_EXISTS = 1,
  IT_IS_NOT_HELPFUL = 2,
  JUST_DONT = 3
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
