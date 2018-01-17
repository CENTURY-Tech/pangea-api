import { User } from "pangea-models";
// import { UserInterface, ValidationResult } from "pangea-models/users/UserBase";
export class ApiUser {

  private model: User;

  constructor(data: any) {
    this.model = new User(data);
  }

  validate(): Promise<Ctek.UserInterface> {
    return this.model.validate()
      .then((result: User.ValidationResult) => {
        if (result.valid) {
          return Promise.resolve(result.value);
        } else {
          return Promise.reject(result.errors);
        }
      });
  }
}
