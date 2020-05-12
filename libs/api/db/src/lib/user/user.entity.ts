import { ItemType, UserSubtype } from '@slackmap/core';

export class UserEntity {
    rid: string;
    type: ItemType.USER;
    subtype: UserSubtype;
    name: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    facebookId?: string;
    createdAt?: string;
    imperial?: boolean;
}
