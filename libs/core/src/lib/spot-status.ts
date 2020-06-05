
export enum StatusType {
  ACTIVE = 1,
  PROJECT = 2,
  CLOSED = 3,
}

export interface StatusOption {
  id: StatusType;
  name: string;
  label: string;
  cls: string;
}

export const STATUS_OPTIONS: StatusOption[] = [
  {
    id: StatusType.ACTIVE,
    name: 'active',
    label: 'Active',
    cls: 'success'
  },
  {
    id: StatusType.PROJECT,
    name: 'project',
    label: 'Project',
    cls: 'warning'
  },
  {
    id: StatusType.CLOSED,
    name: 'closed',
    label: 'Closed',
    cls: 'danger'
  }
];


