import * as mysql from 'promise-mysql';
import * as uuid from 'uuid/v4';

export class SessionDB {
  private dbConn: mysql.Connection;

  constructor(dbConn: mysql.Connection) {
    this.dbConn = dbConn;
  }

  public getSessionByID = async (sid: number) => {
    const query = `SELECT * from sessions WHERE id = '${sid}'`;

    return this.dbConn.query(query).then((res) => {
      return res;
    }).catch((err) => {
      throw err;
    });
  };

  public getSessionByUID = async (uid: number) => {
    const query = `SELECT * from sessions WHERE uid = '${uid}'`;
    return this.dbConn.query(query).then((res) => {
      return res[0];
    }).catch((err) => {
      throw err;
    });
  };

  public createNewSession = async (uid: number) => {
    const sid = uuid();
    const query = `INSERT INTO sessions (id, uid, time_created) VALUES ('${sid}','${uid}',${Date.now()})`;
    return this.dbConn.query(query).then((res) => {
      return sid;
    }).catch((err) => {
      throw err;
    });
  };

  public deleteSession = async (uid: number) => {
    const query = `DELETE FROM sessions WHERE uid = '${uid}'`;
    return this.dbConn.query(query).then((res) => {
      return res;
    }).catch((err) => {
      throw err;
    });
  };
};
