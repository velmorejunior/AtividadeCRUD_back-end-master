import { Request, Response } from "express";
import { usersApp } from "../../db/users";
import { User } from "../../models/user";

export class CreateNewuser {
  createUser(request: Request, response: Response) {
    const { name, cpf, email, age } = request.body;

    const user = new User(name, cpf, email, age);

    usersApp.push(user);

    return response.json(user.toReturn());
  }
}
