import { getRepository, Connection, Repository } from 'typeorm';
import { Member as MemberEntity } from '../../entity/member';

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
}
