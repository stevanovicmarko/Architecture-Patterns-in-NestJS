import { AlarmEntity } from './alarm.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('alarm_items')
export class AlarmItemEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @ManyToOne(() => AlarmEntity, (alarm) => alarm.items)
  alarm: AlarmEntity;
}
