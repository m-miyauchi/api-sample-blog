import { Entity, Column } from 'typeorm';
import BasicEntity from './basic_entity';

@Entity()
export class Member extends BasicEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
