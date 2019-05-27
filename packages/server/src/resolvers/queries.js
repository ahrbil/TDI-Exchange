import isLoggedIn from "../utils/is-logged-in";

// import { prisma } from "../generated/prisma-client";

const Query = {
  me: async (parent, args, context) => {
    isLoggedIn(context);
    const me = await context.prisma.user({ id: context.user.id });
    return me;
  },
  questionsFeed: async (parent, args, context) => {
    const items = await context.prisma.questions({
      skip: args.skip,
      first: args.first,
      orderBy: args.orderBy,
      where: args.where
    });
    const count = await context.prisma
      .questionsConnection({ where: args.where })
      .aggregate()
      .count();
    return {
      count,
      items
    };
  },
  question: async (parent, args, context) => {
    const singleQuestion = await context.prisma.question({ id: args.id });
    return singleQuestion;
  },
  internshipsFeed: async (parent, args, context) => {
    const items = await context.prisma.internships({
      skip: args.skip,
      first: args.first,
      orderBy: args.orderBy,
      where: args.where
    });
    const count = await context.prisma
      .internshipsConnection({ where: args.where })
      .aggregate()
      .count();
    return {
      count,
      items
    };
  },
  tags: async (parent, args, context) => {
    const tags = await context.prisma.tags({
      where: args.where,
      first: args.first
    });
    return tags;
  },
  allNotifications: async (parent, args, context) => {
    isLoggedIn(context);
    const notifications = await context.prisma.notifications({
      where: { notifier: { id: context.user.id } },
      orderBy: args.orderBy || "createdAt_DESC"
    });
    return notifications;
  }
};

export default Query;
