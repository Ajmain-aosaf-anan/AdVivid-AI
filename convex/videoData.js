import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateNewVideoData = mutation({
    args: {
        uid: v.id('users'),
        topic: v.string(),
        scriptVariant: v.any()
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.insert('videoData', {
            uid: args.uid,
            topic: args.topic,
            scriptVariant: args.scriptVariant
        })

        return result;
    }
})

export const GetVideoDataById = query({
    args: {
        vid: v.id('videoData')
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.get(args.vid);
        return result;
    }
})

export const updateInitialVideoData = mutation({
    args: {
        topic: v.string(),
        scriptVariant: v.any(),
        script: v.optional(v.any()),
        assets: v.optional(v.any()),
        avatar: v.optional(v.any()),
        voice: v.optional(v.any()),
        voiceUrl: v.optional(v.any()),
        status: v.optional(v.number()),
        videoDataRecordId: v.id('videoData')
    },
    handler: async(ctx, args) => {
        const result = await ctx.db.patch(args.videoDataRecordId, {
            assets: args.assets,
            avatar: args.avatar,
            voice: args.voice,
            voiceUrl: args.voiceUrl, 
            script: args.script,
            scriptVariant: args.scriptVariant,
            topic: args.topic,
            status: 1
        })
        return result;
    }
})

export const UpdateAvatarUrl = mutation({
    args: {
        vId: v.id('videoData'),
        avatarUrl: v.string(),
        status: v.number()
    },
    handler: async(ctx, args) => {
        const result = await ctx.db.patch(args.vId, {
            avatarUrl: args.avatarUrl,
            status: args.status
        })

        return result;
    }
})

export const GetUsersVideo = query({
    args: {
        uid: v.id('users')
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.query('videoData')
            .filter(q => q.eq(q.field('uid'), args.uid))
            .order('desc')
            .collect()
        return result
    }
})