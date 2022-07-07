import { Body, Controller, Post, Get } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    async createUser(@Body() body: CreateUserDto) {
        return await this.usersService.create(body.email, body.password);
    }
    
    @Get()
    async findAll() {
        return await this.usersService.findAll();
    }
}
