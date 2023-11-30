import { BaseController } from "../common/base.controller";
import { IUserController } from "./users.controller.ts.interface";
import 'reflect-metadata';
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { UserRepository } from "./user.repository";

@injectable()
export class UserController extends BaseController implements IUserController{
    
    constructor(@inject(TYPES.UserRepository) private userRepository: UserRepository){
        super();
        this.bindRoutes([
        ])
    }
    
}