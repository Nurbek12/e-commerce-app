import { Controller } from '@nestjs/common'
import { GetByIdRequest } from 'gen/constants'
import { UsersService } from './users.service'
import { GrpcMethod } from '@nestjs/microservices'
import { GetUserRequest, GetUsersRequest, CreateUserRequest, UpdateUserRequest, USERS_SERVICE_NAME } from 'gen/users'

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod(USERS_SERVICE_NAME, 'GetUsers')
  findAll(findUsers: GetUsersRequest) {
    return this.usersService.paginatedUsers(findUsers)
  }
  
  @GrpcMethod(USERS_SERVICE_NAME, 'GetUser')
  findOne(findUser: GetUserRequest) {
    return this.usersService.findUser(findUser)
  }
  
  @GrpcMethod(USERS_SERVICE_NAME, 'CreateUser')
  create(createdUser: CreateUserRequest) {
    return this.usersService.createUser(createdUser as any)
  }
  
  @GrpcMethod(USERS_SERVICE_NAME, 'UpdateUser')
  update(updatedUser: UpdateUserRequest) {
    const { id, ...userData } = updatedUser
    return this.usersService.updateUser(id, userData as any) // TODO: enum role fix
  }
  
  @GrpcMethod(USERS_SERVICE_NAME, 'DeleteUser')
  remove(removeUser: GetByIdRequest) {
    return this.usersService.removeUser(removeUser.id)
  }
}
