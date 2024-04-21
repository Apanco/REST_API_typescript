import server, {conectDB} from "../server";
import db from "../config/db"; 

jest.mock("../config/db")
describe("conectDB", ()=> {
    it("Should handle database conection error",async () => {
        
        jest.spyOn(db, "authenticate")
            .mockRejectedValueOnce(new Error("hubo un error al conectar en la base de datos")) //Creara una funcion con la base de datos y le pasamos el metodo a observar
        const consoleSpy = jest.spyOn(console, "log")
        await conectDB()
        expect(consoleSpy).toHaveBeenNthCalledWith(1,
            expect.stringContaining("hubo un error al conectar en la base de datos")
        )

    })
})