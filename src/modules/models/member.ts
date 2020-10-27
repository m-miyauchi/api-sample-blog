import { getRepository, Connection, Repository } from 'typeorm';
import { Member as MemberEntity } from '../../entity/member';
import { AuthToken as AuthTokenEntity } from '../../entity/auth_token';
import { PutLoginResponse } from '../../types/api/put_login_response';

export default class Member {
  private connectionName = 'app';
  private repository: Repository<MemberEntity>;

  constructor(connection?: Connection) {
    if (connection !== undefined) {
      this.connectionName = connection.name;
    } else {
      this.connectionName = this.connectionName;
    }
    this.repository = getRepository(MemberEntity, this.connectionName);
  }

  // クライアントは、ログインに成功したら別途トークンを入手する必要あり
  public async login(
    email: string,
    password: string
  ): Promise<PutLoginResponse> {
    const result: PutLoginResponse = {
      isSuccessLogin: false,
    };
    try {
      const m = await this.repository.findOne({
        where: {
          email,
          password,
        },
      });
      if (m !== undefined) {
        result.isSuccessLogin = true;
        result.member.id = m.id;
        result.member.name = m.name;
        result.member.email = m.email;
        // TODO: 認証ロジック作ったらつなぎこみ
        result.token = `token_${m.name}`;
      }
      return result;
    } catch (error) {
      result.error = error;
      return result;
    }
  }
}
