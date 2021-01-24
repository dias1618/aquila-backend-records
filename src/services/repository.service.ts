import { Injectable } from "@nestjs/common";
import { YoutubeApiService } from "./video-api/youtube-api/youtube-api.service";
import { RepositoryVideo } from "./video-api/repository-video.interface";
import { Categoria } from "src/entities/categoria.entity";
import { Video } from "src/entities/video.entity";
import { Canal } from "src/entities/canal.entity";

@Injectable()
export class RepositoryService{

    repositories:RepositoryVideo[] = [];

    constructor(
        public youtubeApiService:YoutubeApiService
    ){
        this.repositories.push(youtubeApiService);
    }


    async loadCategorias():Promise<Categoria[]>{
        let categorias:Categoria[] = [];
        for(let repository of this.repositories){
            categorias.push(...await repository.loadCategorias());
        }
        return categorias;
    }

    async loadVideos(categoria:Categoria):Promise<Video[]>{
        let videos:Video[] = [];
        for(let repository of this.repositories){
            let videosBuscados = await repository.loadVideos(categoria);
            if(videosBuscados)
                videos.push(...videosBuscados);
        }
        return videos;
    }

    async getCanal(channelId:string):Promise<Canal>{
        return await this.youtubeApiService.getCanal(channelId);
    }
}