import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RefreshTokenDto {
    @IsNotEmpty({ message: 'Login no puede ser un valor vacío' })
    @IsString({ message: 'Login debe ser una cadena de texto' })
    login: string;

    @IsNotEmpty({ message: 'El refresh_token no puede ser un valor vacío' })
    @IsString({ message: 'El refresh_token debe ser una cadena de texto' })
    refresh_token: string;
}
