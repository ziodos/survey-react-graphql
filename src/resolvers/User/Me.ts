import { Resolver, Query, Mutation, Arg, Ctx, UseMiddleware } from 'type-graphql';
import { User } from '../../models/User';
import { isAuth } from '../../utils/isAuth'
import { hasRole } from '../../middleware/hasRole';


export interface Context {
    req: Request;
    res: Response;
    payload?: { userId: string };
};

@Resolver()
export class MeResolver {
    @Query(() => User, { nullable: true })
    @UseMiddleware(isAuth)
    me(
        @Ctx() { payload }: Context,
    ) {
        try {
            console.log(payload)
            return User.findOne({ id: payload!.userId }, {relations: ["questions"]});
        } catch (err) {
            return new Error('There was an issue trying to retreive user details.');
        }
    }

}