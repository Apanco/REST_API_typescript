import { Request, Response, request } from "express"
import colors from "colors"
//Modelos
import Product from "../models/Product.model"

export const getProducts = async (request : Request, response: Response) => {
    const products = await Product.findAll({
        order:[
            ["id", "DESC"]
        ],
        attributes:{
            exclude:["createdAt", "updatedAt"]
        }
    })
    response.json({data: products})
}

export const getProductByID = async(request : Request, response: Response) => {
    const { id } = request.params
    const product = await Product.findByPk(id)

    //Verificar si existe el producto
    if(!product){
        return response.status(404).json({error:"Producto no encontrado"})
    }

    response.json({data: product})
}
export const createProduct = async(request : Request, response : Response) => {
    //Crea el objeto con el json obtenido por peticion https POST y por el modelo en metodo create lo almacena tambien ne base de datos
    const product = await Product.create(request.body)
    response.status(201).json({data: product})
}

export const updateProduct = async(request : Request, response : Response) =>{
    //Obtener producto
    const { id } = request.params
    const product = await Product.findByPk(id)

    //Verificar si existe el producto
    if(!product){
        return response.status(404).json({error:"Producto no encontrado"})
    }
    //Actualizar producto
    await product.update(request.body)
    await product.save()

    response.json({data: product})
}

export const updateAvailability = async(request : Request, response : Response) =>{
    //Obtener producto
    const { id } = request.params
    const product = await Product.findByPk(id)

    //Verificar si existe el producto
    if(!product){
        return response.status(404).json({error:"Producto no encontrado"})
    }
    //Actualizar producto
    product.availability = !product.dataValues.availability
    await product.save()


    response.json({data: product})
}


export const deleteProduct = async(request : Request, response : Response) => {
    //Obtener producto por id
    const { id } = request.params
    const product = await Product.findByPk(id)
    if(!product){
        return response.status(404).json({error:"Producto no encontrado"})
    }

    await product.destroy()

    response.json({data: "Producto eliminado"})
}