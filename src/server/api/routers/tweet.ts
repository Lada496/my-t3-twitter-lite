import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

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
});
