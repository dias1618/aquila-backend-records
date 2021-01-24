import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AxiosCommunicationService } from './services/external-communication/axios-communication.service';
import { RepositoryController } from './controllers/repository.controller';
import { CanalService } from './services/canal.service';
import { CategoriaService } from './services/categoria.service';
import { RepositoryService } from './services/repository.service';
import { VideoService } from './services/video.service';
import { YoutubeApiService } from './services/video-api/youtube-api/youtube-api.service';
import { ConfigManagerService } from './services/video-api/youtube-api/config-manager.service';
import { Handling } from './services/video-api/handling.interface';
import { InvalidTokenHandling } from './services/video-api/youtube-api/invalid-token-handling';

@Module({
  imports: [TypeOrmModule.forRoot()],
  controllers: [
    AppController,
    RepositoryController
  ],
  providers: [
    AppService,
    AxiosCommunicationService,
    CanalService,
    CategoriaService,
    RepositoryService,
    VideoService,
    YoutubeApiService,
    ConfigManagerService,
    AxiosCommunicationService,
    {
      provide: Handling,
      useClass: InvalidTokenHandling
    },
    
  ],
})
export class AppModule {}
