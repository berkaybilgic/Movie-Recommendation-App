import { Controller, Post } from "@nestjs/common";
import { AuthorizationService } from "./authorization.service";
import { ApiOperation} from '@nestjs/swagger';




@Controller('v1/auth')
export class AuthorizationController {
    constructor(private readonly authorizationService: AuthorizationService) { }


    @Post('create-token')
    @ApiOperation({ summary: 'It was created for development and testing environment.' })
    async createtoken() {
        return this.authorizationService.createAuthToken();
    }
}