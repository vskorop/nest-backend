import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async create(user: Partial<User>): Promise<User> {
        const newUser = this.usersRepository.create(user);
        return this.usersRepository.save(newUser);
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { username } });
    }

    async findById(id: string): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { id } });
    }

    async update(id: number, updateUserDto: Partial<User>): Promise<void> {
        await this.usersRepository.update(id, updateUserDto);
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
