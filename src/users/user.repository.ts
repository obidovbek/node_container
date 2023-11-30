import { injectable } from "inversify";
import { IUserRepository } from "./user.repository.interface";

@injectable()
export class UserRepository implements IUserRepository{

}
