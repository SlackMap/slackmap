export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  CUSTOM = 'custom',
}
export interface GenderOption {
  value: Gender,
  label: string
}
export const GENDER_OPTIONS: GenderOption[] = [
  {value: Gender.MALE, label: 'Male'},
  {value: Gender.FEMALE, label: 'Female'},
  {value: Gender.CUSTOM, label: 'Custom'},
]
