const axios = require('axios');
const qs = require('querystring');

import { ExternalCommunication } from "./external-communication";
import { Injectable } from "@nestjs/common";
import { AxiosHeader } from "./axios-header";

@Injectable()
export class AxiosCommunicationService implements ExternalCommunication{

    
    async get(url:string, axiosHeader?:AxiosHeader){
        return await axios.get(url, (axiosHeader ? axiosHeader.load() : null));
    }

    async post(url:string, body:any, axiosHeader:AxiosHeader){
        return await axios.post(url, qs.stringify(body), axiosHeader.load());
    }

}