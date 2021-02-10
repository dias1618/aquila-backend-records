import { Injectable } from "@nestjs/common";
import { Video } from "src/entities/video.entity";
import { getRepository } from "typeorm";

@Injectable()
export class VideoService{

    async save(video:Video):Promise<Video>{
        return await video.save();
    }

    async get():Promise<Video[]>{
        return await getRepository(Video).createQueryBuilder('video')
            .getMany();
    }

    async getById(id:number):Promise<Video>{
        return await getRepository(Video).createQueryBuilder('video')
                .where("video.id = :id", {id: id})
                .getOne();
    }

    async delete(id:number){
        let video = new Video(await this.getById(id));
        return video.remove();
    }

}