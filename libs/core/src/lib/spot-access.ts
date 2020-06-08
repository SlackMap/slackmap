
export enum AccessType {
  OPEN = 1,
  RESTRICTED = 2,
  FORBIDDEN = 3,
  UNKNOWN = 4
}

export interface AccessOption {
  id: AccessType;
  name: string;
  label: string;
  cls: string;
}

export const ACCESS_OPTIONS: AccessOption[] = [
  {id: AccessType.OPEN, name: 'open', label: 'Open', cls: 'success'},
  {
    id: AccessType.RESTRICTED,
    name: 'restricted',
    label: 'Restricted',
    cls: 'warning'
  },
  {
    id: AccessType.FORBIDDEN,
    name: 'forbidden',
    label: 'Forbidden',
    cls: 'danger'
  },
  {
    id: AccessType.UNKNOWN,
    name: 'unknown',
    label: `I don't know`,
    cls: 'default'
  }
];


