import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from './schema/movie.schema';
import { AuthorizationModule } from 'src/authorization/authorization.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
    AuthorizationModule,
  ],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
