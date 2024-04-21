import server from "./server";
import colors from "colors";

const puerto = process.env.PORT || 4000

server.listen(puerto, () => {//Monta la aplicacion y le asigna un puerto
    console.log( colors.cyan.bold('Rest api en el puerto ' + puerto))
});