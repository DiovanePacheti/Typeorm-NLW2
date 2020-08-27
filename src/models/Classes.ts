import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import User from "./User";
import ClassSchedule from "./ClassSchedule";

@Entity('classes')
export default class Classes{
    

    @PrimaryGeneratedColumn('increment')
    id:number; 

    @Column()
    subject:string;

    @Column()
    cost:number;

    @ManyToOne(type => User, user => user.classes,{eager:true})
    @JoinColumn()
    users:User;

    @OneToMany(type => ClassSchedule, class_schedules => class_schedules.classes,{eager:true})
    class_schedules:ClassSchedule[]
}