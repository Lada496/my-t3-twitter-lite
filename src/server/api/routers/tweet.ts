import { EventEmitter } from "events";
import { z } from "zod";
import { observable } from "@trpc/server/observable";
import { type Tweet } from "@prisma/client";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

// create a global event emitter (could be replaced by redis, etc)
const ee = new EventEmitter();

export const tweetRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.tweet.findMany({
      select: {
        id: true,
        content: true,
        createdAt: true,
        userId: true,
        user: { select: { name: true } },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  oneUser: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      const { id } = input;
      return ctx.prisma.tweet.findMany({
        where: { userId: id },
        select: {
          id: true,
          content: true,
          createdAt: true,
          userId: true,
          user: { select: { name: true } },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),

  add: protectedProcedure
    .input(z.object({ text: z.string() }))
    .mutation(({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const tweet = ctx.prisma.tweet.create({
        data: {
          content: input.text,
          userId,
        },
      });
      return tweet;
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      const deletedTweet = ctx.prisma.tweet.delete({
        where: { id: input.id },
      });

      return deletedTweet;
    }),
  onUpdate: publicProcedure.subscription(() => {
    // return an `observable` with a callback which is triggered immediately
    return observable<Tweet>((emit) => {
      const onAdd = (data: Tweet) => {
        // emit data to client
        emit.next(data);
      };
      // trigger `onAdd()` when `add` is triggered in our event emitter
      ee.on("add", onAdd);

      // unsubscribe function when client disconnects or stops subscribing
      return () => {
        ee.off("add", onAdd);
      };
    });
  }),
});
