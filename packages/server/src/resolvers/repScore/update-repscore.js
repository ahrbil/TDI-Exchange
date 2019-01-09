import prisma from "../../prisma";

const updateRepScore = async (userId, score) => {
  const userRepScore = await prisma.user({ id: userId }).repScore();
  const calculatedScore = userRepScore + score;
  await prisma.updateUser({
    where: { id: userId },
    data: { repScore: calculatedScore }
  });
};
export default updateRepScore;
