/*import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { User } from "../models/User";
import { Quiz } from "../models/Quiz";

@Resolver()
export class QuizResolver {
  @Query(() => Quiz)
  quiz(@Arg("depId") depId: string, @Arg("category") category: string) {
    return Quiz.findOne({ 
        relations: ["questions"],
    });
  }
  @Mutation(()=> Quiz)
  async createQuiz(@Arg("id") id: string, @Arg("title") title:string) {
    
  }

}*/