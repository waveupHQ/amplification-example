import { Content } from "../content/Content";

export type User = {
  contents?: Array<Content>;
  createdAt: Date;
  firstName: string | null;
  id: string;
  lastName: string | null;
  roles: Array<string>;
  updatedAt: Date;
  username: string;
};
