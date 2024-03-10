import { Alarm } from '../../domain/alarm';

/*
 * use abstract classes instead of interfaces because they
 * serve as injection tokens in NestJS
 */
export abstract class CreateAlarmRepository {
  abstract save(alarm: Alarm): Promise<Alarm>;
}
