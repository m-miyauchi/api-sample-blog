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
    try {
      const member = await this.repository.findOne({
        where: {
          email,
          password,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  private createToken(mebmerId: number): Promise<AuthTokenEntity> {
    try {
      const repository: Repository<AuthTokenEntity> = await getRepository(
        AuthTokenEntity,
        this.connectionName
      );
    } catch (error) {}
  }
}
