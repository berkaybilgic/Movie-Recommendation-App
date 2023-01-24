import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type MovieDocument = HydratedDocument<Movie>;

@Schema({versionKey: false})
export class Movie {
	@Prop()
	adult: boolean;
	@Prop({ required: true, unique: true})
	id: number;
	@Prop()
	original_language: string
	@Prop()
	original_title: string;
	@Prop()
	overview: string;
	@Prop()
	release_date: string;
	@Prop()
	title: string
	@Prop()
	vote_average: number;
	@Prop()
	vote_count: number;
	@Prop()
	genre_ids: [];
	@Prop()
	popularity: number;
	@Prop()
	poster_path: string;
	@Prop()
	backdrop_path: string;
	@Prop()
	video: boolean;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
