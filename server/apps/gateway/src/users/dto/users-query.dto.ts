import { ApiProperty } from '@nestjs/swagger'
import { GetUsersRequest, SortingUsers } from 'gen/users'
import { IsString, IsOptional, IsNumber, IsArray } from 'class-validator'

export class UsersQueryDto implements GetUsersRequest {
    @IsArray()
    @IsOptional()
    @ApiProperty()
    ids: number[]

    @IsNumber()
    @IsOptional()
    @ApiProperty()
    limit: number

    @IsOptional()
    @ApiProperty()
    orderBy: SortingUsers

    @IsNumber()
    @IsOptional()
    @ApiProperty()
    page: number

    @IsString()
    @IsOptional()
    @ApiProperty()
    search: string
}
