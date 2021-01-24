import { AxiosCommunicationService } from "src/services/external-communication/axios-communication.service";
import { Injectable } from "@nestjs/common";
import { InvalidTokenHandling } from "src/services/video-api/youtube-api/invalid-token-handling";
import { AxiosHeader } from "src/services/external-communication/axios-header";
import { Handling } from "../handling.interface";

const editJsonFile = require('edit-json-file');

let file = editJsonFile(`./youtube-api.config.json`, {
    autosave: true
});

@Injectable()
export class ConfigManagerService{

    constructor(
        public axios:AxiosCommunicationService,
        private invalidTokenHandling:Handling,
    ){}

    init(){
        this.saveParam("access_key", "AIzaSyCRny6GX2J6aTylbNU6CBtPWYskTh0wEic");
        this.saveParam("client_id", "786742287162-9rlb7i571e705dt8n2nkkohj8thia5k1.apps.googleusercontent.com");
        this.saveParam("client_secret", "P6B-dbcaaVex39NcUf2PdrYb");
        this.saveParam("refresh_token", "1//04FZBLYeNB5RiCgYIARAAGAQSNwF-L9Ir6qLbE9J26bQC7w5JnWs9oIYg3whjVxtNlvIPks6hCg6b6zYVjquocuDfdWzVl9kMcaM");
        this.saveParam("authorization_code", "4/0AY0e-g4PBGv_TGp1qKFNRmiecgqdFrUg2Sl3GeFirA_R9KeSWBYvk5VNmb2f5dqF8rLl_Q");
        this.saveParam("access_token", "");
    }

    loadParam(key:string):string{
        return file.get(key);
    }

    saveParam(key:string, value:string){
        file.set(key, value);
    }

    async verifyToken():Promise<boolean>{
        try{
            let accessToken = this.loadParam("access_token");
            await this.axios.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`);
        }
        catch(exception){
            if(this.invalidTokenHandling.verify(exception)){
                await this.refreshToken();
            }
        }
        
        return true;
    }

    async refreshToken(){
        let clientId:string = this.loadParam("client_id");
        let clientSecret:string = this.loadParam("client_secret");
        let refreshToken:string = this.loadParam("refresh_token");
        let response = await this.axios.post(
            'https://oauth2.googleapis.com/token',
            {
                client_id: clientId,
                client_secret: clientSecret,
                refresh_token: refreshToken,
                grant_type: 'refresh_token'
            },
            new AxiosHeader({
                key: 'Content-Type',
                value: 'application/x-www-form-urlencoded'
            })
        );
        this.saveParam('access_token', response.data.access_token);
        return response;
    }

}