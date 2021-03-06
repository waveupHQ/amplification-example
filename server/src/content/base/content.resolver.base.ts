/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/docs/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { CreateContentArgs } from "./CreateContentArgs";
import { UpdateContentArgs } from "./UpdateContentArgs";
import { DeleteContentArgs } from "./DeleteContentArgs";
import { ContentFindManyArgs } from "./ContentFindManyArgs";
import { ContentFindUniqueArgs } from "./ContentFindUniqueArgs";
import { Content } from "./Content";
import { User } from "../../user/base/User";
import { ContentService } from "../content.service";

@graphql.Resolver(() => Content)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class ContentResolverBase {
  constructor(
    protected readonly service: ContentService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Content",
    action: "read",
    possession: "any",
  })
  async _contentsMeta(
    @graphql.Args() args: ContentFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => [Content])
  @nestAccessControl.UseRoles({
    resource: "Content",
    action: "read",
    possession: "any",
  })
  async contents(
    @graphql.Args() args: ContentFindManyArgs
  ): Promise<Content[]> {
    return this.service.findMany(args);
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => Content, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Content",
    action: "read",
    possession: "own",
  })
  async content(
    @graphql.Args() args: ContentFindUniqueArgs
  ): Promise<Content | null> {
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => Content)
  @nestAccessControl.UseRoles({
    resource: "Content",
    action: "create",
    possession: "any",
  })
  async createContent(
    @graphql.Args() args: CreateContentArgs
  ): Promise<Content> {
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        author: args.data.author
          ? {
              connect: args.data.author,
            }
          : undefined,
      },
    });
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => Content)
  @nestAccessControl.UseRoles({
    resource: "Content",
    action: "update",
    possession: "any",
  })
  async updateContent(
    @graphql.Args() args: UpdateContentArgs
  ): Promise<Content | null> {
    try {
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          author: args.data.author
            ? {
                connect: args.data.author,
              }
            : undefined,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Content)
  @nestAccessControl.UseRoles({
    resource: "Content",
    action: "delete",
    possession: "any",
  })
  async deleteContent(
    @graphql.Args() args: DeleteContentArgs
  ): Promise<Content | null> {
    try {
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => User, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "User",
    action: "read",
    possession: "any",
  })
  async author(@graphql.Parent() parent: Content): Promise<User | null> {
    const result = await this.service.getAuthor(parent.id);

    if (!result) {
      return null;
    }
    return result;
  }
}
