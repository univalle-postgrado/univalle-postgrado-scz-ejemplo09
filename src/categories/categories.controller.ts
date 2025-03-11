import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query, Request, DefaultValuePipe, ParseBoolPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@ApiTags('v1')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto, @Request() request) {
    return this.categoriesService.create(createCategoryDto, request.user.login, request.user.role);
  }

  @ApiOperation({ summary: 'Obtener la lista de todas las categorías' })
  @ApiQuery({ name: 'page', description: 'Nro de página', example: 1 })
  @ApiQuery({ name: 'limit', description: 'Cantidad de resultados páginados', example: 10 })
  @ApiQuery({ name: 'relations', description: 'Obtener Películas relacionadas', example: false })
  @Get()
  findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('relations', new DefaultValuePipe(false), ParseBoolPipe) relations: boolean
  ) {
    return this.categoriesService.findAll(page, limit, relations);
  }

  @ApiParam({ name: 'id', description: 'ID de categoría' })
  @ApiQuery({ name: 'relations', description: 'Si se requiere obtener su relación con Películas' })
  @ApiResponse({ status: 200, description: 'Categoría encontrada' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  @Get(':id')
  findOne(
    @Param('id') id: number,
    @Query('relations', new DefaultValuePipe(false), ParseBoolPipe) relations: boolean
  ) {
    return this.categoriesService.findOne(id, relations);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(
    @Param('id') id: number,
    @Query('cascade', new DefaultValuePipe(false), ParseBoolPipe) cascade: boolean,
  ) {
    await this.categoriesService.remove(id, cascade);
  }

  @Get(':id/movies')
  findMovies(@Param('id') id: number) {
    return this.categoriesService.findMovies(id);
  }
}
