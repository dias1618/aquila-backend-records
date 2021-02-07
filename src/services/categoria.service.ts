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

    async getByIdPlatform(idPlatform:number):Promise<Categoria>{
        return await getRepository(Categoria).createQueryBuilder('categoria')
            .where("categoria.idPlatform = :idPlatform", {idPlatform: idPlatform})
            .getOne();
    }

    async categoriaExistente(categoria:Categoria):Promise<boolean>{
        let categoriaBuscada:Categoria = await this.getByIdPlatform(categoria.idPlatform);
        return categoriaBuscada!=undefined && categoriaBuscada!=null;
    }

}