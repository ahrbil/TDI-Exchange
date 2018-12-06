const Answer = {
  id: parent => parent.id,
  body: parent => parent.body,
  answeredBy: (parent, args, context) =>
    context.prisma.answer({ id: parent.id }).answeredBy(),
  answeredTo: (parent, args, context) =>
    context.prisma.answer({ id: parent.id }).answeredTo(),
  createdAt: parent => parent.createdAt,
  updatedAt: parent => parent.updatedAt,
};

export default Answer;
