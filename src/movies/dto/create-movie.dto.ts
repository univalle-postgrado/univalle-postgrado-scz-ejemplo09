import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({
    description: 'Título de Película',
    example: 'La vida es bella',
  })
  @IsNotEmpty({ message: 'Título no puede estar vacío' })
  @IsString({ message: 'Título debe ser una cadena de texto' })
  title: string;

  @ApiProperty({
    description: 'Sinopsis',
    example:
      'En 1939, a punto de estallar la Segunda Guerra Mundial (1939-1945), el extravagante Guido llega a Arezzo, en la Toscana,...',
  })
  @IsNotEmpty({ message: 'Sinopsis no puede estar vacía' })
  @IsString({ message: 'Sinopsis debe ser una cadena de texto' })
  synopsis: string;

  @ApiProperty({
    description: 'Director',
    example: 'Roberto Benigni',
  })
  @IsNotEmpty({ message: 'Director no puede estar vacío' })
  @IsString({ message: 'Director debe ser una cadena de texto' })
  director: string;

  @ApiProperty({
    description: 'Fecha de estreno',
    example: '1997-12-20',
  })
  @IsDateString(
    {},
    { message: 'Fecha de estreno debe ser de tipo fecha YYYY-MM-DD' },
  )
  releaseDate: Date;

  @ApiProperty({
    description: 'URL de la portada',
    example: 'https://pics.filmaffinity.com/la_vita_e_bella-646167341-mmed.jpg',
  })
  @IsUrl({}, { message: 'La URL de la imagen debe tener formato URI' })
  posterUrl: string;

  @ApiProperty({
    description: 'Valoración',
    example: '8.5',
  })
  @IsNumber({}, { message: 'Valoración debe ser un valor numérico' })
  @Min(0.0)
  @Max(10.0)
  rating: number;

  @IsOptional()
  @IsString({ message: 'Created by debe ser una cadena de texto' })
  createdBy: string;

  @ApiProperty({
    description: 'ID de Categoría',
    example: '3',
  })
  @IsNumber({}, { message: 'Id de Categoría debe ser un valor numérico' })
  @IsPositive({ message: 'Id de Categoría debe ser un número entero positivo' })
  categoryId: number;
}
