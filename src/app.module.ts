import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { FestivalsModule } from './festivals/festivals.module';
import { StandsModule } from './stands/stands.module';
import config from 'src/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [config],
    }),
    UsersModule,
    DatabaseModule,
    FestivalsModule,
    StandsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
