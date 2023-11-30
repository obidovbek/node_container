import { injectable } from "inversify";
import { IExeptionFilter } from "./exeption.filter.interface";
import { HTTPError } from "./http-error.class";
import 'reflect-metadata';
import { Request, Response, NextFunction } from "express";

@injectable()
export class ExeptionFilter implements IExeptionFilter{
    catch(err: Error | HTTPError,req:Request, res:Response, next:NextFunction){
        if(err instanceof HTTPError){
            res.status(err.statusCode).send({err:err.message})
        }else{
            console.log(`${err.message}`);
            res.status(500).send({err:err.message})
        }
    }
}