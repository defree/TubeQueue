import * as mysql from 'mysql';
import * as uuid from 'uuid/v4';

export class SessionDB {
  private dbConn: mysql.Connection;

  constructor(dbConn: mysql.Connection) {
    this.dbConn = dbConn;
  }

  public getSessionByID = (sid: number) => {
    const query = `SELECT * from sessions WHERE id = ${sid}`;

    this.dbConn.query(query, (error, results) => {
      if (error) { throw error; }
      return results;
    });
  };

  public getSessionByUID = (uid: number) => {
    const query = `SELECT * from sessions WHERE id = ${uid}`;

    this.dbConn.query(query, (error, results) => {
      if (error) { throw error; }
      return results;
    });
  };

  public createNewSession = (uid: number) => {
    const query = `INSERT INTO sessions (sid, uid, time_created) VALUES (${uuid()},${uid},${Date.now()})`;

    this.dbConn.query(query, (error, results) => {
      if (error) { throw error; }
      return results;
    });
  };
};
