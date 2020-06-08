
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
