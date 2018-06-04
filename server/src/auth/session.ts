/**
 * Session handling
 */
import * as mysql from 'promise-mysql';
import * as hapi from 'hapi';
import { SessionDB } from '../dbo/sessionDB';

export const checkSession = async (uid: number, yar: hapi.Request, dbConn: mysql.Connection) => {
  const session = new SessionDB(dbConn);
  const curSession = await session.getSessionByUID(uid);
  console.log(curSession);
};

const newSession = () => {
  // await session.createNewSession(uid);
};
