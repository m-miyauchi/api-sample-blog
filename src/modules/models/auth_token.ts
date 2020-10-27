import dayjs from 'dayjs';
import {
  getRepository,
  Connection,
  Repository,
  MoreThanOrEqual,
} from 'typeorm';
import { AuthToken as AuthTokenEntity } from '../../entity/auth_token';
import CONNECTION_NAME from '../../constants/default_db_connection';

export default class AuthToken {
  private connectionName = CONNECTION_NAME;
  private repository: Repository<AuthTokenEntity>;

  constructor(connection?: Connection) {
    if (connection !== undefined) {
      this.connectionName = connection.name;
    } else {
      this.connectionName = this.connectionName;
    }
    this.repository = getRepository(AuthTokenEntity, this.connectionName);
  }

  public async createToken(mebmerId: number): Promise<AuthTokenEntity> {
    try {
      const token = await this.repository.save({
        member_id: mebmerId,
        token: `T_${mebmerId}_${dayjs().toISOString()}`,
        expired_at: dayjs().add(4, 'week'),
      });
      return token;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async checkTokenIsEnable(tokenCode: string): Promise<boolean> {
    let t: AuthTokenEntity | undefined;
    try {
      t = await this.repository.findOne({
        token: tokenCode,
        expired_at: MoreThanOrEqual(new Date()),
      });
    } catch (error) {
      throw new Error(error);
    }
    // 条件を満たすトークンが存在する場合true
    return t !== undefined;
  }
}
