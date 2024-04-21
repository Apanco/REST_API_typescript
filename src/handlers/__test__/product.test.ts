import request from "supertest";
import server from "../../server";
import { response } from "express";

describe("POST /api/products", () => {
    it("shoul display validation errors", async () => {
        const response = await request(server).post("/api/products").send({
            
        })

        expect(response.status).toBe(400);  
        expect(response.body.errors).toHaveLength(4)
        
        expect(response.status).not.toBe(401);  
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).not.toHaveLength(2)    
    })
    it("shoul validate that the price is greater than cero", async () => {
        const response1 = await request(server).post("/api/products").send({
            name:"monitor curvo",
            price:0
        })

        expect(response1.status).toBe(400);  
        expect(response1.body.errors).toHaveLength(1)
        expect(response1.body).toHaveProperty('errors')
        
        expect(response1.status).not.toBe(401);  
        expect(response1.body.errors).not.toHaveLength(2)    
    })
    it("shoul validate that the price is a number and greater than cero", async () => {
        const response = await request(server).post("/api/products").send({
            name:"monitor curvo",
            price:"hola"
        })

        expect(response.status).toBe(400);  
        expect(response.body.errors).toHaveLength(2)
        expect(response.body).toHaveProperty('errors')
        
        expect(response.status).not.toBe(401);  
        expect(response.body.errors).not.toHaveLength(3)    
    })

    



    it("should create a new product ", async () => {
        const response = await request(server).post("/api/products").send({
            name : "Mause - Testing",
            price : 200
        })

          expect(response.status).toBe(201);
          expect(response.body).toHaveProperty('data')
          
          expect(response.status).not.toBe(404)
          expect(response.status).not.toBe(200)
          expect(response.body).not.toHaveProperty('errors')
    })


})


describe("GET /api/products", () => {

    it("should a JSON response witch products", async () => {
        const response = await request(server).get("/api/products")
        expect(response.status).not.toBe(404);

    })

    it("GET a JSON response with products", async () => {
        const response = await request(server).get("/api/products")

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toHaveProperty("data");
        expect(response.body.data).toHaveLength(1);  
        
        expect(response.status).not.toBe(400);
        expect(response.body).not.toHaveProperty("errors");
    })
})


describe("GET /api/products/:id", () => {
    it("should return a 404 response for a non-exist product", async ()=>{
        const productID = 2000
        const response = await request(server).get(`/api/products/${productID}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("error")
        expect(response.body.error).toBe("Producto no encontrado");
    })
    it("should check a valid id in the url", async () => {
        const productID = "Hola"
        const response = await request(server).get(`/api/products/${productID}`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe("ID no valido");
    })
    it("GET a json response", async () => {
        const productID = 1
        const response = await request(server).get(`/api/products/${productID}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("data")
    })
})

describe("PUT /api/products/:id", ()=>{
    it("should check a valid id in the url", async () => {
        const productID = "Hola"
        const response = await request(server).put(`/api/products/${productID}`).send({
            name : "monitor",
            availability : true,
            price : 10
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe("ID no valido");
    })
    it("should display validation error messages when updating a product", async () => {
        const response = await request(server).put("/api/products/1").send({})


        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(5);
        
        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty("data")
    })
    it("should validate that price is greaten than 0", async () => {
        const response = await request(server).put("/api/products/1").send({
            name : "monitor",
            availability : true,
            price : 0
        })
        

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe("Precio no valido")
        
        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty("data")
    })
    it("should return 404 response for a non exist product", async () => {
        const productID = 1000
        const response = await request(server).put(`/api/products/1000`).send({
            name : "monitor",
            availability : true,
            price : 300
        })
        

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("error")
        expect(response.body.error).toBe("Producto no encontrado")
        
        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty("data")
    })
    it("should update an existing product with valid data", async () => {
        const productID = 1
        const response = await request(server).put(`/api/products/${productID}`).send({
            name : "monitor",
            availability : true,
            price : 300
        })
        

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data")
        // expect(response.body.error).toBe("Producto no encontrado")
        
        expect(response.status).not.toBe(400);
        expect(response.body).not.toHaveProperty("errors")
    })
    
})
describe('PATCH /api/products/:id', () => {
    it("should check a valid id in the url", async () => {
        const productID = "Hola"
        const response = await request(server).patch(`/api/products/${productID}`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe("ID no valido");
    })
    it("should return 404 response for a non existin product", async () => {
        const productID = 2000;
        const response = await request(server).patch(`/api/products/${productID}`)

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toBe("Producto no encontrado");
        
        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty("data");
    })
    it("should update an existing product with valid data", async () => {
        const productID = 1
        const response = await request(server).patch(`/api/products/${productID}`)
        

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data")
        // expect(response.body.error).toBe("Producto no encontrado")
        
        expect(response.status).not.toBe(400);
        expect(response.body).not.toHaveProperty("errors")
    })
})

describe("DELETE /api/product/:id", ()=> {
    it("Should check a valid ID", async () => {
        const productID = "Hola"
            const response = await request(server).delete(`/api/products/${productID}`)
    
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty("errors")
            expect(response.body.errors).toHaveLength(1);
            expect(response.body.errors[0].msg).toBe("Id no valido");
    })

    it("should return 404 response for a non exist product", async () => {
        const productID = 1000
        const response = await request(server).delete(`/api/products/1000`)
        

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("error")
        expect(response.body.error).toBe("Producto no encontrado")
        
        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty("data")
    })

    it("should delete a product", async()=>{
        const response = await request(server).delete("/api/products/1")

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data");
        expect(response.body.data).toBe("Producto eliminado");
        
        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty("error");
    })

} )