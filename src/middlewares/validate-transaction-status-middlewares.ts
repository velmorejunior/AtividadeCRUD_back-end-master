import { Request, Response, NextFunction } from "express";

export class validateTransactionStatusMiddlewares{
    validate(request: Request, response: Response, next: NextFunction){
        const { archived } = request.body
        
        if(archived !== true && archived !== false) {
            return response.status(404).json({ message: "Parametro archived inválido" });
        }

        next()
    }
}