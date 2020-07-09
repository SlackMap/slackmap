import { ItemType, ItemSubtype } from './item-type';
import { DrawType } from './spot-shape-type';
import { SportType } from './sport.models';

export interface TypeOption {
  id: ItemType;
  name: string;
  label: string;
}
export interface SubtypeOption {
  id: ItemSubtype;
  type: ItemType;
  name: string;
  label: string;
  sport?: SportType;
  drawType?: DrawType;
  desc?: string;
  color?: string;
  order?: number;
}

export const TYPE_OPTIONS: TypeOption[] = [
  { id: ItemType.SPOT, name: 'spot', label: 'Spot' },
  { id: ItemType.USER, name: 'user', label: 'User' },
  { id: ItemType.PHOTO, name: 'photo', label: 'Photo' },
  { id: ItemType.VIDEO, name: 'video', label: 'Video' },
  { id: ItemType.LOCATION, name: 'location', label: 'Location' },
  { id: ItemType.CONTENT, name: 'content', label: 'Content' },
  { id: ItemType.RIG, name: 'rig', label: 'Rig' },
  { id: ItemType.CLUSTER, name: 'cluster', label: 'Cluster' },
  { id: ItemType.MAP, name: 'map', label: 'Map' },
  { id: ItemType.COMMENT, name: 'comment', label: 'Comment' },
  { id: ItemType.POST, name: 'post', label: 'Post' }
];
export const SUBTYPE_OPTIONS: SubtypeOption[] = [
  // SPOT
  {
    id: ItemSubtype.SPOT_HIGHLINE,
    type: ItemType.SPOT,
    drawType: DrawType.LINE,
    sport: SportType.SLACKLINE,
    name: 'highline',
    label: 'Highline',
    color: '#DD6363',
    order: 2
  },
  {
    id: ItemSubtype.SPOT_MIDLINE,
    type: ItemType.SPOT,
    drawType: DrawType.LINE,
    sport: SportType.SLACKLINE,
    name: 'midline',
    label: 'Midline',
    color: '#dc9e67',
    order: 3
  },
  {
    id: ItemSubtype.SPOT_LONGLINE,
    type: ItemType.SPOT,
    drawType: DrawType.LINE,
    sport: SportType.SLACKLINE,
    name: 'longline',
    label: 'Longline',
    color: '#DEDE6E',
    order: 4
  },
  {
    id: ItemSubtype.SPOT_WATERLINE,
    type: ItemType.SPOT,
    drawType: DrawType.LINE,
    sport: SportType.SLACKLINE,
    name: 'waterline',
    label: 'Waterline',
    color: '#8F8EFF',
    order: 5
  },
  {
    id: ItemSubtype.SPOT_RODEOLINE,
    type: ItemType.SPOT,
    drawType: DrawType.LINE,
    sport: SportType.SLACKLINE,
    name: 'rodeoline',
    label: 'Rodeoline',
    color: '#E787FE',
    order: 6
  },
  {
    id: ItemSubtype.SPOT_SLACKLINE,
    type: ItemType.SPOT,
    drawType: DrawType.LINE,
    sport: SportType.SLACKLINE,
    name: 'slackline',
    label: 'Simple Line',
    color: '#BCBCBC',
    order: 1
  },
  {
    id: ItemSubtype.SPOT_TRICKLINE,
    type: ItemType.SPOT,
    drawType: DrawType.LINE,
    sport: SportType.SLACKLINE,
    name: 'trickline',
    label: 'Trickline',
    color: '#000000',
    order: 7
  },
  {
    id: ItemSubtype.SPOT_SPACELINE,
    type: ItemType.SPOT,
    drawType: DrawType.LINE,
    sport: SportType.SLACKLINE,
    name: 'spaceline',
    label: 'Spaceline',
    color: '#7de5dc'
  },

  {
    id: ItemSubtype.SPOT_AREA,
    type: ItemType.SPOT,
    drawType: DrawType.AREA,
    sport: SportType.SLACKLINE,
    name: 'area',
    label: 'Slack Area',
    color: '#BCBCBC',
    order: 1
  },
  {
    id: ItemSubtype.SPOT_PARK,
    type: ItemType.SPOT,
    drawType: DrawType.AREA,
    sport: SportType.SLACKLINE,
    name: 'park',
    label: 'Park',
    color: '#BCBCBC',
    order: 2
  },
  {
    id: ItemSubtype.SPOT_MOUNTAIN,
    type: ItemType.SPOT,
    drawType: DrawType.AREA,
    sport: SportType.SLACKLINE,
    name: 'mountain',
    label: 'Mountain',
    color: '#BCBCBC',
    order: 3
  },
  {
    id: ItemSubtype.SPOT_GYM,
    type: ItemType.SPOT,
    drawType: DrawType.AREA,
    sport: SportType.SLACKLINE,
    name: 'gym',
    label: 'Gym',
    color: '#BCBCBC',
    order: 4
  },
  {
    id: ItemSubtype.SPOT_URBAN,
    type: ItemType.SPOT,
    drawType: DrawType.AREA,
    sport: SportType.SLACKLINE,
    name: 'urban',
    label: 'Urban',
    color: '#BCBCBC',
    order: 5
  },

  // LOCATION
  { id: ItemSubtype.LOCATION_WORLD, type: ItemType.LOCATION, name: 'world', label: 'World' },
  { id: ItemSubtype.LOCATION_CONTINENT, type: ItemType.LOCATION, name: 'continent', label: 'Continent' },
  { id: ItemSubtype.LOCATION_COUNTRY, type: ItemType.LOCATION, name: 'country', label: 'Country' },
  { id: ItemSubtype.LOCATION_REGION, type: ItemType.LOCATION, name: 'region', label: 'Region' },
  { id: ItemSubtype.LOCATION_CITY, type: ItemType.LOCATION, name: 'city', label: 'City' },
  { id: ItemSubtype.LOCATION_DISTRICT, type: ItemType.LOCATION, name: 'district', label: 'District' },
  { id: ItemSubtype.LOCATION_STREET, type: ItemType.LOCATION, name: 'street', label: 'Street' },
  { id: ItemSubtype.LOCATION_GEOLOCATION, type: ItemType.LOCATION, name: 'google', label: 'Google' },

  // CONTENT
  {
    id: ItemSubtype.CONTENT_ACCESS,
    type: ItemType.CONTENT,
    name: 'access',
    label: 'Access',
    desc: 'describe any access issues, how to get permission...'
  },
  {
    id: ItemSubtype.CONTENT_DESCRIPTION,
    type: ItemType.CONTENT,
    name: 'description',
    label: 'Description',
    desc: 'general description'
  },
  {
    id: ItemSubtype.CONTENT_ANCHORS,
    type: ItemType.CONTENT,
    name: 'anchors',
    label: 'Anchors',
    desc: 'what type of anchors, what gear you need...'
  },
  {
    id: ItemSubtype.CONTENT_ASCEND,
    type: ItemType.CONTENT,
    name: 'ascend',
    label: 'Ascend',
    desc: `how to get to this spot and it's anchors...`
  },
  {
    id: ItemSubtype.CONTENT_NOTES,
    type: ItemType.CONTENT,
    name: 'notes',
    label: 'Notes',
    desc: 'extra stuff to keep in mind...'
  },

  // COMMENT
  { id: ItemSubtype.COMMENT_COMMENT, type: ItemType.COMMENT, name: 'comment', label: 'Comment' },
  { id: ItemSubtype.COMMENT_REPLY, type: ItemType.COMMENT, name: 'reply', label: 'Reply' },

  // POST
  { id: ItemSubtype.POST_TEXT, type: ItemType.POST, name: 'text', label: 'Text' },
  { id: ItemSubtype.POST_USER, type: ItemType.POST, name: 'user', label: 'User' },
  { id: ItemSubtype.POST_SPOT, type: ItemType.POST, name: 'spot', label: 'Spot' },
  { id: ItemSubtype.POST_PHOTO, type: ItemType.POST, name: 'photo', label: 'Photo' }
];
