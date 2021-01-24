import { Video } from "src/entities/video.entity";
import { Categoria } from "src/entities/categoria.entity";

export abstract class RepositoryVideo{
    abstract loadCategorias():Promise<Categoria[]>;
    abstract loadVideos(categoria:Categoria): Promise<Video[]>;
}