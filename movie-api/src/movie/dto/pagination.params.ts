import { Type } from "class-transformer";
import { IsNumber, IsOptional, Min } from "class-validator";

export class PaginationParams {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    size?: number;
   
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page?: number;


    constructor(page: number, size:number) {
        this.size = size;
        this.page= page;
      }
    

  }