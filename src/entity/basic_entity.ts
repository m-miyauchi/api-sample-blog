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
  readonly created_at: Date;

  @UpdateDateColumn({ default: () => 'NOW()' })
  readonly updated_at: Date;
}
