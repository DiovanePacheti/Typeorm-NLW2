import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import Classes from "./Classes";
import Connections from "./Connetions";
import { MaxLength, MinLength } from 'class-validator';
import {uuid} from 'uuidv4'

@Entity('users')
export default class User {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    @MaxLength(45)
    @MinLength(3, {message: "Um nome pode ter no minumo 3 caracteres"})
    name: string;

    @Column()
    avatar: string;

    @Column()
    whatsapp: string;

    @Column()
    bio:string;

    @OneToMany(type => Classes, classes => classes.users)
    classes:Classes[];

    @OneToMany(type => Connections, connections => connections.users ,{eager:true})
    connections:Connections[];

}
