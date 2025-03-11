import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {

    @ApiProperty({
        description: 'Login de usuario',
        example: '',
      })
    @IsNotEmpty({ message: 'Login no puede ser un valor vacío' })
    @IsString({ message: 'Login debe ser una cadena de texto' })
    login: string;

    @ApiProperty({
        description: 'Contraseña de usuario',
        example: '',
      })
    @IsNotEmpty({ message: 'Password no puede ser un valor vacío' })
    @IsString({ message: 'Password debe ser una cadena de texto' })
    password: string;

}