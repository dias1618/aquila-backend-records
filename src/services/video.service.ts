import { Injectable } from "@nestjs/common";
import { Video } from "src/entities/video.entity";
import { getRepository } from "typeorm";
import { RepositoryService } from "./repository.service";
import { CanalService } from "./canal.service";
import { CategoriaService } from "./categoria.service";
import { Categoria } from "src/entities/categoria.entity";
import { Canal } from "src/entities/canal.entity";

@Injectable()
export class VideoService{

    constructor(
        public repositoryService:RepositoryService,
        public canalService:CanalService,
        public categoriaService:CategoriaService,
    ){}

    async save(video:Video){
        await video.save();
    }

    async loadVideosFromRepositories(){
        let idCanais:string[] = [];
        let categorias:Categoria[] = await this.categoriaService.get();
        for(let categoria of categorias){
            let videos:Video[] = await this.repositoryService.loadVideos(categoria);
            for(let video of videos){
                let ret = await this.getByIdPlatform(video.idPlatform);
                if(!ret){
                    idCanais = this.adicionarSemRepeticao(idCanais, video.channelId);
                    video.categoria = await this.categoriaService.getByIdPlatform(video.categoryId);
                    await this.save(video);
                }
            }
        }

        for(let idCanal of idCanais){
            await this.canalService.get(idCanal);
        }
    }

    adicionarSemRepeticao(idCanais:string[], novoId:string):string[]{
        let pertence:boolean = false;
        for(let id of idCanais){
            if(id == novoId)
                pertence = true;
        }

        if(!pertence)
            idCanais.push(novoId);

        return idCanais;
    }

    async getByIdPlatform(idPlatform:string):Promise<Video>{
        return await getRepository(Video).createQueryBuilder('video')
            .where("video.idPlatform = :idPlatform", {idPlatform: idPlatform})
            .getOne();
    }
}