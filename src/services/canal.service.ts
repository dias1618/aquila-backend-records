import { Injectable } from "@nestjs/common";
import { Canal } from "src/entities/canal.entity";
import { getRepository } from "typeorm";
import { RepositoryService } from "./repository.service";

@Injectable()
export class CanalService{

    constructor(public repositoryService:RepositoryService){}

    async save(canal:Canal){
        await canal.save();
    }

    async get(channelId:string):Promise<Canal>{
        console.log('channelId = ', channelId)
        let canal:Canal = await getRepository(Canal).createQueryBuilder('canal')
            .where("canal.idPlatform = :idPlatform", {idPlatform: channelId})
            .getOne();

        console.log('canal = ', canal)    
        if(!canal){
            console.log('entrou')
            canal = await this.repositoryService.getCanal(channelId)
            await this.save(canal);
        }
        console.log('');
        return canal;
    }

}