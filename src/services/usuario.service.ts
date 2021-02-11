import { Injectable } from "@nestjs/common";
import { Usuario } from "src/entities/usuario.entity";
import { getRepository } from "typeorm";

@Injectable()
export class UsuarioService{

    async save(usuario:Usuario):Promise<Usuario>{
        return await usuario.save();
    }

    async get():Promise<Usuario[]>{
        return await getRepository(Usuario).createQueryBuilder('usuario')
            .getMany();
    }

    async getById(id:number):Promise<Usuario>{
        return await getRepository(Usuario).createQueryBuilder('usuario')
                .where("usuario.id = :id", {id: id})
                .getOne();
    }

    async delete(id:number){
        let usuario = new Usuario(await this.getById(id));
        return usuario.remove();
    }

}