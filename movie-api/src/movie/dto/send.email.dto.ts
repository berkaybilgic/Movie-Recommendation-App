import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString } from "class-validator";

export class SendEmailDto {
    @ApiProperty()
    @Type(() => String)
    @IsString()
    email:string;
}