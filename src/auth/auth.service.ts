import {Injectable} from '@nestjs/common';
import {UsersService} from '../user/user.service';
import {JwtService} from '@nestjs/jwt';
import {User} from '../user/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && bcrypt.compareSync(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(user: User) {
        const hashedPassword = bcrypt.hashSync(user.password, 8);
        return await this.usersService.create({
            ...user,
            password: hashedPassword,
        });
    }
}
