import express, { Express } from 'express';
import {inject, injectable} from 'inversify';
import {Server} from 'http';
import 'reflect-metadata';
import { TYPES } from './types';
import { ConfigService } from './config/config.service';
import { ExeptionFilter } from './errors/exeption.filter';
import { PostgresService } from './database/postgres.service';

@injectable()
export class App{
    app: Express;
    server: Server;
    port: number;
    constructor(
        @inject(TYPES.ConfigService) private configService:ConfigService,
        @inject(TYPES.ExeptionFilter) private exeptionFilter:ExeptionFilter,
        @inject(TYPES.PostgresService) private postgresService:PostgresService
    ){
        this.app = express();
        this.port = parseInt(this.configService.get('PORT')) || 8000;
    }
    useRoutes(){

    }
    useExeptionFilters(){
        this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter))
    }   
    async init(){
        this.app.use(express.json());
        this.useRoutes();
        await this.postgresService.connect();
        this.useExeptionFilters();
        this.app.listen(this.port, ()=>console.log(`Server runs at port ${this.port}`))
    }
}