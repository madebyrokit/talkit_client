export const sortByLikes = (a, b) => {
  return b.views - a.views;
};

export const sortByDate = (a, b) => {
  return new Date(b.createdDate) - new Date(a.createdDate);
};

export const sortByMessages = (a, b) => {
  return b.messages - a.messages;
};
