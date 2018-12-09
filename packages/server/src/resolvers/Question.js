// import { prisma } from "../../generated/prisma-client";

const Question = {
  id: parent => parent.id,
  header: parent => parent.header,
  body: parent => parent.body,
  askedBy: (parent, args, context) =>
    context.prisma.question({ id: parent.id }).askedBy(),
  answers: (parent, args, context) =>
    context.prisma.question({ id: parent.id }).answers(),
  totalAnswers: async (parent, args, context) => {
    const total = await context.prisma
      .answersConnection({
        where: { answeredTo: { id: parent.id } },
      })
      .aggregate()
      .count();
    return total;
  },
  createdAt: parent => parent.createdAt,
  updatedAt: parent => parent.updatedAt,
};
export default Question;
