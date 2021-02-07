import { Injectable } from "@nestjs/common";
import { Video } from "src/entities/video.entity";
import { getRepository } from "typeorm";
import { CanalService } from "./canal.service";
import { CategoriaService } from "./categoria.service";
import { Categoria } from "src/entities/categoria.entity";
import { Canal } from "src/entities/canal.entity";

@Injectable()
export class VideoService{

    constructor(
        public canalService:CanalService,
        public categoriaService:CategoriaService,
    ){}

    async save(video:Video):Promise<Video>{
        return await video.save();
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