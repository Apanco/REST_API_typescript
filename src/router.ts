import { Router } from "express"
import { createProduct, getProducts, getProductByID, updateProduct, updateAvailability, deleteProduct } from "./handlers/product";
import { body, param } from "express-validator";

//Middleware´s
import { handleInputErrors } from "./middleware";
const router = Router()
/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The product id
 *                      example: 1
 *                  name: 
 *                      type: string
 *                      description: The product name
 *                      example: Monitor curvo de 49 pulgadas
 *                  price:
 *                      type: number
 *                      description: The product price
 *                      example: 300
 *                  availability:
 *                      type: boolean
 *                      description: The product disponibility
 *                      example: true
 */


/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags: 
 *              - Products
 *          description: Return a list of products
 *          responses: 
 *              200: 
 *                  description: Successful response
 *                  content:
 *                      aplication/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 * 
 */

//Definimos esas rutas
router.get('/', getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: "Get a product by id"
 *          tags: 
 *              - Products
 *          description: Return a product based on its unique id
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The id of the product to retrieve 
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Succesful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Not found
 *              400:
 *                  description: Bad request - invalid id
 * 
 */
router.get('/:id',
    param("id").isInt().withMessage("ID no valido"),
    handleInputErrors,
    getProductByID
);

/**
 * @swagger
 * /api/products:
 *      post:
 *          summary: Creates a new product
 *          tags: 
 *              - Products
 *          description: Returns a new record in the database
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor curvo"
 *                              price:
 *                                  type: number
 *                                  example: 300
 *          responses:
 *              201:
 *                  description: Succesful responses 
 *                  content:
 *                      application/json: 
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad request - invalid input data
 */
router.post('/', 
    //Validacion
    body('name')
        .notEmpty()
        .withMessage("El nombre del producto no puede ir vacio"),
    body('price')
        .isNumeric().withMessage("Valor no valido")
        .notEmpty().withMessage("El precio del producto no puede ir vacio")
        .custom((value) => value > 0).withMessage("Precio no valido"),
    
    handleInputErrors,//middleware

    createProduct
);
/**
 * @swagger
 * /api/products/{id}:
 *      put:
 *          summary: Update a products with user input
 *          tags:
 *              - Products
 *          description: Return a updated product
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The id of the product to retrieve 
 *              required: true
 *              schema:
 *                  type: integer
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor curvo"
 *                              price:
 *                                  type: number
 *                                  example: 300
 *                              availability:
 *                                  type: boolean
 *                                  example: true
 *          responses:
 *              200:
 *                  description: Succesful responses 
 *                  content:
 *                      application/json: 
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *                               
 *              400:
 *                  description: Bad request - Invalid id or Invalid input data
 *              404:
 *                  description: Product no found          
 * 
 * 
 */
router.put('/:id',
    //Validacion
    param("id")
        .isInt()
        .withMessage("ID no valido"),
    body('name')
        .notEmpty()
        .withMessage("El nombre del producto no puede ir vacio"),
    body('price')
        .isNumeric().withMessage("Valor no valido")
        .notEmpty().withMessage("El precio del producto no puede ir vacio")
        .custom((value) => value > 0).withMessage("Precio no valido"),
    body('availability')
        .isBoolean().withMessage("Valor para disponibilidad no valido"),

    handleInputErrors,
    updateProduct
);
/**
 * @swagger
 * /api/products/{id}:
 *      patch:
 *          summary: Update Prodcts
 *          tags:
 *              - Products
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The id of the product to retrieve 
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Succesful responses 
 *                  content:
 *                      application/json: 
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *                               
 *              400:
 *                  description: Bad request - Invalid id
 *              404:
 *                  description: Product no found 
 *        
 */


router.patch('/:id',
    param("id").isInt().withMessage("ID no valido"),
    handleInputErrors,
    updateAvailability
);

/**
 *  @swagger
 * /api/products/{id}:
 *      delete:
 *          summary: Delete a selected product
 *          tags:
 *              - Products
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The id of the product to retrieve 
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Succeful response
 *                  content:
 *                      application/json: 
 *                          schema: 
 *                              type: object
 *                              properties:
 *                                  data: 
 *                                      type: string
 *                                      example: "Producto eliminado"
 *                                  
 *              400:
 *                  description: Bad request - Id not valid
 *              404:
 *                  description: Product not found
 * 
 */
router.delete('/:id', 
    param("id").isInt().withMessage("Id no valido"),
    handleInputErrors,
    deleteProduct
);


export default router