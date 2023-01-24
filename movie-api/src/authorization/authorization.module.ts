import { Module} from '@nestjs/common';
import { AuthorizationController } from './authorization.controller';
import { AuthorizationService } from './authorization.service';

@Module({
    imports:[],
    providers:[AuthorizationService],
    controllers: [AuthorizationController]
})
export class AuthorizationModule {}
