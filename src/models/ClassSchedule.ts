import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import Classes from "./Classes";

@Entity('class_schedule')
export default class ClassSchedule{

    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column()
    week_day:number;

    @Column()
    from:number;

    @Column()
    to:number;

    @ManyToOne( type => Classes, classes => classes.class_schedules)
    @JoinColumn()
    classes:Classes;
}