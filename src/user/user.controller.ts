import { Body, Controller, Get, Inject, Post } from '@nestjs/common';

import { users as usersTable } from 'src/migrations/schema';
import { UserService } from './user.service';


@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get('/healthCheck')
    healthCheck(): string {
        return 'status ok';
    }

    @Post('write')
    async writeUser(@Body() userData: typeof usersTable.$inferInsert) {
        const newUser = await this.userService.insert(userData);
        return newUser;
    }

    @Get('all')
    async getAllUsers() {
        return this.userService.findAll();
    }
}