import { Request, Response } from "express";
import { usersApp } from "../../db/users";

export class ChangeArchivedStatusController {
    change(request: Request, response: Response){
        const { userId, id } = request.params;
        const { archived } = request.body;

        const user = usersApp.find((user) => userId === user.id);

        const transactionFound = user?.transactions.find(
            (trans) => id === trans.id
          );
      
          transactionFound?.alterarStatusArquivo(archived)

          return response.status(200).json(transactionFound);
    }
}