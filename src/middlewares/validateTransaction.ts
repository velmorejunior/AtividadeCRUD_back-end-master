import { Request, Response, NextFunction } from "express";
import { usersApp } from "../db/users";

export class validateTransactionMiddlewares {
  validateTransction(request: Request, response: Response, next: NextFunction) {
    const { id, userId } = request.params;

    if (!id) {
      return response.status(404);
    }

    const userFound = usersApp.find((user) => user.id === userId);

    const transactionsFound = userFound?.transactions.find(
      (transaction) => transaction.id === id
    );

    if (!transactionsFound) {
      return response.status(404).json({ message: "Transação não encontrada" });
    }
    return next();
  }
}
