import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AxiosCommunicationService } from './services/external-communication/axios-communication.service';
import { RepositoryController } from './controllers/repository.controller';
import { CanalService } from './services/canal.service';
import { CategoriaService } from './services/categoria.service';
import { VideoService } from './services/video.service';

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
    VideoService,
    AxiosCommunicationService,
    
  ],
})
export class AppModule {}
