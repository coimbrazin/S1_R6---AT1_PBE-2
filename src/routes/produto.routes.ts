import { Router } from "express";
import { ProdutoController } from "../controller/produto.controller";
import uploadImage from "../middleware/upload.middleware";

const produtoController = new ProdutoController();
const produtoRoutes = Router();

produtoRoutes.get("/produtos", produtoController.selecionarTodos);
produtoRoutes.get("/produtos/:id", produtoController.selecionarTodos);

produtoRoutes.post("/produtos",uploadImage,produtoController.inserir);

produtoRoutes.put("/produtos/:id", produtoController.atualizar);

produtoRoutes.delete("/produtos/:id", produtoController.deletar);

export default produtoRoutes;