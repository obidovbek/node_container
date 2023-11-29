import { Request, Response, NextFunction } from "express";
import { HTTPError } from "./http-error.class";
import 'reflect-metadata';
import { IExeptionFilter } from "./exception.filter.interface";
import { injectable } from "inversify";

@injectable()
export class ExeptionFilter implements IExeptionFilter{
    catch(err: Error | HTTPError, req:Request, res:Response, next:NextFunction){
        if(err instanceof HTTPError){
            console.log(`[${err.context}] Error ${err.statusCode}: ${err.message}`)
            res.status(err.statusCode).send({err:err.message});
        }else{
            console.log(`${err.message}`);
            res.status(500).send({err:err.message});
        }
    }
}