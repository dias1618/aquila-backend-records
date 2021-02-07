import { Injectable } from "@nestjs/common";
import { Canal } from "src/entities/canal.entity";
import { getRepository } from "typeorm";

@Injectable()
export class CanalService{

    async save(canal:Canal):Promise<Canal>{
        return await canal.save();
    }

    async get(channelId:string):Promise<Canal>{
        let canal:Canal = await getRepository(Canal).createQueryBuilder('canal')
            .where("canal.idPlatform = :idPlatform", {idPlatform: channelId})
            .getOne();

        if(!canal){
            canal = await this.save(canal);
        }
        return canal;
    }

}