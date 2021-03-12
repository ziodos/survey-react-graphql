import { Resolver, Mutation, Arg, ObjectType, Field, Ctx, UseMiddleware, Query } from 'type-graphql';
import { hash, compare } from 'bcryptjs';
import { User } from '../../models/User';
import { Context } from '../../types/Context'
import { createAccessToken, createRefreshToken } from '../../utils/auth';
import { isAuth } from '../../utils/isAuth';
const { UserInputError } = require('apollo-server')


@ObjectType()
class LoginResponse {
    @Field()
    accessToken: string;
}

@Resolver()
export class UserResolver {
    @Query(() => [User])
    @UseMiddleware(isAuth)
    users(@Ctx() ctx: Context) {
        console.log(ctx.payload);
        return User.find();
    }

    @Mutation(() => Boolean)
    async logout(
        @Ctx() { res }: Context
    ) {
        res.clearCookie('jwtid', {
            path: '/refresh_token',
        });
        return true;
    }

    @Mutation(() => User)
    async register(
        @Arg('email') email: string,
        @Arg('password') password: string
    ):Promise<User>{
        let errors: any = {}
        try {
            if (email.trim() === '') {
                errors.email = 'email must not be empty'
            throw new UserInputError('bad input', { errors })
           // throw errors
            }
            if (password.trim() === '') {
                errors.password = 'password must not be empty'
               throw new UserInputError('bad input', { errors })
               //throw errors
            }
            const userByEmail = await User.findOne({ where: { email } })

            if (userByEmail) {
                errors.email = 'Email is taken'
                throw new UserInputError('Email is taken', { errors });
               //throw errors
            }

            if (Object.keys(errors).length > 0) {
                throw new UserInputError('bad input', { errors })
                //throw errors
            }


            const hashedPassword = await hash(password, 12);
            const user = await User.create({
                email,
                password: hashedPassword,
                role: "user",
            }).save()

            return user
        }
        catch (err) {
            console.log(err)
            throw new UserInputError('Bad input', { errors })
        }

    }



    /*  @Mutation(() => Boolean)
      async revokeRefreshTokensForUser(
          @Arg('userId', () => String) userId: string,
      ) {
          await getConnection().getRepository(User).increment({ id: userId }, 'tokenVersion', 1);
          return true;
      }*/

    @Mutation(() => LoginResponse)
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() ctx: Context
    ): Promise<LoginResponse> {
        let errors: any = {}
        if (email.trim() === '')
            errors.email = 'email must not be empty'
        if (password === '') errors.password = 'password must not be empty'
        if (Object.keys(errors).length > 0) {
            throw new UserInputError('bad input', { errors })
        }
        const user = await User.findOne({ where: { email } });
        if (!user) {
            errors.email = ("user does not exist")
            throw new UserInputError('user not found', { errors });
        }

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
            errors.password = "wrong password"
            throw new UserInputError('password is incorrect', { errors })
        }


        ctx.res.cookie("jwtid", createRefreshToken(user), { httpOnly: true });

        return {
            accessToken: createAccessToken(user)
        };
    }
    @Query(() => String)
    @UseMiddleware(isAuth)
    bye(@Ctx() { payload }: Context) {
        console.log(payload);
        return `your user id is: ${payload!.userId}`;
    }
}