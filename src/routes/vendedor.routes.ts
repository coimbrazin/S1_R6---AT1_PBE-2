import { Router } from "express";
import { VendedorController } from "../controller/vendedor.controller";

const vendedorController = new VendedorController();
const vendedorRoutes = Router();

vendedorRoutes.get("/vendedores", vendedorController.selecionarTodos);
vendedorRoutes.get("/vendedores/:id", vendedorController.selecionarTodos);
vendedorRoutes.post("/vendedores", vendedorController.inserir);
vendedorRoutes.put("/vendedores/:id", vendedorController.atualizar);
vendedorRoutes.delete("/vendedores/:id", vendedorController.deletar);

export default vendedorRoutes;