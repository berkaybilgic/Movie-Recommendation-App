import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from './movie.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [MongooseModule.forRoot('mongodb://mongo:27017/movie'),
   MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
   ConfigModule.forRoot({envFilePath: '.config.env', isGlobal: true}),
  ],
  providers: [AppService],
})
export class AppModule {}
