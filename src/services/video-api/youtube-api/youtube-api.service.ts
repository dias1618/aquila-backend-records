import { ConfigManagerService } from "./config-manager.service";
import { Injectable } from "@nestjs/common";
import { AxiosCommunicationService } from "src/services/external-communication/axios-communication.service";
import { AxiosHeader } from "src/services/external-communication/axios-header";
import { Video } from "src/entities/video.entity";
import { RepositoryVideo } from "../repository-video.interface";
import { Categoria } from "src/entities/categoria.entity";
import { Canal } from "src/entities/canal.entity";

@Injectable()
export class YoutubeApiService implements RepositoryVideo{
    
    constructor(
        public axios:AxiosCommunicationService,
        public config:ConfigManagerService,
    ){}

    async loadCategorias(){
        let categorias:Categoria[] = [];
        let accessKey = this.config.loadParam('access_key');
        let response = await this.axios.get(
            `https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=BR&hl=pt&key=${accessKey}`, 
            new AxiosHeader({
                key: 'Authorization',
                value: this.config.loadParam('access_token')
            })
        );
        for(let item of response.data.items){
            let categoria = new Categoria({
                nome: item.snippet.title,
                idPlatform: item.id
            });
            categorias.push(categoria);
        }
        return categorias;
    }

    async loadVideos(categoria:Categoria):Promise<Video[]>{

        try{
            //await this.config.verifyToken();

            let videos:Video[] = [];
            
            let accessKey = this.config.loadParam('access_key');
            let response = await this.axios.get(
                `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&chart=mostPopular&maxResults=50&regionCode=BR&videoCategoryId=${categoria.idPlatform}&key=${accessKey}`, 
                new AxiosHeader({
                    key: 'Authorization',
                    value: this.config.loadParam('access_token')
                })
            );

            for(let item of response.data.items){
                let video = new Video({
                    titulo: item.snippet.title,
                    descricao: item.snippet.description, 
                    url: `https://www.youtube.com/watch?v=${item.id}`, 
                    duracao: item.contentDetails.duration,
                    criado: new Date(item.snippet.publishedAt),
                    idPlatform: item.id,
                    urlImage: item.snippet.thumbnails.default.url
                });

                video.channelId = item.snippet.channelId;
                video.categoryId = item.snippet.categoryId;

                videos.push(video);
            }
            return videos;
        }

        catch(exception){
            console.log(exception.response.data);
        }
 
    }

    async getCanal(channelId:string):Promise<Canal>{
        try{
            //await this.config.verifyToken();

            let accessKey = this.config.loadParam('access_key');
            let response = await this.axios.get(
                `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails&id=${channelId}&key=${accessKey}`, 
                new AxiosHeader({
                    key: 'Authorization',
                    value: this.config.loadParam('access_token')
                })
            );

            let canal;
            for(let item of response.data.items){
                canal = new Canal({
                    idPlatform: channelId,
                    titulo: item.snippet.title,
                    descricao: item.snippet.description, 
                    urlImagem: item.snippet.thumbnails.default.url
                });
            }

            return canal;
        }

        catch(exception){
            console.log(exception.response.data);
        }       
    }

}