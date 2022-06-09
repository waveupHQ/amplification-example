import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type ContentUpdateInput = {
  author?: UserWhereUniqueInput | null;
  description?: string | null;
  title?: string | null;
};
