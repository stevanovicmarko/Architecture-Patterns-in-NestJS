import { Module } from '@nestjs/common';
import { ApplicationBootstrapOptions } from '../common/interfaces/application-bootstrap-options.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';

@Module({})
export class CoreModule {
  static forRoot(options: ApplicationBootstrapOptions) {
    const imports =
      options.driver === 'orm'
        ? [
            // We are going to hardcode the connection options for simplicity,
            // but in a real-world application, we would use a configuration service or env
            TypeOrmModule.forRoot({
              type: 'postgres',
              host: 'localhost',
              port: 5432,
              username: 'postgres',
              password: 'postgres',
              database: 'alarms',
              autoLoadEntities: true,
              synchronize: true,
            }),
            MongooseModule.forRoot('mongodb://mongo:mongo@localhost:27017', {
              dbName: 'alarms',
            }),
          ]
        : [];

    return {
      module: CoreModule,
      imports,
    };
  }
}
