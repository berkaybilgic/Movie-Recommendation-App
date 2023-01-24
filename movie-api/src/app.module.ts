import { Module } from '@nestjs/common';
import { AuthorizationModule } from './authorization/authorization.module';
import { ConfigModule } from '@nestjs/config';
import { MovieModule } from './movie/movie.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [AuthorizationModule,
    ConfigModule.forRoot({envFilePath: '.config.env', isGlobal: true,}),
    MovieModule,
    MongooseModule.forRoot('mongodb://mongo:27017/movie')
  ],
})
export class AppModule { }
