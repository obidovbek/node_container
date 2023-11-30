import { IConfigService } from "./config.service.interface";
import { DotenvParseOutput,DotenvConfigOutput,config } from 'dotenv';
import { injectable } from "inversify";

@injectable()
export class ConfigService implements IConfigService{
    private config: DotenvParseOutput;
    constructor(){
        const result:DotenvConfigOutput = config({path: `.${process.env.NODE_ENV}.env`})
        if(result.error){
            console.log('[Configuration] can not get env configuration')
        }else{
            this.config = result.parsed as DotenvParseOutput;
            console.log('[Configuration] env configuration loaded');
        }
    }

    get(key:string){
        return this.config[key];
    }
    
}