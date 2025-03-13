import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  DefaultValuePipe,
  Query,
  ParseBoolPipe,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @ApiOperation({ summary: 'Crear una Película' })
  @ApiResponse({
    status: 201,
    description: 'Película creada',
  })
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @ApiOperation({ summary: 'Obtener la lista de todas las Películas' })
  @ApiQuery({ name: 'page', description: 'Nro de página', example: 1 })
  @ApiQuery({
    name: 'limit',
    description: 'Cantidad de resultados páginados',
    example: 10,
  })
  @ApiQuery({
    name: 'relations',
    description: 'Obtener Categoría relacionada',
    example: false,
  })
  @ApiResponse({
    status: 200,
    description: 'Listado de Películas',
  })
  @Get()
  findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('relations', new DefaultValuePipe(false), ParseBoolPipe)
    relations: boolean,
  ) {
    return this.moviesService.findAll(page, limit, relations);
  }

  @ApiOperation({
    summary: 'Obtener los datos de una Película en base a su ID',
  })
  @ApiParam({ name: 'id', description: 'ID de Película' })
  @ApiQuery({
    name: 'relations',
    description: 'Si se requiere obtener su relación con Categoría',
  })
  @ApiResponse({ status: 200, description: 'Película encontrada' })
  @ApiResponse({ status: 404, description: 'Película no encontrada' })
  @Get(':id')
  findOne(
    @Param('id') id: number,
    @Query('relations', new DefaultValuePipe(false), ParseBoolPipe)
    relations: boolean,
  ) {
    return this.moviesService.findOne(id, relations);
  }

  @ApiOperation({
    summary: 'Actualizar los datos de una Película en base a su ID',
  })
  @ApiParam({ name: 'id', description: 'ID de Película' })
  @ApiResponse({ status: 200, description: 'Película actualizada' })
  @ApiResponse({
    status: 404,
    description: 'Película no actualizada porque no existe',
  })
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @ApiOperation({ summary: 'Eliminar una Película en base a su ID' })
  @ApiParam({ name: 'id', description: 'ID de Película' })
  @ApiResponse({ status: 204, description: 'Película eliminada' })
  @ApiResponse({
    status: 404,
    description: 'Película no eliminada porque no existe',
  })
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: number) {
    await this.moviesService.remove(id);
  }

  @ApiOperation({
    summary: 'Obtener la Categoría de una Película en base a su ID',
  })
  @ApiParam({ name: 'id', description: 'ID de Película' })
  @ApiResponse({
    status: 200,
    description: 'Categoría asociada al ID de Película',
  })
  @ApiResponse({ status: 404, description: 'Película no encontrada' })
  @Get(':id/category')
  findCategory(@Param('id') id: number) {
    return this.moviesService.findCategory(id);
  }
}
