import { Request, Response, NextFunction } from "express";

export class validateTransactionQueryParamsMiddlewares {
  validate(request: Request, response: Response, next: NextFunction) {
    const { archived, type, title } = request.query;

    if (archived && archived !== "true" && archived !== "false") {
      return response
        .status(400)
        .json({ message: "Parametro archived inválido" });
    }
    if (type && type !== "income" && type !== "outcome") {
      return response.status(400).json({ message: "Parametro type inválido" });
    }

    next();
  }
}
