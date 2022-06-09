import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type ContentCreateInput = {
  author?: UserWhereUniqueInput | null;
  description?: string | null;
  title?: string | null;
};
