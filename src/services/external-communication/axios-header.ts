export class AxiosHeader{
    private _headers:{key:string, value:string};

    constructor(headers?:{key:string, value:string}){
        this._headers = headers;
    }

    add(key:string, value:string){
        this._headers[key] = value;
    }

    remove(key:string){
        this._headers[key] = null;
    }

    load(){
        return{headers: this._headers}
    }
}