import { Controller, GET, PUT } from "fastify-decorators";

import CheckUserAuth from "@descriptors/checkUserAuth";
import GetUserInfo from "@descriptors/getUserInfo";

import UserModel from "@models/user.model";

import { UserFastifyRequest } from "@rest/index";

@Controller({ route: '/user' })
export default class RequestController {

  @CheckUserAuth
  @GetUserInfo
  @GET({
    url: "/profile"
  })
  getUserProfile(req: UserFastifyRequest) {
    return req.user;
  }

  @CheckUserAuth
  @GetUserInfo
  @PUT({
    url: "/data",
    options: {
      schema: {
        body: {
          type: "object",
          properties: {
            data: {
              type: 'string',
              minLength: 3
            }
          },
          required: ['data'],
          additionalProperties: false
        }
      }
    }
  })
  changeData(req: UserFastifyRequest) {
    const { data } = <{
      data: string
    }>req.body;

    return UserModel.update({
      data: JSON.parse(data)
    }, {
      where: {
        id: req.user.id
      }
    });
  }

}