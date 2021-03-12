import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, OneToMany, ManyToOne, JoinColumn} from "typeorm";
import { ObjectType, Field, ID, Int } from "type-graphql";
import { User } from "./User";
import { Quiz } from "./Quiz";


@Entity()
@ObjectType()
export class Question extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column()
    body: string;

    @Field(() => String)
    @Column()
    options: string;

    @Field(() => String)
    @Column()
    answer: string;
    
    @Field(() => Int)
    @Column()
    difficulty: number;

    @Field(() => String)
    @Column()
    department: string;

    @Field(() => String)
    @Column()
    category: string;

    @Field(() => Int)
    @Column()
    UserId: number;

    @Field(() => User)
    @ManyToOne(type => User, user => user.questions)
    @JoinColumn({ name: "UserId" })
    createdBy: User;
    
    @Field(() => Int)
    @Column()
    QuizId: number;


    @Field(() => Quiz)
    @ManyToOne(type => Quiz, quiz => quiz.questions)
    @JoinColumn({ name: "QuizId" })
    quiz: Quiz;

}