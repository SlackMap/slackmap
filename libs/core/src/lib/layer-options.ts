
export enum SportType {
  SLACKLINE = 1,
  DIVING = 2,
  TRAMPOLINE = 3
}
export enum SportName {
  SLACKLINE = 'slackline',
  DIVING = 'diving',
  TRAMPOLINE = 'trampoline'
}

export interface SportOption {
  id: SportType;
  name: SportName;
  label: string;
}

export const SPORT_OPTIONS: SportOption[] = [
  {
    id: SportType.SLACKLINE,
    name: SportName.SLACKLINE,
    label: 'Slackline'
  },
  {
    id: SportType.DIVING,
    name: SportName.DIVING,
    label: 'Diving'
  },
  {
    id: SportType.TRAMPOLINE,
    name: SportName.TRAMPOLINE,
    label: 'Trampoline'
  }
]

export function getSportOptionByType(type: SportType, options = SPORT_OPTIONS): SportOption | null {
  const option = options.find(o => o.id === type)
  return option || null;
}

export function getSportOptionByName(name: SportName, options = SPORT_OPTIONS): SportOption | null {
  const option = options.find(o => o.name === name)
  return option || null;
}
