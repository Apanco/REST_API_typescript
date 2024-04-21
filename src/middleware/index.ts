import color from "colors"
import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator";

export const handleInputErrors = (req : Request, res: Response, next: NextFunction) => {
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()}) //Error cuando hay campos vacios
    }
    next();//Dejara pasar el flujo, es decir, permite que se poase a las siguientes funciones
}