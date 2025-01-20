export const calculatePercentage = (opinionA, opinionB) => {
  const totalOpinion = opinionA + opinionB;
  const percentageA =
    totalOpinion === 0 ? opinionA : Math.round((opinionA / totalOpinion) * 100);
  const percentageB =
    totalOpinion === 0 ? opinionB : Math.round((opinionB / totalOpinion) * 100);

  return { percentageA, percentageB };
};
