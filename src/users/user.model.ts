import { Table,Model,Column,DataType } from "sequelize-typescript";

export interface IUser{
    balance:number;
}

@Table({tableName:'users'})
export class User extends Model<User, IUser>{
    
    @Column({type:DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
    id:number;

    @Column({type:DataType.INTEGER, defaultValue:10000})
    balance:number;

}
