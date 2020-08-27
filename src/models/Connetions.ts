import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import User from "./User";

@Entity('connections')
export default class Connections{
    
    @PrimaryGeneratedColumn('increment')
    id:number;

    @CreateDateColumn()
    created_at:Date

    @ManyToOne(type => User, user => user.connections)
    @JoinColumn()
    users:User;
}