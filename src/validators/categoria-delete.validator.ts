import { Categoria } from "src/entities/categoria.entity";
import { Video } from "src/entities/video.entity";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { CategoriaService } from "src/services/categoria.service";
import { getRepository } from "typeorm";
@Injectable()
export class CategoriaDeleteValidator{

    async validate(idCategoria:number){
        let categoria:Categoria = await this.getByIdVideos(idCategoria);
        if(categoria.videos && categoria.videos.length > 0)
            throw new HttpException('Existe videos ligados a essa categoria', HttpStatus.FORBIDDEN);
    }


    async getByIdVideos(id:number):Promise<Categoria>{
        return await getRepository(Categoria).createQueryBuilder('categoria')
                .leftJoinAndSelect('categoria.videos', 'videos')
                .where("categoria.id = :id", {id: id})
                .getOne();
    }


}