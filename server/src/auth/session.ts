/**
 * Session handling
 */
import * as mysql from 'promise-mysql';
import * as hapi from 'hapi';
import { SessionDB } from '../dbo/sessionDB';
import { UserDB } from '../dbo/userDB';

export const checkSession = async (uid: number, req: hapi.Request, dbConn: mysql.Connection) => {
  const session = new SessionDB(dbConn);
  const currentSession = await session.getSessionByUID(uid); // Session from db
  const sessionCookie = req.yar.get('sid'); // Session from cookie

  // Check if db session and cookie session match
  if (currentSession && currentSession.id === sessionCookie) {
    return true;
  }
  return false;
};

// Make new session
export const newSession = async (uid: number, req: hapi.Request, dbConn: mysql.Connection) => {
  const session = new SessionDB(dbConn);
  const user = new UserDB(dbConn);
  await removeOldSession(uid, req, session);
  // Check whether user exists
  const currentUser = await user.getUserByID(uid);

  // If the user exists in database
  if (currentUser && currentUser.id) {
    const sid = await session.createNewSession(uid);
    req.yar.set('sid', sid);
  }
};

// Remove old session from db and cookie
const removeOldSession = async (uid: number, req: hapi.Request, session: SessionDB) => {
  await session.deleteSession(uid);
  req.yar.clear('sid');
};
