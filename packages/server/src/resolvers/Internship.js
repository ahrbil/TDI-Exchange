const Internship = {
  id: parent => parent.id,
  title: parent => parent.title,
  avatar: parent => parent.avatar,
  location: parent => parent.location,
  tags: async (parent, args, context) => {
    const tags = await context.prisma.internship({ id: parent.id }).tags();
    return tags;
  },
  createdAt: parent => parent.createdAt,
  updatedAt: parent => parent.updatedAt
};
export default Internship;
