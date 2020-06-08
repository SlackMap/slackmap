import { Injectable } from '@nestjs/common';
import { PersistenceManager, QuerySpecification, Transactional, InjectPersistenceManager } from '@liberation-data/drivine';
import { RidGenerator, ItemType, ItemSubtype } from '@slackmap/core';
import { UserEntity } from './user.entity';
import { now, createWhere, WhereOperator } from '../db-utils';

export function rowToUserEntity(row: any): UserEntity {
  return row;
}

@Injectable()
export class UserRepository {
    constructor(
        @InjectPersistenceManager()
        private persistenceManager: PersistenceManager,
        private ridGenerator: RidGenerator,
    ) {}

    @Transactional()
    async findOne(user: Partial<UserEntity>, operator: WhereOperator = WhereOperator.AND): Promise<UserEntity | null> {
        const {where, params} = createWhere(user, operator);
        const statement = `
            MATCH (u:User)
            WHERE ${where}
            RETURN u
        `;
        return this.persistenceManager.query(
            new QuerySpecification<UserEntity>()
                .withStatement(statement)
                .bind(params)
                .limit(1)
                .map(rowToUserEntity)
        ).then(rows => rows[0] ? rows[0] : null);
    }

    @Transactional()
    async find(user: Partial<UserEntity>, operator: WhereOperator = WhereOperator.AND): Promise<UserEntity[]> {
        const {where, params} = createWhere(user, operator);
        const statement = `
            MATCH (u:User)
            WHERE ${where}
            RETURN u
        `;
        return this.persistenceManager.query(
            new QuerySpecification<UserEntity>()
                .withStatement(statement)
                .bind(params)
                .map(rowToUserEntity)
        );
    }

    @Transactional()
    async create(data: Partial<UserEntity>): Promise<UserEntity> {
        const user: UserEntity = {
            rid: this.ridGenerator.forItem(ItemType.USER),
            type: ItemType.USER,
            subtype: ItemSubtype.USER_USER,
            name: data.name,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            facebookId: data.facebookId,
            createdAt: now(),
        };
        const statement = `
            CREATE (u:User $1)
            RETURN u {.*}
        `;
        return this.persistenceManager.getOne(
            new QuerySpecification<UserEntity>()
                .withStatement(statement)
                .bind([user])
                .limit(1)
                .map(rowToUserEntity)
        );

    }

    @Transactional()
    async update(rid: string, data: Partial<UserEntity>): Promise<UserEntity> {
        const user: Partial<UserEntity> = {
            subtype: data.subtype,
            name: data.name,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            facebookId: data.facebookId,
        };

        const statement = `
            MATCH (u:User {rid: $1})
            SET u += $2
            RETURN u
        `;
        return this.persistenceManager.getOne(
            new QuerySpecification<UserEntity>()
                .withStatement(statement)
                .bind([rid, user])
                .limit(1)
                .map(rowToUserEntity)
        );
    }
}
