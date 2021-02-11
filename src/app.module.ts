import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AxiosCommunicationService } from './services/external-communication/axios-communication.service';
import { CanalService } from './services/canal.service';
import { CategoriaService } from './services/categoria.service';
import { VideoService } from './services/video.service';
import { CategoriaController } from './controllers/categoria.controller';
import { CanalController } from './controllers/canal.controller';
import { VideoController } from './controllers/video.controller';
import { UsuarioService } from './services/usuario.service';
import { UsuarioController } from './controllers/usuario.controller';

@Module({
  imports: [TypeOrmModule.forRoot()],
  controllers: [
    AppController,
    CategoriaController,
    CanalController,
    VideoController,
    UsuarioController
  ],
  providers: [
    AppService,
    AxiosCommunicationService,
    CanalService,
    CategoriaService,
    VideoService,
    AxiosCommunicationService,
    UsuarioService
  ],
})
export class AppModule {}
