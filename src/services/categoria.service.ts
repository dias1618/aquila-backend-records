import { Injectable } from "@nestjs/common";
import { Categoria } from "src/entities/categoria.entity";
import { getRepository } from "typeorm";

@Injectable()
export class CategoriaService{

    async save(categoria:Categoria):Promise<Categoria>{
        return await categoria.save();
    }

    async get():Promise<Categoria[]>{
        return await getRepository(Categoria).createQueryBuilder('categoria')
            .getMany();
    }

    async getById(id:number):Promise<Categoria>{
        return await getRepository(Categoria).createQueryBuilder('categoria')
                .where("categoria.id = :id", {id: id})
                .getOne();
    }

    async delete(id:number){
        let categoria = new Categoria(await this.getById(id));
        return categoria.remove();
    }

}