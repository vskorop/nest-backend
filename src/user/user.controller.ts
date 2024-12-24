import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Post, } from '@nestjs/common';

import { users as usersTable } from 'src/migrations/schema';
import { UserService } from './user.service';
import { validate } from 'uuid'


@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get('all')
    async getAllUsers() {
        return await this.userService.findAll();
    }

    @Post('write')
    async writeUser(@Body() userData: typeof usersTable.$inferInsert) {
        return await this.userService.createUser(userData);
    }

    @Get(':idOrEmail')
    async findOne(@Param('idOrEmail') idOrEmail: string) {
        const isUuid = validate(idOrEmail)
        const user = await this.userService.findOne(idOrEmail, isUuid);

        if (!user) {
            throw new BadRequestException('User not found')
        }
        return user
    }

    @Delete(':id')
    async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
        return await this.userService.deleteUser(id);
    }
}