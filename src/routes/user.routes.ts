import Router, { Response, Request} from 'express';
import { getRepository, LessThanOrEqual, MoreThan, getManager} from 'typeorm';
import User from '../models/User';
import Classes from '../models/Classes';
import ClassSchedule from '../models/ClassSchedule';
import convertHourToMinutes from '../utils/convertHourToMinutes';
import { validate, validateOrReject } from 'class-validator'


const userRoutes = Router();

interface ScheduleItem {
    week_day:number;
    from:string;
    to:string;
}

userRoutes.post('/', async(req:Request, res:Response) =>{
    
    
    const {
        name, 
        avatar, 
        whatsapp, 
        bio,
        subject,
        cost,
        schedule
    } = req.body;
    
    try{
        
            const user = new User();
            user.name = name;
            user.avatar = avatar;
            user.whatsapp = whatsapp;
            user.bio = bio;

            const error = await validate(user);

            if(error.length !== 0){
                //return res.status(400).json({"erro": error.map(v => v.constraints)})
                return res.status(400).json({"erro": error })

            }

            await getRepository(User).save(user);
            
            const classes = new Classes();
            classes.subject = subject;
            classes.cost = cost;
            classes.users = user;
            await getRepository(Classes).save(classes);
            
            const classSchedule = schedule.map((scheduleItem:ScheduleItem) =>{
                
                const sched = new ClassSchedule();
                sched.classes = classes;
                sched.week_day = scheduleItem.week_day;
                sched.from = convertHourToMinutes(scheduleItem.from);
                sched.to = convertHourToMinutes(scheduleItem.to);
                
                return sched;
            })

            console.log(classSchedule)
            await getRepository(ClassSchedule).save(classSchedule);

            return res.status(201).send();
    }catch(err){
        console.log('erro : ', err.message);
        return res.status(400).json({erro:"Erro na craição do User"})
    }

   
    
});

userRoutes.get('/', async(req:Request, res:Response) =>{

    const filters = req.query;

    const subject = filters.subject as string;
    const week_day = filters.week_day as string;
    const time = filters.time as string;

    const repoClass = getRepository(Classes);

    try{

        if(!week_day || !subject || !time){
            return res.status(400).json({
                error:'missing filters to search'
            })
        }

        const timeInMinutes = convertHourToMinutes(time);

        const clas = await getRepository(ClassSchedule).find({
            week_day:Number(week_day),
            from: LessThanOrEqual(timeInMinutes),
            to: MoreThan(timeInMinutes)
        })

        const result = await repoClass.find({
            where:{
                subject:subject,
            }
        })


        return res.status(200).json()
    }catch(err){
        console.log("erro : ", err.message)
        return res.status(400).json({erro:"Na busca de user "})
    }    
})

export default userRoutes;