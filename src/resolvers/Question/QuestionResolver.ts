import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Question } from "../../models/Question";
import { User } from "../../models/User";
import { Quiz } from "../../models/Quiz";

@Resolver()
export default class QuizResolver {

  @Query(() => Question)
  quiz(@Arg("depId") depId: string, @Arg("category") category: string) {
    return Question.findOne({
      relations: ["user"],
    });
  }


  @Query(() => [Question])
  questionsList(@Arg("department") department:string, @Arg("category") category:string) {
    return Question.find({department:department, category:category});
  }

  @Query(() => Quiz)
  questionLists(@Arg("id") id:number){
    return Quiz.findOne({id}, {relations:["questions"]})
  }


  @Mutation(() => Question)
  async createQuestion(@Arg("body") body: string, @Arg("options") options: string, @Arg("answer") answer: string, @Arg("difficulty") difficulty: number, @Arg("UserId") UserId: number, @Arg("QuizId") QuizId: number, @Arg("department") department: string, @Arg("category") category: string): Promise<Question> {
    const question = await Question.create({
      body, options, answer, difficulty, UserId, QuizId, department, category
    }).save()
    return question
  }


}
