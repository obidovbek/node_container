import { NextFunction,Response,Request } from "express";
import { inject, injectable } from "inversify";
import { BaseController } from "../common/base.controller";
import { IAmocrmController } from "./interfaces/amocrm.controller.interface";
import 'reflect-metadata';
import { TYPES } from "../types";
import { AmocrmService } from "./amocrm.service";
import { HTTPError } from "../errors/http-error.class";

@injectable()
export class AmocrmController extends BaseController implements IAmocrmController{
    constructor(
        @inject(TYPES.AmocrmService) private amocrmService:AmocrmService
    ){
        super();
        this.bindRoutes([
            {
                path: '/contacts',
                method: 'get',
                func: this.getContacts,

            },
            {
                path: '/make-lead',
                method: 'post',
                func: this.makeLead
            }
        ])
    }
    async makeLead(
        req:Request,
        res:Response,
        next:NextFunction
    ){
        try{
            const createOrUpdateContact:any =await this.amocrmService.createOrUpdateContact(req.body);
            const lead = await this.amocrmService.makeLead(createOrUpdateContact?._embedded.contacts[0].id)
            this.ok(res, {message:"Contact created", data: lead})
        }catch(e){
            next(new HTTPError(500, "Can not create account"));
        }
    }
    async getContacts(
        req:Request,
        res:Response,
        next:NextFunction
    ){
        try{
            const contacts = await this.amocrmService.getContact();
            this.ok(res, {message: 'User contacts', data:contacts})
        }catch(e){
            next(new HTTPError(500, 'Can not get contacts'))
        }
    }
}