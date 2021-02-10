import { Controller, Get, HttpCode, Post, Body, Put } from "@nestjs/common";
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
      return await this.categoriaService.save(categoria);
  }

  @Put()
  @HttpCode(200)
  async update(@Body() categoria:Categoria) {
      return await this.categoriaService.save(categoria);
  }
}