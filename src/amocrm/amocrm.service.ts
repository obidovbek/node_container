import { inject, injectable } from "inversify";
import { IAmocrmService } from "./interfaces/amocrm.service.interface";
import { TYPES } from "../types";
import { ConfigService } from "../config/config.service";
import axios from "axios";
import { NextFunction } from "express";
import { HTTPError } from "../errors/http-error.class";

export interface IContact{
    name: string;
    phone:string;
    email:string;
}

@injectable()
export class AmocrmService implements IAmocrmService{
    
    private httpOptions = {
        headers: {
            "Authorization": `Bearer ${this.configService.get('ACCESS_TOKEN')}`,
            "Content-type": "Application/json"
        }
    }
    constructor(@inject(TYPES.ConfigService) private configService:ConfigService){

    }
    async getContact(){
        const contacts = await axios.get(`${this.configService.get('AMOCRM_API_URL')}contacts`, this.httpOptions)
        return contacts.data;
    }
    async createContact(contact:IContact){
        const body = [
            {
                "name": contact.name,
                "custom_fields_values": [
                    {
                        "field_id": 114255,
                        "values": [
                            {
                                "value": contact.phone,
                                "enum_code": "WORK"
                            }
                        ]
                    },
                    {
                        "field_id": 114257,
                        "values": [
                            {
                                "value": contact.email,
                                "enum_code": "WORK"
                            }
                        ]
                    }
                ]
            }
        ]
        const result = await axios.post(`${this.configService.get('AMOCRM_API_URL')}contacts`,body,this.httpOptions);
        return result.data;
    }
    async updateContact(contact:IContact, id:number){
        const body = [
            {
                id,
                "name": contact.name,
                "custom_fields_values": [
                    {
                        "field_id": 114255,
                        "values": [
                            {
                                "value": contact.phone,
                                "enum_code": "WORK"
                            }
                        ]
                    },
                    {
                        "field_id": 114257,
                        "values": [
                            {
                                "value": contact.email,
                                "enum_code": "WORK"
                            }
                        ]
                    }
                ]
            }
        ]
        const result = await axios.patch(`${this.configService.get('AMOCRM_API_URL')}contacts`,body,this.httpOptions);
        return result.data;
    }
    async makeLead(contactId:number){
        console.log(contactId)
        const body = [
            [
                {
                    "name": "Сделка для примера 4",
                    "created_by": 0,
                    "status_id":62343158,
                    "price": 0,
                    "_embedded":{
                        "contacts": [{
                            "id": contactId
                            }
                        ]
                    }
                }
            ]
        ]
        const result = await axios.post(`${this.configService.get('AMOCRM_API_URL')}leads`,body,this.httpOptions);
        return result.data;
    }
    createOrUpdateContact(contact:IContact){
        return new Promise(async (resolve, reject)=>{
            try{
                const queryEmail=await axios.get(`${this.configService.get('AMOCRM_API_URL')}contacts?query=${contact.email}`, this.httpOptions)
                const queryPhone=await axios.get(`${this.configService.get('AMOCRM_API_URL')}contacts?query=${contact.phone}`, this.httpOptions)
                const contactByEmail = queryEmail.data ? queryEmail.data?._embedded.contacts[0] : '';
                const contactPhone = queryPhone.data ? queryPhone.data?._embedded.contacts[0] : '';
                if(!contactByEmail&&contactPhone){
                    resolve(this.updateContact(contact, contactPhone.id));
                }else if(contactByEmail&&!contactPhone){
                    resolve(this.updateContact(contact, contactByEmail.id));
                }else if(!contactByEmail&&!contactPhone){
                    resolve(this.createContact(contact));
                }else if(contactByEmail&&contactPhone){
                    if(contactByEmail.id===contactPhone.id){
                        resolve(this.updateContact(contact, contactByEmail.id));
                    }else{
                       reject('Various companies are registered with such email and phone numbers')
                    }
                }
            }catch(e){
                reject('Internal server error')
            }
        })
    }
}