import { Controller, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class AuthController {
    private authService: AuthService;

    constructor(@Inject('AUTH_PACKAGE') private client: ClientGrpc) {}

    onModuleInit() {
        this.authService = this.client.getService<AuthService>('AuthService');
    }

    @GrpcMethod('AuthService', 'ValidateUser')
    async validateUser(data: { username: string; password: string }) {
        return this.authService.validateUser(data);
    }

    @GrpcMethod('AuthService', 'Login')
    async login(data: { username: string; password: string }) {
        return this.authService.login(data);
    }

    @GrpcMethod('AuthService', 'Register')
    async register(data: { username: string; password: string }) {
        return this.authService.register(data);
    }
}
