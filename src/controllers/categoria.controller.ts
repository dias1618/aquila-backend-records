import { Controller, Get, HttpCode, Post, Body, Put, Delete, Param } from "@nestjs/common";
import { CategoriaService } from "src/services/categoria.service";
import { Categoria } from "src/entities/categoria.entity";

@Controller('categorias')
export class CategoriaController {
  constructor(
      private readonly categoriaService: CategoriaService,
  ) {}

  @Get()
  @HttpCode(200)
  async get() {
    return await this.categoriaService.get();
  }

  @Post()
  @HttpCode(200)
  async insert(@Body() categoria:Categoria) {
      return await this.categoriaService.save(new Categoria(categoria));
  }

  @Put()
  @HttpCode(200)
  async update(@Body() categoria:Categoria) {
    return await this.categoriaService.save(new Categoria(categoria));
  }

  @Delete(':id')
  @HttpCode(200)
  async delete(@Param('id') id:number) {
    return await this.categoriaService.delete(id);
  }
}