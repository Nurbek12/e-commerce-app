import { USERS_SERVICE_NAME } from 'gen/users'
import { ClientGrpc } from '@nestjs/microservices'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { GetUsersRequest, UsersServiceClient } from 'gen/users'
import { Controller, Get, Post, Body, Put, Query, Param, Delete, Inject, OnModuleInit } from '@nestjs/common'

@Controller('users')
export class UsersController implements OnModuleInit {
  constructor(@Inject('USERS_PACKAGE') private usersClient: ClientGrpc) {}

  usersService: UsersServiceClient

  onModuleInit() {
    this.usersService = this.usersClient.getService<UsersServiceClient>(USERS_SERVICE_NAME)
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  findAll(@Query() usersQuery: GetUsersRequest) {
    return this.usersService.getUsers(usersQuery)
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.getUser({ id })
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser({ id, ...updateUserDto });
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.deleteUser({ id });
  }
}
