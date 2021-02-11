import { Controller, Get, HttpCode, Post, Body, Put, Delete, Param } from "@nestjs/common";
import { UsuarioService } from "src/services/usuario.service";
import { Usuario } from "src/entities/usuario.entity";

@Controller('usuarios')
export class UsuarioController {
  constructor(
      private readonly usuarioService: UsuarioService,
  ) {}

  @Get()
  @HttpCode(200)
  async get() {
    return await this.usuarioService.get();
  }

  @Post()
  @HttpCode(200)
  async insert(@Body() usuario:Usuario) {
      return await this.usuarioService.save(new Usuario(usuario));
  }

  @Put()
  @HttpCode(200)
  async update(@Body() usuario:Usuario) {
    return await this.usuarioService.save(new Usuario(usuario));
  }

  @Delete(':id')
  @HttpCode(200)
  async delete(@Param('id') id:number) {
    return await this.usuarioService.delete(id);
  }
}