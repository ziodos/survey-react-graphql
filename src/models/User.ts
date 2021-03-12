import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, JoinColumn, OneToMany} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Question } from "./Question";

@Entity()
@ObjectType()
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: string;

    @Field(() => String)
    @Column()
    email: string;

    @Field(() => String)
    @Column()
    password: string;

    
    @Field(() => String)
    @Column()
    role: string;
    

    @Field(() => [Question],{ nullable: true })
    @OneToMany(type => Question, questions => questions.createdBy) 
    questions?: Question[];
}