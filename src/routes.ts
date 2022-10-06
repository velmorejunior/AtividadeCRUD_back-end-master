import { Express } from "express";
import { CreateNewtransactionController } from "./controllers/transactions/createTransaction";
import { GetUserController } from "./controllers/users/getUserById";
import { GetTransactionController } from "./controllers/transactions/getTransactionById";
import { EditTransactionController } from "./controllers/transactions/editTransaction";
import { DeleteTransactionController } from "./controllers/transactions/deleteTransaction";
import { CreateNewuser } from "./controllers/users/createUser";
import { GetAllUsersController } from "./controllers/users/getAllUsers";
import { EditUserController } from "./controllers/users/editUser";
import { DeleteUserController } from "./controllers/users/deleteUser";
import { BalanceTransactionController } from "./controllers/transactions/GetbalanceTransaction";
import { ValidateUserMiddleware } from "./middlewares/validateUser";
import { validateTransactionMiddlewares } from "./middlewares/validateTransaction";
import { validateTransactionStatusMiddlewares } from "./middlewares/validate-transaction-status-middlewares";
import { ChangeArchivedStatusController } from "./controllers/transactions/changeArchivedStatusController";
import { validateTransactionQueryParamsMiddlewares } from "./middlewares/validate-transaction-query-params";

export default (app: Express) => {
  app.post("/user", new CreateNewuser().createUser);
  app.get("/user", new GetAllUsersController().getAll);
  app.get(
    "/user/:id",
    new ValidateUserMiddleware().validateUser,
    new GetUserController().getUserById
  );
  app.put(
    "/user/:id",
    new ValidateUserMiddleware().validateUser,
    new EditUserController().editUser
  );
  app.delete(
    "/user/:id",
    new ValidateUserMiddleware().validateUser,
    new DeleteUserController().deleteUser
  );

  app.post(
    "/user/:id/transactions",
    new ValidateUserMiddleware().validateUser,
    new CreateNewtransactionController().createTransaction
  );
  app.get(
    "/user/:userId/transactions/:id",
    new ValidateUserMiddleware().validateUser,
    new validateTransactionMiddlewares().validateTransction,
    new GetTransactionController().getTransaction
  );
  app.put(
    "/user/:userId/transactions/:id",
    new ValidateUserMiddleware().validateUser,
    new validateTransactionMiddlewares().validateTransction,
    new EditTransactionController().editTransaction
  );
  app.delete(
    "/user/:userId/transactions/:id",
    new validateTransactionMiddlewares().validateTransction,
    new ValidateUserMiddleware().validateUser,
    new DeleteTransactionController().deleteTransaction
  );

  app.get(
    "/user/:userId/transactions",
    new ValidateUserMiddleware().validateUser,
    new validateTransactionQueryParamsMiddlewares().validate,
    new BalanceTransactionController().GetbalanceTransaction
  );

  app.put(
    "/user/:userId/transactions/:id/archived",
    new ValidateUserMiddleware().validateUser,
    new validateTransactionMiddlewares().validateTransction,
    new validateTransactionStatusMiddlewares().validate,
    new ChangeArchivedStatusController().change
  );
};
