import { Request, Response } from "express";
import { usersApp } from "../../db/users";

export class EditTransactionController {
  editTransaction(request: Request, response: Response) {
    const { userId, id } = request.params;
    const { title, value, type } = request.body;

    if (!title || !value || !type) {
      return response.status(400).json({ message: "Dados inválidos" });
    }

    const user = usersApp.find((user) => userId === user.id);

    const transactionFound = user?.transactions.find(
      (trans) => id === trans.id
    );

    transactionFound?.transactionUpdate(title, value, type);

    return response.status(200).json(transactionFound);
  }
}
