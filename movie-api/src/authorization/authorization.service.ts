import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthorizationService {
    constructor(private configService: ConfigService) {}

    //It was created for development and testing environment
    async createAuthToken() {
        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "client_id": this.configService.get('AUTH0_CLIENT_ID'),
                "client_secret": this.configService.get('AUTH0_CLIENT_SECRET'),
                "audience": this.configService.get('AUTH0_AUDIENCE'),
                "grant_type": "client_credentials"
            });

            const response = await fetch(this.configService.get('AUTH0_TOKEN_URL'), {
                method: 'POST',
                headers: headers,
                body: raw,
                redirect: 'follow'
            });
            return response.json();
        } catch (error) {
            throw new HttpException("Failed To Create Token", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}