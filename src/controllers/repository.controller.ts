import { Controller, Post, HttpCode } from '@nestjs/common';
import { CategoriaService } from 'src/services/categoria.service';
import { VideoService } from 'src/services/video.service';

@Controller('repositories')
export class RepositoryController {
  constructor(
      private readonly categoriaService: CategoriaService,
      private readonly videoService: VideoService,
  ) {}

  @Post('categorias')
  @HttpCode(200)
  async loadCategorias() {
    await this.categoriaService.loadCategoriasFromRepositories();
    return 'Categorias carregadas';
  }

  @Post('videos')
  @HttpCode(200)
  async loadVideos() {
    await this.videoService.loadVideosFromRepositories();
    return 'Videos carregadas';
  }

  
}