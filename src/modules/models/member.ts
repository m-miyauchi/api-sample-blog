import { getRepository, Connection, Repository } from 'typeorm';
import { Member as MemberEntity } from '../../entity/member';
import { PutLoginResponse } from '../../types/api/put_login_response';
import { PutLoginParams } from '../../types/api/put_login_params';
import AuthTokenModel from './auth_token';
import CONNECTION_NAME from '../../constants/default_db_connection';

export default class Member {
  private connectionName = CONNECTION_NAME;
  private repository: Repository<MemberEntity>;

  constructor(connection?: Connection) {
    if (connection !== undefined) {
      this.connectionName = connection.name;
    } else {
      this.connectionName = this.connectionName;
    }
    this.repository = getRepository(MemberEntity, this.connectionName);
  }

  public async login(params: PutLoginParams): Promise<PutLoginResponse> {
    const result: PutLoginResponse = {
      isSuccessLogin: false,
    };
    try {
      const m = await this.repository.findOne({
        where: {
          email: params.email,
          password: params.password,
        },
      });
      if (m !== undefined) {
        const authTokenModel = new AuthTokenModel();
        const tokenEntity = await authTokenModel.createToken(m.id);
        result.isSuccessLogin = true;
        result.member.id = m.id;
        result.member.name = m.name;
        result.member.email = m.email;
        result.token = tokenEntity.token;
      }
    } catch (error) {
      result.error = error;
    }
    return result;
  }

  // 内部API
  public async register(
    name: string,
    email: string,
    password: string
  ): Promise<MemberEntity> {
    let m: MemberEntity | undefined;
    try {
      m = await this.repository.findOne({
        where: {
          email,
        },
      });
      console.log(m);
      if (m === undefined) {
        m = await this.repository.save({
          name,
          email,
          password,
        });
      } else {
        throw new Error('Member already exist!');
      }
    } catch (error) {
      throw new Error(error);
    }
    return m;
  }
}
