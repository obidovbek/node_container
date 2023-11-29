import { NextFunction,Request,Response } from "express";

export interface IAmocrmController{
    getContacts: (req:Request, res:Response, next:NextFunction)=>void
    makeLead: (req:Request, res:Response, next:NextFunction)=>void
}