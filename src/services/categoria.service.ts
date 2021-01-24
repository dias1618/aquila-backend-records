import { Injectable } from "@nestjs/common";
import { Categoria } from "src/entities/categoria.entity";
import { getRepository } from "typeorm";
import { RepositoryService } from "./repository.service";

@Injectable()
export class CategoriaService{

    constructor(public repositoryService:RepositoryService){}

    async save(categoria:Categoria){
        await categoria.save();
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

    async loadCategoriasFromRepositories(){
        let categorias:Categoria[] = await this.repositoryService.loadCategorias();
        for(let categoria of categorias){
            this.save(categoria);
        }

    }

}