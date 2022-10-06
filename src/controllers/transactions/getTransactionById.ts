import { Request, Response } from "express";
import { usersApp } from "../../db/users";

export class GetTransactionController {
  getTransaction(request: Request, response: Response) {
    const { userId, id } = request.params;

    const user = usersApp.find((user) => userId === user.id);

    const transactionFound = user?.transactions.find(
      (trans) => id === trans.id
    );

    return response.status(200).json(transactionFound);
  }
}
