import { User } from "../user/User";

export type Content = {
  author?: User | null;
  createdAt: Date;
  description: string | null;
  id: string;
  title: string | null;
  updatedAt: Date;
};
