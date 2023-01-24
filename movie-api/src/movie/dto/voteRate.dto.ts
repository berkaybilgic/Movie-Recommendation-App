import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, Max, Min } from "class-validator";

export class VoteRateDto {
    @Type(() => Number)
    @IsNumber()
    @ApiProperty()
    movieId:number;
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    @Max(10)
    @ApiProperty()
    rate:number;
    @ApiProperty()
    comment:string;
}
