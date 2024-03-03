import { Alarm } from '../../domain/alarm';

/*
 * use abstract classes instead of interfaces because they
 * serve as injection tokens in NestJS
 */
export abstract class AlarmRepository {
  abstract findAll(): Promise<Alarm[]>;
  abstract save(alarm: Alarm): Promise<Alarm>;
}
