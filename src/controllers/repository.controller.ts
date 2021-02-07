import { Controller, Post, HttpCode, Get } from '@nestjs/common';
import { CategoriaService } from 'src/services/categoria.service';
import { VideoService } from 'src/services/video.service';

@Controller('repositories')
export class RepositoryController {
  constructor(
      private readonly categoriaService: CategoriaService,
      private readonly videoService: VideoService,
  ) {}

  @Get('categorias')
  @HttpCode(200)
  async loadCategorias() {
    let quantidade = await this.categoriaService.loadCategoriasFromRepositories();
    return `${quantidade} categorias carregadas`;
  }

  @Get('videos')
  @HttpCode(200)
  async loadVideos() {
    let quantidade = await this.videoService.loadVideosFromRepositories();
    return `${quantidade} videos carregados`;
  }

  
}