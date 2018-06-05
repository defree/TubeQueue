import * as mysql from 'promise-mysql';
import * as uuid from 'uuid/v4';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  timestamp?: number;
}

export class UserDB {
  private dbConn: mysql.Connection;

  constructor(dbConn: mysql.Connection) {
    this.dbConn = dbConn;
  }

  public getUserByID = async (uid: number) => {
    const query = `SELECT * from users WHERE id = '${uid}'`;
    return this.dbConn.query(query).then((res) => {
      return res[0];
    }).catch((err) => {
      throw err;
    });
  };

  public createNewUser = async (userData: IUser) => {
    const query = `INSERT INTO users (id, firstname, lastname, role, email) VALUES (
      '${userData.id}',
      '${userData.firstName}',
      '${userData.lastName}',
      '${userData.role}',
      '${userData.email}'
    )`;

    return this.dbConn.query(query).then((res) => {
      return res;
    }).catch((err) => {
      throw err;
    });
  };

  public deleteUser = async (uid: number) => {
    const query = `DELETE FROM users WHERE id = '${uid}'`;
    return this.dbConn.query(query).then((res) => {
      return res;
    }).catch((err) => {
      throw err;
    });
  };
};
