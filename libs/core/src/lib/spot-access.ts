
export enum SpotAccess {
  OPEN = 1,
  RESTRICTED = 2,
  FORBIDDEN = 3,
  UNKNOWN = 4
}

export interface AccessOption {
  id: SpotAccess;
  name: string;
  label: string;
  cls: string;
}

export const ACCESS_OPTIONS: AccessOption[] = [
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


