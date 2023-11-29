import { NextFunction } from "express";
import { IContact } from "../amocrm.service";

export interface IAmocrmService{
    getContact: ()=>void,
    createOrUpdateContact: (r:IContact)=>void
}