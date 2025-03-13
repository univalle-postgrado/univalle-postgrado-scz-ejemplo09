import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query,
  Request,
  DefaultValuePipe,
  ParseBoolPipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Movie } from 'src/movies/entities/movie.entity';

@ApiBearerAuth('access-token')
@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Crear una Categoría' })
  @ApiResponse({
    status: 201,
    description: 'Categoría creada',
  })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto, @Request() request) {
    return this.categoriesService.create(
      createCategoryDto,
      request.user.login,
      request.user.role,
    );
  }

  @ApiOperation({ summary: 'Obtener la lista de todas las Categorías' })
  @ApiQuery({ name: 'page', description: 'Nro de página', example: 1 })
  @ApiQuery({
    name: 'limit',
    description: 'Cantidad de resultados páginados',
    example: 10,
  })
  @ApiQuery({
    name: 'relations',
    description: 'Obtener Películas relacionadas',
    example: false,
  })
  @ApiResponse({
    status: 200,
    description: 'Listado de Categorías',
  })
  @Get()
  findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('relations', new DefaultValuePipe(false), ParseBoolPipe)
    relations: boolean,
  ) {
    return this.categoriesService.findAll(page, limit, relations);
  }

  @ApiOperation({
    summary: 'Obtener los datos de una Categoría en base a su ID',
  })
  @ApiParam({ name: 'id', description: 'ID de categoría' })
  @ApiQuery({
    name: 'relations',
    description: 'Si se requiere obtener su relación con Películas',
  })
  @ApiResponse({ status: 200, description: 'Categoría encontrada' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  @Get(':id')
  findOne(
    @Param('id') id: number,
    @Query('relations', new DefaultValuePipe(false), ParseBoolPipe)
    relations: boolean,
  ) {
    return this.categoriesService.findOne(id, relations);
  }

  @ApiOperation({
    summary: 'Actualizar los datos de una Categoría en base a su ID',
  })
  @ApiParam({ name: 'id', description: 'ID de Categoría' })
  @ApiResponse({ status: 200, description: 'Categoría actualizada' })
  @ApiResponse({
    status: 404,
    description: 'Categoría no actualizada porque no existe',
  })
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Request() request
  ) {
    return this.categoriesService.update(id, updateCategoryDto, request.user.login, request.user.role);
  }

  @ApiOperation({ summary: 'Eliminar una Categoría en base a su ID' })
  @ApiParam({ name: 'id', description: 'ID de Categoría' })
  @ApiResponse({ status: 204, description: 'Categoría eliminada' })
  @ApiResponse({
    status: 404,
    description: 'Categoría no eliminada porque no existe',
  })
  @Delete(':id')
  @HttpCode(204)
  async remove(
    @Param('id') id: number,
    @Query('cascade', new DefaultValuePipe(false), ParseBoolPipe)
    cascade: boolean,
    @Request() request
  ) {
    await this.categoriesService.remove(id, cascade, request.user.role);
  }

  @ApiOperation({
    summary: 'Obtener las Películas de una Categoría en base a su ID',
  })
  @ApiParam({ name: 'id', description: 'ID de Categoría' })
  @ApiResponse({
    status: 200,
    description: 'Listado de Películas asociadas al ID de Categoría',
  })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  @Get(':id/movies')
  findMovies(@Param('id') id: number): Promise<Movie[]> {
    return this.categoriesService.findMovies(id);
  }
}
