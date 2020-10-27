import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export default abstract class BasicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ default: () => 'NOW()' })
  readonly createdAt?: Date;

  @UpdateDateColumn({ default: () => 'NOW()' })
  readonly updatedAt?: Date;
}
