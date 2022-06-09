import { ContentCreateNestedManyWithoutUsersInput } from "./ContentCreateNestedManyWithoutUsersInput";

export type UserCreateInput = {
  contents?: ContentCreateNestedManyWithoutUsersInput;
  firstName?: string | null;
  lastName?: string | null;
  password: string;
  roles: Array<string>;
  username: string;
};
