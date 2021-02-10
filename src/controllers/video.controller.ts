import { Controller, Get, HttpCode, Post, Body, Put, Delete, Param } from "@nestjs/common";
import { VideoService } from "src/services/video.service";
import { Video } from "src/entities/video.entity";

@Controller('videos')
export class VideoController {
  constructor(
      private readonly videoService: VideoService,
  ) {}

  @Get()
  @HttpCode(200)
  async get() {
    return await this.videoService.get();
  }

  @Post()
  @HttpCode(200)
  async insert(@Body() video:Video) {
      return await this.videoService.save(new Video(video));
  }

  @Put()
  @HttpCode(200)
  async update(@Body() video:Video) {
    return await this.videoService.save(new Video(video));
  }

  @Delete(':id')
  @HttpCode(200)
  async delete(@Param('id') id:number) {
    return await this.videoService.delete(id);
  }
}