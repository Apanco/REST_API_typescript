import express, { request, response } from "express";
import router from "./router";
import db from "./config/db";
import cors, {CorsOptions} from "cors"
import colors from "colors";
import  SwaggerUi from "swagger-ui-express";
import swaggerSpec, {swaggerUiOptions} from "./config/swagger";
import morgan from "morgan"
//Conectar a base de datos
export async function conectDB(){
    try {
        await db.authenticate()//
        db.sync()
        // console.log(colors.bgGreen.white.bold("Conexion exitosa"));
    } catch (error) {
        // console.log(error)
        console.log("hubo un error al conectar en la base de datos")
        // console.log(colors.bgRed.white(error))
    }
}

//Instancia de express
const server = express();

//Permitir conexiones   

const corsOptions : CorsOptions = {
    origin: function(origin, callback){
        if(origin === process.env.FRONTEND_UTL){
            callback(null, true);
        }else{
            callback(new Error("Error de corse"))
        }
    }
}

server.use(cors(corsOptions))

//Leer datos de formularios
server.use(express.json())
//Agregar configuracion
conectDB();


server.use(morgan("dev"))

//Routing
server.use("/api/products", router)

//Docs
server.use("/docs", SwaggerUi.serve, SwaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server;