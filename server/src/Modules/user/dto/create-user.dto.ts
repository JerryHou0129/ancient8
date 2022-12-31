import { IsNotEmpty, IsString } from 'class-validator'

export class CreateUserBdoy {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  id: string
}
