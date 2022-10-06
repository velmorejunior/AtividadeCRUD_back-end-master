import { Request, Response } from "express";
import { usersApp } from "../../db/users";

export class DeleteTransactionController {
  deleteTransaction(request: Request, response: Response) {
    const { userId, id } = request.params;

    const user = usersApp.find((user) => userId === user.id);

    const indexUser = user?.transactions.findIndex((trans) => trans.id === id) as number;

    user?.transactions.splice(indexUser, 1);

    return response.status(200).json(user?.transactions);
  }
}
