import { Canal } from "src/entities/canal.entity";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { getRepository } from "typeorm";
@Injectable()
export class CanalDeleteValidator{

    async validate(idCanal:number){
        let canal:Canal = await this.getByIdVideos(idCanal);
        if(canal.videos && canal.videos.length > 0)
            throw new HttpException('Existe videos ligados a essa canal', HttpStatus.FORBIDDEN);
    }


    async getByIdVideos(id:number):Promise<Canal>{
        return await getRepository(Canal).createQueryBuilder('canal')
                .leftJoinAndSelect('canal.videos', 'videos')
                .where("canal.id = :id", {id: id})
                .getOne();
    }


}