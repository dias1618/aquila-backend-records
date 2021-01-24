import { Injectable } from "@nestjs/common";
import { Handling } from "../handling.interface";

@Injectable()
export class InvalidTokenHandling implements Handling{
    verify(exception):boolean{
        if(exception.response.data && 
            exception.response.data.error && 
            exception.response.data.error == 'invalid_token')
            return true;
        return false;
    }

}