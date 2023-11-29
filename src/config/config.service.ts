import { DotenvParseOutput, DotenvConfigOutput, config } from "dotenv";
import { injectable } from "inversify";
import { IConfigService } from "./config.service.interface";

@injectable()
export class ConfigService implements IConfigService{
    private config: DotenvParseOutput;
    constructor(){
        const result: DotenvConfigOutput = config({path: `.${process.env.NODE_ENV}.env`})
        if(result.error){
            console.log('[ConfigService] can not get .env configuration');
        }else{
            console.log('[ConfigService] configuration loaded');
            this.config = result.parsed as DotenvParseOutput;
        }
    }

    get(key:string):string{
        return this.config[key];
    }

}