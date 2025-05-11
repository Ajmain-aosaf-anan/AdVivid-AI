import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateNewUser = mutation({
    args: {
        name: v.string(),
        email:v.string(),
        picture:v.string(),
        credits:v.number(),
        paymentId: v.optional(v.string())
    },

    handler: async (ctx, args) => {
        const userData = await ctx.db
        .query('users')
        .filter (q=> q.eq(q.field("email"), args.email))
        .collect();

        if(userData?.length == 0){
            const data = {
                name: args.name,
                email: args.email,
                picture: args.picture,
                credits: args.credits ?? 0,
                paymentId:args.paymentId ?? undefined
            }
            const result = await ctx.db.insert('users', {
                ...data
            })

            console.log(result);
            return {
                ...data,
                _id:result
            }
        }

        return userData[0];
    }

})

export const updateUserCredits = mutation ({
    args: {
        credits: v.number(),
        uid: v.id('users')
    },
    handler: async(ctx, args) => {
        const result = await ctx.db.patch(args.uid, {
            credits: args.credits
        })
        return result
    }
})