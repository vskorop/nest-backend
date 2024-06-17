import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
    constructor(private usersService: UsersService) {}

    @Post()
    create(@Body() createUserDto: Partial<User>) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':username')
    findOne(@Param('username') username: string) {
        return this.usersService.findOne(username);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateUserDto: Partial<User>) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.usersService.remove(id);
    }
}
