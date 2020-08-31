import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import ColumnNumericTransformer from '@shared/infra/typeorm/transformers/ColumnNumericTransformer';

@Entity('cash_flow_entries')
class CashFlowEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column('numeric', {
    precision: 7,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  budget_value: number;

  @Column('numeric', {
    precision: 7,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  actual_value: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CashFlowEntry;
