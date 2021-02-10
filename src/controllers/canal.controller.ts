import { Controller, Get, HttpCode, Post, Body, Put, Delete, Param } from "@nestjs/common";
import { CanalService } from "src/services/canal.service";
import { Canal } from "src/entities/canal.entity";

@Controller('canais')
export class CanalController {
  constructor(
      private readonly canalService: CanalService,
  ) {}

  @Get()
  @HttpCode(200)
  async get() {
    return await this.canalService.get();
  }

  @Post()
  @HttpCode(200)
  async insert(@Body() canal:Canal) {
      return await this.canalService.save(new Canal(canal));
  }

  @Put()
  @HttpCode(200)
  async update(@Body() canal:Canal) {
    return await this.canalService.save(new Canal(canal));
  }

  @Delete(':id')
  @HttpCode(200)
  async delete(@Param('id') id:number) {
    return await this.canalService.delete(id);
  }
}