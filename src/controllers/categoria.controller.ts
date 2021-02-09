import { Controller, Get, HttpCode } from "@nestjs/common";
import { CategoriaService } from "src/services/categoria.service";

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

}