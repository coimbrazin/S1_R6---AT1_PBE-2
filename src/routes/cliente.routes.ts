import { Router } from "express";
import { ClienteController } from "../controller/cliente.controller";

const clienteController = new ClienteController();
const clienteRoutes = Router();

clienteRoutes.get("/clientes", clienteController.selecionarTodos);
clienteRoutes.get("/clientes/:id", clienteController.selecionarTodos);
clienteRoutes.post("/clientes", clienteController.inserir);
clienteRoutes.put("/clientes/:id", clienteController.atualizar);
clienteRoutes.delete("/clientes/:id", clienteController.deletar);

export default clienteRoutes;