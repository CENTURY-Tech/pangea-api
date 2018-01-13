import * as hapi from "hapi";
// import * as Joi from "joi";
import { ApiUser } from "./models/User";

const server = new hapi.Server();

server.connection({
  port: 3000,
  host: "localhost"
});

// const schema: joi.Schema = joi.object().keys({
//   username: joi.string().alphanum().min(3).max(30).required(),
//   password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
//   access_token: [joi.string(), joi.number()],
//   birthyear: joi.number().integer().min(1900).max(2013),
//   email: joi.string().email()
// })
//   .with("username", "birthyear")
//   .without("password", "access_token")
//   .or("password", "access_token");

server.route({
  method: "GET",
  path: "/",
  handler: (request, reply) => {

    return reply({
      message: "hello world"
    });
  }
});

server.route({

  path: "/user",
  method: "POST",
  config: {
    description: "User creation",
    notes: "Must have username and birthyear",
    tags: ["api"]
  },
  handler: (request: hapi.Request, reply: any) => {
    const user = new ApiUser(request.payload);
    user.validate()
      .then((data: any) => {
        reply(data);
      })
      .catch((result: any) => {
        reply(result).code(400);
      });
    // if (validation.error) {
    //   return reply({
    //     error: validation.error
    //   })
    //     .code(400);
    // }
    // reply({
    //   message: "user is valid"
    // });
  }
});

server.start((err: Error) => {
  if (err) {
    console.error(err);
  }
  console.log("server is running on port 3000");
});
