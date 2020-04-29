import { ODatabaseSessionPool, OrientDBClient, ODatabaseSession } from 'orientjs';

export interface OrientConnection {
  pool: ODatabaseSessionPool,
  client: OrientDBClient,
  session: ODatabaseSession,
}
