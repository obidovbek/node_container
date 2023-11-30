import { NextFunction, Router, Request, Response, response } from "express";
import { IMiddleware } from "./middleware.interface";

export interface IControllerRoute{
    path: string;
    method: keyof Pick<Router, 'get' | 'post' | 'patch' | 'put'>;
    func: (req:Request, res:Response, next: NextFunction)=>void;
    middleware: IMiddleware[]
}

export type ExpressReturnType = Response<any, Record<string, any>>