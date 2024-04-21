import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const option : swaggerJSDoc.Options = {
    swaggerDefinition:{
        openapi: "3.0.2",
        tags:[
            {
                name:"Products",
                description:"API operations related to products"
            }
        ],
        info:{
            title:"Rest API Node js /Express /Typescript",
            version: "1.0",
            description:"API Docs for products"
        }
    },
    apis:["./src/router.ts"]
}

const swaggerSpec = swaggerJSDoc(option);

const swaggerUiOptions : SwaggerUiOptions = {
    customCss:`
        .topbar-wrapper .link{
            content: url("https://icons8.com/icon/M8E3VkhN6sIA/halo-office-of-naval-intelligence");
            height:120px;
            width: auto; 
        }
    `,
    customSiteTitle:"Documentacion de rest api"
}
export default swaggerSpec

export {
    swaggerUiOptions
}