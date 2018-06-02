/**
 * Session handling
 */
import * as mysql from 'mysql';
import { SessionDB } from '../dbo/sessionDB';

export const checkSession = (uid: number, dbConn: mysql.Connection) => {
  const session = new SessionDB(dbConn);
  session.createNewSession(uid);
};

const newSession = () => {

};
