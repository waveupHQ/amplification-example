import { ContentUpdateManyWithoutUsersInput } from "./ContentUpdateManyWithoutUsersInput";

export type UserUpdateInput = {
  contents?: ContentUpdateManyWithoutUsersInput;
  firstName?: string | null;
  lastName?: string | null;
  password?: string;
  roles?: Array<string>;
  username?: string;
};
