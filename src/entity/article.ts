import { Entity, Column } from 'typeorm';
import BasicEntity from './basic_entity';

@Entity()
export class Article extends BasicEntity {
  @Column()
  member_id: number;

  @Column()
  token: string;

  @Column()
  expired_at: Date;
}
