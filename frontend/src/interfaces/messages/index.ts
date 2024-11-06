export type TMessage = {
  _id: string;
  user: {
    username: string;
    firstName: string;
    lastName: string;
  };
  content: string;
  createdAt: Date;
};
