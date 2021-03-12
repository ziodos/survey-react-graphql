import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinTable, ManyToMany, OneToMany, ManyToOne} from "typeorm";
import { ObjectType, Field, ID, Int } from "type-graphql";
import { Question } from "./Question";

@Entity()
@ObjectType()
export class Quiz extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column()
    title: string;



    @Field(() => [Question])
    @OneToMany(type => Question, questions => questions.quiz)
    questions: [Question];


}