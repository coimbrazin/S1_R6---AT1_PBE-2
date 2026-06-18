import { Router } from "express";
import { PedidoController } from "../controller/pedido.controller";

const PedidoRouter = Router();
const pedidocontroller = new PedidoController();

PedidoRouter.get("/pedidos", pedidocontroller.selecionarTodos);
PedidoRouter.get("/pedidos/:id", pedidocontroller.selecionarTodos);
PedidoRouter.post("/pedidos", pedidocontroller.inserir);
PedidoRouter.put("/pedidos/:id", pedidocontroller.atualizar);
PedidoRouter.delete("/pedidos/:id", pedidocontroller.deletar);

export default PedidoRouter;