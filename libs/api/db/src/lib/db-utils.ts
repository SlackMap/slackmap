/**
 * Returns current date in the format for inserting in Neo4j database
 */
export function now(): string {
  return (new Date()).toJSON()
}

export enum WhereOperator {
  AND = 'AND',
  OR = 'OR',
}

/**
 * Create params and where clasure form entity
 * Use this to search records by it's properites
 */
export function createWhere(user: Object, comparator: WhereOperator = WhereOperator.AND): { params: any[], where: string } {
  const params = [];
  const where = [];
  for (const key in user) {
    if (user.hasOwnProperty(key)) {
      const value = user[key];
      params.push(value);
      where.push(`u.${key} = $${params.length}`)
    }
  }
  return {
    params,
    where: where.join(' ' + comparator + ' ')
  }
}

