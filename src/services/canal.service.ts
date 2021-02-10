import { Injectable } from "@nestjs/common";
import { Canal } from "src/entities/canal.entity";
import { getRepository } from "typeorm";

@Injectable()
export class CanalService{

    async save(canal:Canal):Promise<Canal>{
        return await canal.save();
    }

    async get():Promise<Canal[]>{
        return await getRepository(Canal).createQueryBuilder('canal')
            .getMany();
    }

    async getById(id:number):Promise<Canal>{
        return await getRepository(Canal).createQueryBuilder('canal')
                .where("canal.id = :id", {id: id})
                .getOne();
    }

    async delete(id:number){
        let canal = new Canal(await this.getById(id));
        return canal.remove();
    }

}