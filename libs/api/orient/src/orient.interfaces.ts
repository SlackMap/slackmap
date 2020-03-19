import { ODatabaseSessionPool, OrientDBClient } from 'orientjs';

export interface OrientConnection {
  pool: ODatabaseSessionPool,
  client: OrientDBClient,
}
