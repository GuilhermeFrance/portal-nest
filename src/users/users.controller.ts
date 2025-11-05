import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@ApiTags('Funcionários')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @IsPublic()
  @Get()
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '9',
    @Query('filter') filter?: string,
    @Query('roleId') roleId?: string,
  ) {
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const parsedRoleID = roleId ? Number(roleId) : undefined;

    return this.usersService.findAllPaginated(
      pageNumber,
      limitNumber,
      filter,
      parsedRoleID,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
