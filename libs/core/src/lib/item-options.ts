import {
  ItemType,
  SpotAccess,
  SpotCategory,
  SpotSubtype,
  LocationSubtype,
  ItemSubtype,
  ContentSubtype,
  CommentSubtype,
  PostSubtype
} from './item';

export interface TypeOption {
  id: ItemType;
  name: string;
  label: string;
}
export interface SubtypeOption {
  id: ItemSubtype;
  type: ItemType;
  category?: SpotCategory;
  name: string;
  desc?: string;
  label: string;
  color?: string;
  option_order?: number;
}
export interface AccessOption {
  id: SpotAccess;
  name: string;
  label: string;
  cls: string;
}
export const RIDS = [
  {id: 's0', name: 'spot'},
  {id: 'u0', name: 'user'},
  {id: 'p0', name: 'photo'},
  {id: 'v0', name: 'video'},
  {id: 'c0', name: 'content'},
  {id: 'o0', name: 'comment'},
  {id: 'm0', name: 'map'},
  {id: 't0', name: 'post'}
];
export const TYPES: TypeOption[] = [
  // {id: 1, name: 'line', label: 'Line'},
  // {id: 2, name: 'area', label: 'Area'},
  {id: ItemType.SPOT, name: 'spot', label: 'Spot'},
  {id: ItemType.USER, name: 'user', label: 'User'},
  {id: ItemType.PHOTO, name: 'photo', label: 'Photo'},
  {id: ItemType.VIDEO, name: 'video', label: 'Video'},
  {id: ItemType.LOCATION, name: 'location', label: 'Location'},
  {id: ItemType.CONTENT, name: 'content', label: 'Content'},
  {id: ItemType.RIG, name: 'rig', label: 'Rig'},
  {id: ItemType.CLUSTER, name: 'cluster', label: 'Cluster'},
  {id: ItemType.MAP, name: 'map', label: 'Map'},
  {id: ItemType.COMMENT, name: 'comment', label: 'Comment'},
  {id: ItemType.POST, name: 'post', label: 'Post'}
];
export const SUBTYPES: SubtypeOption[] = [
  // SPOT
  {
    id: SpotSubtype.HIGHLINE,
    type: ItemType.SPOT,
    category: SpotCategory.LINE,
    name: 'highline',
    label: 'Highline',
    color: '#DD6363',
    option_order: 2
  },
  {
    id: SpotSubtype.MIDLINE,
    type: ItemType.SPOT,
    category: SpotCategory.LINE,
    name: 'midline',
    label: 'Midline',
    color: '#dc9e67',
    option_order: 3
  },
  {
    id: SpotSubtype.LONGLINE,
    type: ItemType.SPOT,
    category: SpotCategory.LINE,
    name: 'longline',
    label: 'Longline',
    color: '#DEDE6E',
    option_order: 4
  },
  {
    id: SpotSubtype.WATERLINE,
    type: ItemType.SPOT,
    category: SpotCategory.LINE,
    name: 'waterline',
    label: 'Waterline',
    color: '#8F8EFF',
    option_order: 5
  },
  {
    id: SpotSubtype.RODEOLINE,
    type: ItemType.SPOT,
    category: SpotCategory.LINE,
    name: 'rodeoline',
    label: 'Rodeoline',
    color: '#E787FE',
    option_order: 6
  },
  {
    id: SpotSubtype.SLACKLINE,
    type: ItemType.SPOT,
    category: SpotCategory.LINE,
    name: 'slackline',
    label: 'Simple Line',
    color: '#BCBCBC',
    option_order: 1
  },
  {
    id: SpotSubtype.TRICKLINE,
    type: ItemType.SPOT,
    category: SpotCategory.LINE,
    name: 'trickline',
    label: 'Trickline',
    color: '#000000',
    option_order: 7
  },
  {
    id: SpotSubtype.SPACELINE,
    type: ItemType.SPOT,
    category: SpotCategory.LINE,
    name: 'spaceline',
    label: 'Spaceline',
    color: '#7de5dc'
  },

  {
    id: SpotSubtype.AREA,
    type: ItemType.SPOT,
    category: SpotCategory.AREA,
    name: 'area',
    label: 'Slack Area',
    color: '#BCBCBC',
    option_order: 1
  },
  {
    id: SpotSubtype.PARK,
    type: ItemType.SPOT,
    category: SpotCategory.AREA,
    name: 'park',
    label: 'Park',
    color: '#BCBCBC',
    option_order: 2
  },
  {
    id: SpotSubtype.MOUNTAIN,
    type: ItemType.SPOT,
    category: SpotCategory.AREA,
    name: 'mountain',
    label: 'Mountain',
    color: '#BCBCBC',
    option_order: 3
  },
  {
    id: SpotSubtype.GYM,
    type: ItemType.SPOT,
    category: SpotCategory.AREA,
    name: 'gym',
    label: 'Gym',
    color: '#BCBCBC',
    option_order: 4
  },
  {
    id: SpotSubtype.URBAN,
    type: ItemType.SPOT,
    category: SpotCategory.AREA,
    name: 'urban',
    label: 'Urban',
    color: '#BCBCBC',
    option_order: 5
  },

  // LOCATION
  {id: LocationSubtype.WORLD, type: ItemType.LOCATION, name: 'world', label: 'World'},
  {id: LocationSubtype.CONTINENT, type: ItemType.LOCATION, name: 'continent', label: 'Continent'},
  {id: LocationSubtype.COUNTRY, type: ItemType.LOCATION, name: 'country', label: 'Country'},
  {id: LocationSubtype.REGION, type: ItemType.LOCATION, name: 'region', label: 'Region'},
  {id: LocationSubtype.CITY, type: ItemType.LOCATION, name: 'city', label: 'City'},
  {id: LocationSubtype.DISTRICT, type: ItemType.LOCATION, name: 'district', label: 'District'},
  {id: LocationSubtype.STREET, type: ItemType.LOCATION, name: 'street', label: 'Street'},
  {id: LocationSubtype.GEOLOCATION, type: ItemType.LOCATION, name: 'google', label: 'Google'},

  // CONTENT
  {
    id: ContentSubtype.ACCESS,
    type: ItemType.CONTENT,
    name: 'access',
    label: 'Access',
    desc: 'describe any access issues, how to get permission...'
  },
  {
    id: ContentSubtype.DESCRIPTION,
    type: ItemType.CONTENT,
    name: 'description',
    label: 'Description',
    desc: 'general description'
  },
  {
    id: ContentSubtype.ANCHORS,
    type: ItemType.CONTENT,
    name: 'anchors',
    label: 'Anchors',
    desc: 'what type of anchors, what gear you need...'
  },
  {
    id: ContentSubtype.ASCEND,
    type: ItemType.CONTENT,
    name: 'ascend',
    label: 'Ascend',
    desc: `how to get to this spot and it's anchors...`
  },
  {
    id: ContentSubtype.NOTES,
    type: ItemType.CONTENT,
    name: 'notes',
    label: 'Notes',
    desc: 'extra stuff to keep in mind...'
  },

  // COMMENT
  {id: CommentSubtype.COMMENT, type: ItemType.COMMENT, name: 'comment', label: 'Comment'},
  {id: CommentSubtype.REPLY, type: ItemType.COMMENT, name: 'reply', label: 'Reply'},

  // POST
  {id: PostSubtype.TEXT, type: ItemType.POST, name: 'text', label: 'Text'},
  {id: PostSubtype.USER, type: ItemType.POST, name: 'user', label: 'User'},
  {id: PostSubtype.SPOT, type: ItemType.POST, name: 'spot', label: 'Spot'},
  {id: PostSubtype.PHOTO, type: ItemType.POST, name: 'photo', label: 'Photo'}
];

export const ACCESS: AccessOption[] = [
  {id: SpotAccess.OPEN, name: 'open', label: 'Open', cls: 'success'},
  {
    id: SpotAccess.RESTRICTED,
    name: 'restricted',
    label: 'Restricted',
    cls: 'warning'
  },
  {
    id: SpotAccess.FORBIDDEN,
    name: 'forbidden',
    label: 'Forbidden',
    cls: 'danger'
  },
  {
    id: SpotAccess.UNKNOWN,
    name: 'unknown',
    label: `I don't know`,
    cls: 'default'
  }
];

export const PHOTO_SIZES = {
  xs_s: true,
  s_s: true,
  l: true
};

export const PHOTO_PLACEHOLDER = {
  xs_s: '/assets/images/image-placeholder-xs.jpg',
  s_s: '/assets/images/image-placeholder-xs.jpg',
  l: '/assets/images/image-placeholder-xs.jpg'
};

export const DISLIKE_REASONS = {
  1: `does not exist`,
  2: `it's not helpful`,
  3: `just don't`
};

export interface ClimbingOption {
  id: number;
  aus: string;
  fr: string;
  uk: string;
  yds: string;
  bouldering: string;
}
export const CLIMBING_SCALES = {
  aus: 'Australia',
  fr: 'France',
  uk: 'UK',
  yds: 'USA (YDS)',
  bouldering: 'Bouldering Scale'
};

export const CLIMBING_OPTIONS: ClimbingOption[] = [
  {
    id: 0,
    aus: 'no climbing',
    fr: 'no climbing',
    uk: 'no climbing',
    yds: 'no climbing',
    bouldering: 'no climbing'
  },
  {
    id: 5,
    aus: '4',
    fr: '1',
    uk: 'M',
    yds: '5.1',
    bouldering: 'VB'
  },
  {
    id: 6,
    aus: '6',
    fr: '2',
    uk: 'M',
    yds: '5.2',
    bouldering: 'VB'
  },
  {
    id: 7,
    aus: '6',
    fr: '2+',
    uk: '3a VD',
    yds: '5.3',
    bouldering: 'VB'
  },
  {
    id: 8,
    aus: '8',
    fr: '3-',
    uk: '3b VD, 3B HVD',
    yds: '5.4',
    bouldering: 'VB'
  },
  {
    id: 9,
    aus: '10',
    fr: '3',
    uk: '3c HVD, 3c S',
    yds: '5.5',
    bouldering: 'VB'
  },
  {
    id: 10,
    aus: '12',
    fr: '3+',
    uk: '4a S, 4a HS',
    yds: '5.6',
    bouldering: 'VB'
  },
  {
    id: 11,
    aus: '14',
    fr: '4',
    uk: '4a VS, 4b HS',
    yds: '5.7',
    bouldering: 'VB'
  },
  {
    id: 12,
    aus: '14, 16',
    fr: '4+',
    uk: '4c VS',
    yds: '5.8',
    bouldering: 'VB'
  },
  {
    id: 13,
    aus: '16',
    fr: '5',
    uk: '4c HVS',
    yds: '5.9',
    bouldering: 'VB'
  },
  {
    id: 14,
    aus: '18',
    fr: '5+',
    uk: '5b HVS',
    yds: '5.10a',
    bouldering: 'VB'
  },
  {
    id: 15,
    aus: '19',
    fr: '6a',
    uk: '5a E1',
    yds: '5.10b',
    bouldering: 'VB'
  },
  {
    id: 16,
    aus: '19,20',
    fr: '6a+',
    uk: '5b E2',
    yds: '5.10c',
    bouldering: 'VB'
  },
  {
    id: 17,
    aus: '20,21',
    fr: '6b',
    uk: '6a E2, 5C E3',
    yds: '5.10d',
    bouldering: 'V0'
  },
  {
    id: 18,
    aus: '21',
    fr: '6b+',
    uk: '6a E3',
    yds: '5.11a',
    bouldering: 'V0'
  },
  {
    id: 19,
    aus: '22',
    fr: '6c',
    uk: '6a E4',
    yds: '5.11b',
    bouldering: 'V1'
  },
  {
    id: 20,
    aus: '23',
    fr: '6c+',
    uk: '6a E4, 6b E4',
    yds: '5.11c',
    bouldering: 'V1'
  },
  {
    id: 21,
    aus: '23/24',
    fr: '7a',
    uk: '6b E4, 6a E5',
    yds: '5.11d',
    bouldering: 'V2'
  },
  {
    id: 22,
    aus: '24',
    fr: '7a+',
    uk: '6a E5, 6c E5',
    yds: '5.12a',
    bouldering: 'V3'
  },
  {
    id: 23,
    aus: '25',
    fr: '7b',
    uk: '6c E5',
    yds: '5.12b',
    bouldering: 'V4'
  },
  {
    id: 24,
    aus: '26',
    fr: '7b+',
    uk: '6b E6',
    yds: '5.12c',
    bouldering: 'V5'
  },
  {
    id: 25,
    aus: '27',
    fr: '7c',
    uk: '6c E6',
    yds: '5.12d',
    bouldering: 'V6'
  },
  {
    id: 26,
    aus: '28',
    fr: '7c+',
    uk: '6c E7',
    yds: '5.13a',
    bouldering: 'V7'
  },
  {
    id: 27,
    aus: '29',
    fr: '8a',
    uk: '7a E7',
    yds: '5.13b',
    bouldering: 'V8'
  },
  {
    id: 28,
    aus: '30',
    fr: '8a+',
    uk: '6c E8',
    yds: '5.13c',
    bouldering: 'V9'
  },
  {
    id: 29,
    aus: '31',
    fr: '8b',
    uk: '7a E8',
    yds: '5.13d',
    bouldering: 'V10'
  },
  {
    id: 30,
    aus: '32',
    fr: '8b+',
    uk: '7a E9',
    yds: '5.14a',
    bouldering: 'V11'
  },
  {
    id: 31,
    aus: '33',
    fr: '8c',
    uk: '7b E9',
    yds: '5.14b',
    bouldering: 'V12'
  },
  {
    id: 32,
    aus: '34',
    fr: '8c+',
    uk: '7a E10',
    yds: '5.14c',
    bouldering: 'V13'
  },
  {
    id: 33,
    aus: '35',
    fr: '9a',
    uk: '7b E10',
    yds: '5.14d',
    bouldering: 'V14'
  },
  {
    id: 34,
    aus: '36',
    fr: '9a+',
    uk: '7b E10',
    yds: '5.15a',
    bouldering: 'V15'
  },
  {
    id: 35,
    aus: '37',
    fr: '9a+',
    uk: '7b E10',
    yds: '5.15b',
    bouldering: 'V16'
  }
];
