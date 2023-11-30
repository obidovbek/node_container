export class HTTPError extends Error{
    statusCode:number;
    context?:string;
    constructor(statusCode:number, message:string, context?:string){
        super();
        this.statusCode=statusCode;
        this.context=context;
        this.message=message;
    }
}