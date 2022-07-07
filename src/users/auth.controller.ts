import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UsersService } from "./users.service";
import * as bcrypt from 'bcrypt'

const salt = 10;

@Controller('auth')
export class AuthController {
    constructor(private usersService: UsersService) {}

    @Post('/signup')
    async signup(@Body() body: CreateUserDto) {
        const user = await this.usersService.findOne(body.email);

        if (user) {
            throw new BadRequestException('User already exists');
        }

        const hash = await bcrypt.hash(body.password, salt);

        return await this.usersService.create(body.email, hash);
    }

    @Post('/signin')
    async signin(@Body() body: CreateUserDto) {
        const user = await this.usersService.findOne(body.email);

        if (!user) {
            throw new BadRequestException('User does not exist');
        }

        const isValid = await bcrypt.compare(body.password, user.password);

        if (!isValid) {
            throw new BadRequestException('Invalid password');
        }

        return user;
    }
}