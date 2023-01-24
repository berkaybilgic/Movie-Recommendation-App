import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Movie, MovieDocument } from "./schema/movie.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { MovieDto } from "./dto/movie.dto";
import { PaginationParams } from "./dto/pagination.params";
import { VoteRateDto } from "./dto/voteRate.dto";
import * as nodemailer from "nodemailer";
import { ConfigService } from "@nestjs/config";
import { SendEmailDto } from "./dto/send.email.dto";


@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name) private readonly movieModel: Model<MovieDocument>,
    private readonly configService: ConfigService,
  ) {}

  async getMovie({ page, size }: PaginationParams): Promise<Array<MovieDto>> {
    try {
      const startIndex: number = (page - 1) * size;
      return this.movieModel.find().skip(startIndex).limit(size);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async toVote(voteRateDto: VoteRateDto): Promise<MovieDto> {
    const movie: MovieDto = await this.movieModel.findOne({id: voteRateDto.movieId});
    if (movie == null) {
      throw new HttpException("movie not found", HttpStatus.NOT_FOUND);
    }
    const voteAverage: number = (movie.vote_count * movie.vote_average + voteRateDto.rate) / (movie.vote_count + 1);
    movie.comments.push(voteRateDto.comment);
    movie.vote_count = movie.vote_count + 1;
    movie.vote_average = voteAverage;
    await this.movieModel.findOneAndUpdate({ id: voteRateDto.movieId }, movie);
    return movie
  }

  async getMovieDetails(movieId: number): Promise<MovieDto> {
    const movie: MovieDto = await this.movieModel.findOne({ id: movieId });
    if (movie == null) {
      throw new HttpException("movie not found", HttpStatus.NOT_FOUND);
    }
    return movie;
  }

  async sendEmail(sendEmailDto: SendEmailDto): Promise<void> {
    let movie: Movie[] = await this.movieModel.aggregate([{ $sample: { size: 1 } }]);
    let transporter = nodemailer.createTransport({
      host: this.configService.get("E_MAil_HOST"),
      port: 587,
      secure: false,
      auth: {
        user: this.configService.get("AMAZON_SES_USER"),
        pass: this.configService.get("AMAZON_SES_PASS")
      }
    });

    const movieName = movie.length === 0 ? "No movies found to recommend ):" : movie[0].original_title;

    let mailOptions = {
      from: this.configService.get("AMAZON_SES_MAIL"),
      to: sendEmailDto.email,
      subject: "This Movie Is For You",
      text: `Our film chosen by the High Jury member: ${movieName}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        throw new HttpException("Dont send email", HttpStatus.INTERNAL_SERVER_ERROR);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
  }
}
