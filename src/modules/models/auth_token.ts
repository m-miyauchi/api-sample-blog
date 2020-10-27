import { getRepository, Connection, Repository } from 'typeorm';
import { Member as MemberEntity } from '../../entity/member';
import { AuthToken as AuthTokenEntity } from '../../entity/auth_token';

export default class AuthToken {
  private connectionName = 'app';
  private repository: Repository<MemberEntity>;

  constructor(connection?: Connection) {
    if (connection !== undefined) {
      this.connectionName = connection.name;
    } else {
      this.connectionName = this.connectionName;
    }
    this.repository = getRepository(AuthTokenEntity, this.connectionName);
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
