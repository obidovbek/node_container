import express, { Express } from 'express';
import {inject, injectable} from 'inversify';
import {Server} from 'http';
import 'reflect-metadata';
import { TYPES } from './types';
import { IConfigService } from './config/config.service.interface';
import { ExeptionFilter } from './errors/exception.filter';
import { AmocrmController } from './amocrm/amocrm.controller';
const cors = require('cors');
@injectable()
export class App{
    app:Express
    server:Server;
    port:number;

    constructor(
        @inject(TYPES.ConfigService) private configService:IConfigService,
        @inject(TYPES.ExeptionFilter) private exeptionFilter: ExeptionFilter,
        @inject(TYPES.AmocrmController) private amocrmController:AmocrmController
    ){
        this.app = express();
        this.port = parseInt(this.configService.get('PORT')) || 8000;
    }
    useRoutes():void{
        this.app.use('/amocrm', this.amocrmController.router)
    }
    useExceptionFilter():void{
        this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter))
    }
    public async init():Promise<void>{
        this.app.use(cors());
        this.app.use(express.json());
        this.useRoutes();
        this.useExceptionFilter();
        this.server = this.app.listen(this.port);
        console.log(`Server runs on server ${this.port}`)
    }
}