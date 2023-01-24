import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocument } from './movie.schema';
import { Model } from 'mongoose';
import axios from 'axios';
import { ConfigService } from '@nestjs/config/dist/config.service';

@Injectable()
export class AppService {
  constructor(@InjectModel(Movie.name) private readonly movieModel: Model<MovieDocument>,
  private readonly configService: ConfigService
  ) { }

  async agendaJob() {
    const apiKey = this.configService.get('MOVIE_DB_API_KEY');
    const limitPage: number = this.configService.get('LIMIT_PAGE');
    const maxPageCount: number = this.configService.get('MAX_PAGE_COUNT');
    for (let i = 1; i < limitPage; i++) {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${i}`
        );
        const movie: Array<Movie> = response.data.results
        const bulkOps = movie.map(movie => ({ updateOne: { update: movie, upsert: true, filter: { id: movie.id } } }));
        await this.movieModel.bulkWrite(bulkOps);
        console.log("Bulk Insert");
      } catch (error) {
        if (i > maxPageCount) {
          console.error("page must be less than or equal to 500");
          break;
        }
        console.error(error);
      }
    }
  }
}
