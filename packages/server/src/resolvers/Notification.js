const Notification = {
  id: parent => parent.id,
  seen: parent => parent.seen,
  action: parent => parent.action,
  payload: parent => parent.payload,
  createdAt: parent => parent.createdAt,
  updatedAt: parent => parent.updatedAt,
  notifier: (parent, args, context) =>
    context.prisma.notification({ id: parent.id }).notifier(),
  actors: (parent, args, context) =>
    context.prisma.notification({ id: parent.id }).actors()
};

export default Notification;
