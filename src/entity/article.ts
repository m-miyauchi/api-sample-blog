import { Entity, Column } from 'typeorm';
import BasicEntity from './basic_entity';

@Entity()
export class Article extends BasicEntity {
  @Column()
  title: string;

  @Column()
  body: string;

  @Column()
  author_member_id: number;

  @Column({ default: false })
  deleted: boolean;
}
