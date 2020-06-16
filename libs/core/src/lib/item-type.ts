export type Rid = string;

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

export enum ItemSubtype {

  SPOT_HIGHLINE = 1,
  SPOT_MIDLINE = 2,
  SPOT_LONGLINE = 3,
  SPOT_WATERLINE = 4,
  SPOT_RODEOLINE = 5,
  SPOT_SLACKLINE = 6,
  SPOT_TRICKLINE = 7,
  SPOT_SPACELINE = 8,

  SPOT_AREA = 50,
  SPOT_PARK = 52,
  SPOT_GYM = 51,
  SPOT_URBAN = 54,
  SPOT_MOUNTAIN = 55,

  SPOT_WATERLINE_AREA = 53,
  SPOT_HIGHLINE_AREA = 54,

  SPOT_DIVING_POOL = 54,

  LOCATION_WORLD = 100,
  LOCATION_CONTINENT = 101,
  LOCATION_COUNTRY = 102,
  LOCATION_REGION = 103,
  LOCATION_COUNTY = 104,
  LOCATION_CITY = 105,
  LOCATION_DISTRICT = 106,
  LOCATION_STREET = 107,
  LOCATION_GEOLOCATION = 109,

  CLUSTER_CLUSTER = 150,
  CLUSTER_SPOT = 151,

  CONTENT_NOTES = 201,
  CONTENT_DESCRIPTION = 202,
  CONTENT_ANCHORS = 203,
  CONTENT_ASCEND = 204,
  CONTENT_ACCESS = 205,

  COMMENT_COMMENT = 300,
  COMMENT_REPLY = 301,

  POST_TEXT = 400,
  POST_USER = 401,
  POST_SPOT = 402,
  POST_PHOTO = 403,

  USER_ADMIN = 500,
  USER_USER = 501,

  PHOTO_PHOTO = 600,

  MAP_MAP = 650,
};

export enum SpotSubtype {
  HIGHLINE = ItemSubtype.SPOT_HIGHLINE,
  MIDLINE = ItemSubtype.SPOT_MIDLINE,
  LONGLINE = ItemSubtype.SPOT_LONGLINE,
  WATERLINE = ItemSubtype.SPOT_WATERLINE,
  RODEOLINE = ItemSubtype.SPOT_RODEOLINE,
  SLACKLINE = ItemSubtype.SPOT_SLACKLINE,
  TRICKLINE = ItemSubtype.SPOT_TRICKLINE,
  SPACELINE = ItemSubtype.SPOT_SPACELINE,
  AREA = ItemSubtype.SPOT_AREA,
  PARK = ItemSubtype.SPOT_PARK,
  GYM = ItemSubtype.SPOT_GYM,
  URBAN = ItemSubtype.SPOT_URBAN,
  MOUNTAIN = ItemSubtype.SPOT_MOUNTAIN,
  WATERLINE_AREA = ItemSubtype.SPOT_WATERLINE_AREA,
  HIGHLINE_AREA = ItemSubtype.SPOT_HIGHLINE_AREA,
  DIVING_POOL = ItemSubtype.SPOT_DIVING_POOL,
}

export type LocationSubtype =
  ItemSubtype.LOCATION_WORLD |
  ItemSubtype.LOCATION_CITY |
  ItemSubtype.LOCATION_CONTINENT |
  ItemSubtype.LOCATION_COUNTRY |
  ItemSubtype.LOCATION_COUNTY |
  ItemSubtype.LOCATION_DISTRICT |
  ItemSubtype.LOCATION_GEOLOCATION |
  ItemSubtype.LOCATION_REGION |
  ItemSubtype.LOCATION_STREET;

export enum ClusterSubtype {
  CLUSTER = ItemSubtype.CLUSTER_CLUSTER,
  SPOT    = ItemSubtype.CLUSTER_SPOT,
}

export type ContentSubtype =
  ItemSubtype.CONTENT_ACCESS |
  ItemSubtype.CONTENT_ANCHORS |
  ItemSubtype.CONTENT_ASCEND |
  ItemSubtype.CONTENT_DESCRIPTION |
  ItemSubtype.CONTENT_NOTES;

export type CommentSubtype = ItemSubtype.COMMENT_COMMENT | ItemSubtype.COMMENT_REPLY;

export type PostSubtype =
  ItemSubtype.POST_TEXT |
  ItemSubtype.POST_PHOTO |
  ItemSubtype.POST_SPOT |
  ItemSubtype.POST_USER;

export type UserSubtype = ItemSubtype.USER_USER | ItemSubtype.USER_ADMIN;

export type PhotoSubtype = ItemSubtype.PHOTO_PHOTO;

export type MapSubtype = ItemSubtype.MAP_MAP;

export type ItemSubtypes = ItemSubtype | SpotSubtype | ClusterSubtype;
