import { Module } from '@nestjs/common';
import { AuthorizationModule } from './authorization/authorization.module';
import { ConfigModule } from '@nestjs/config';
import { MovieModule } from './movie/movie.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/movie'),
    ConfigModule.forRoot({envFilePath: '.config.env', isGlobal: true,}),
    AuthorizationModule,
    MovieModule,
  ],
})
export class AppModule { }
