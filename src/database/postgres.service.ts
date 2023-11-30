import { inject, injectable } from "inversify";
import { Sequelize } from "sequelize-typescript";
import { ConfigService } from "../config/config.service";
import { postgresConfig } from "../config/postgres.config";
import { TYPES } from "../types";
import { User } from "../users/user.model";
import { IPostgresService } from "./postgres.service.interface";
@injectable()
export class PostgresService implements IPostgresService{
    sequelize:Sequelize

    constructor(@inject(TYPES.ConfigService) private configService:ConfigService){
        this.sequelize = new Sequelize({
            database: this.configService.get('SEQUELIZE_DATAABASE'),
            username: this.configService.get('SEQUELIZE_USERNAME'),
            password: this.configService.get('SEQUELIZE_PASSWORD'),
            host: this.configService.get('SEQUELIZE_HOST'),
            port: parseInt(this.configService.get('SEQUELIZE_PORT')),
            dialect: 'postgres',
        })
        this.sequelize.addModels([User])
    }

    async connect(){
        try{
            await this.sequelize.authenticate();
            await this.sequelize.sync();
            console.log(`Connection to Postgress database established`);
        }catch(e){
            if(e instanceof Error){
                console.log(`Error connection to Postgres database ${e.message}`)
            }
        }
        await this.sequelize.authenticate();
        await this.sequelize.sync();
    }
}