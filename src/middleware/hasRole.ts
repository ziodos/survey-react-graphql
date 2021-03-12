import { MiddlewareFn } from "type-graphql";
import  {Context} from "../types/Context";
import { User } from "../models/User";

export const hasRole: (role: string) => MiddlewareFn<Context> = (role: string) => async ({ context : {payload} }, next) => {
    if (!payload!.userId) {
      throw new Error("not authenticated");
    }
  
    const user = await User.findOne(payload!.userId);
  
    if (!user) {
      throw new Error('not authenticated')
    }
  
    if (user.role !== role) {
      throw new Error('not authorized');
    }
  
    return next();
  };

  