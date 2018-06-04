import * as mysql from 'promise-mysql';
import * as uuid from 'uuid/v4';

export class SessionDB {
  private dbConn: mysql.Connection;

  constructor(dbConn: mysql.Connection) {
    this.dbConn = dbConn;
  }

  public getSessionByID = (sid: number) => {
    const query = `SELECT * from sessions WHERE id = '${sid}'`;

    this.dbConn.query(query, (error, results) => {
      if (error) { throw error; }
      return results;
    });
  };

  public getSessionByUID = async (uid: number) => {
    const query = `SELECT * from sessions WHERE uid = '${uid}'`;
    console.log(query);
    await this.dbConn.query(query, async (error, results) => {
      if (error) { throw error; }
      console.log('results',results);
      return results;
    });
  };

  public createNewSession = async (uid: number) => {
    const query = `INSERT INTO sessions (id, uid, time_created) VALUES ('${uuid()}','${uid}',${Date.now()})`;
    console.log('newsession:', query);
    await this.dbConn.query(query, (error, results) => {
      if (error) { throw error; }
      return results;
    });
  };
};
