import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { MovieDto } from './dto/movie.dto';
import { MovieService } from './movie.service';
import { PaginationParams } from './dto/pagination.params';
import { VoteRateDto } from './dto/voteRate.dto';
import { SendEmailDto } from './dto/send.email.dto';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthorizationGuard } from 'src/authorization/authorization.guard';


@ApiBearerAuth()
@Controller('v1/movie')
export class MovieController {
    constructor(private readonly movieService: MovieService) { }


    @Get("movies")
    @UseGuards(AuthorizationGuard)
    @UsePipes(new ValidationPipe({ transform: true }))
    async getMovies(@Query('page', ParseIntPipe) page: number = 1, @Query('size', ParseIntPipe) size: number = 8): Promise<Array<MovieDto>> {
        const pageParams: PaginationParams = new PaginationParams(page, size);
        return this.movieService.getMovie(pageParams);
    }

    @Put("to-vote")
    @ApiBody({ type: VoteRateDto })
    @UseGuards(AuthorizationGuard)
    @UsePipes(new ValidationPipe({ transform: true }))
    async toVoteMovie(@Body() voteRateDto: VoteRateDto) {
        return this.movieService.toVote(voteRateDto);
    }

    @Get("details/:id")
    @UseGuards(AuthorizationGuard)
    @UsePipes(new ValidationPipe({ transform: true }))
    async getMovie(@Param('id', ParseIntPipe) id: number): Promise<MovieDto> {
        return this.movieService.getMovieDetails(id);
    }

    @Post("advice")
    @UseGuards(AuthorizationGuard)
    @ApiBody({type: SendEmailDto })
    @UsePipes(new ValidationPipe({ transform: true }))
    async advice(@Body() sendEmailDto:SendEmailDto): Promise<void> {
        this.movieService.sendEmail(sendEmailDto);
    }


}
