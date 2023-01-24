export class MovieDto {
	adult: boolean;
	id: number;
	original_language: string
	original_title: string;
	overview: string;
	release_date: string;
	title: string
	vote_average: number;
	vote_count: number;
	genre_ids: [];
	popularity: number;
	poster_path: string;
	backdrop_path: string;
	video: boolean;
    comments:Array<string>;
}