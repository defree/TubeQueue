import * as mysql from 'mysql';

class UserDB {
  private dbConn: mysql.Connection;

  constructor(dbConn: mysql.Connection) {
    this.dbConn = dbConn;
  }

  public getUserByID = (uid: number) => {
    const query = `SELECT * from users WHERE id = ${uid}`;

    this.dbConn.query(query, (error, results) => {
      if (error) { throw error; }
      return results;
    });
  };
};
