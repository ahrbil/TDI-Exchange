const Answer = {
  id: parent => parent.id,
  body: parent => parent.body,
  answeredBy: (parent, args, context) =>
    context.prisma.answer({ id: parent.id }).answeredBy(),
  answeredTo: (parent, args, context) =>
    context.prisma.answer({ id: parent.id }).answeredTo(),
  createdAt: parent => parent.createdAt,
  updatedAt: parent => parent.updatedAt,
  isOwner: async (parent, args, context) => {
    if (context.user) {
      const answeredBy = await context.prisma
        .answer({ id: parent.id })
        .answeredBy();
      const currentUser = context.user;
      return answeredBy.id === currentUser.id;
    }
    return false;
  }
};

export default Answer;
