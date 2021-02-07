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

    async save(video:Video):Promise<Video>{
        return await video.save();
    }

    async loadVideosFromRepositories():Promise<number>{
        let quantidade:number = 0;
        let idCanais:string[] = [];
        let categorias:Categoria[] = await this.categoriaService.get();
        for(let categoria of categorias){
            let videos:Video[] = await this.repositoryService.loadVideos(categoria);
            for(let video of videos){
                let ret = await this.getByIdPlatform(video.idPlatform);
                if(!ret){
                    idCanais = this.adicionarSemRepeticao(idCanais, video.channelId);
                    video.categoria = await this.categoriaService.getByIdPlatform(video.categoryId);
                    video = await this.save(video);
                    console.log(`[records] Video cadastrado: ${video.descricao}`);
                    quantidade++;
                }
            }
        }

        for(let idCanal of idCanais){
            let canal:Canal = await this.canalService.get(idCanal);
            console.log(`[records] Canal cadastrado: ${canal.titulo}`);
        }

        return quantidade;
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