// import { prisma } from "../generated/prisma-client";

const Question = {
  id: parent => parent.id,
  header: parent => parent.header,
  body: parent => parent.body,
  askedBy: (parent, args, context) =>
    context.prisma.question({ id: parent.id }).askedBy(),
  answers: (parent, args, context) =>
    context.prisma
      .question({ id: parent.id })
      .answers({ skip: args.skip, first: args.first, orderBy: args.orderBy }),
  totalAnswers: async (parent, args, context) => {
    const total = await context.prisma
      .answersConnection({
        where: { answeredTo: { id: parent.id } }
      })
      .aggregate()
      .count();
    return total;
  },
  createdAt: parent => parent.createdAt,
  updatedAt: parent => parent.updatedAt,
  isOwner: async (parent, args, context) => {
    const askedBy = await context.prisma.question({ id: parent.id }).askedBy();
    const currentUser = context.user;
    if (askedBy.id === currentUser.id) return true;
    return false;
  }
};
export default Question;
