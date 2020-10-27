import { Entity, Column } from 'typeorm';
import BasicEntity from './basic_entity';

@Entity()
export class AuthToken extends BasicEntity {
  @Column()
  member_id: number;

  @Column()
  token: string;

  @Column()
  expired_at: Date;

  @Column()
  expired: boolean;
}
