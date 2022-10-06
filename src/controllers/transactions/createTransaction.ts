import { Request, Response } from "express";
import { usersApp } from "../../db/users";
import { Transaction } from "../../models/transaction";

export class CreateNewtransactionController {
  createTransaction(request: Request, response: Response) {
    const { title, value, type } = request.body;

    const { id } = request.params;

    if (!title || !value || !type) {
      return response.status(400).json({ message: "Dados inválidos" });
    }

    if (type.toLowerCase() !== "income" && type.toLowerCase() != "outcome") {
      return response.status(400).json({ message: "Operação inválida" });
    }

    const user = usersApp.find((user) => id === user.id);

    const transaction = new Transaction(title, value, type.toLowerCase());

    user?.transactions.push(transaction);

    return response.status(200).json({
      id: user?.id,
      name: user?.name,
      cpf: user?.cpf,
      email: user?.email,
      age: user?.age,
      transactions: user?.transactions.map((transaction) => {
        return {
          id: transaction.id,
          title: transaction.title,
          value: transaction.value,
          type: transaction.type,
        };
      }),
    });
  }
}
