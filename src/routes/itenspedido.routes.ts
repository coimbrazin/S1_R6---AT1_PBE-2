import { Router } from "express";
import { ItensPedidoController } from "../controller/itenspedido.controller";

const ItensPedidoRouter = Router();
const itenspedidocontroller = new ItensPedidoController();

ItensPedidoRouter.get("/itenspedido/:id", itenspedidocontroller.selecionarPorPedido);
ItensPedidoRouter.post("/itenspedido", itenspedidocontroller.inserir);
ItensPedidoRouter.put("/itenspedido/:id", itenspedidocontroller.atualizar);
ItensPedidoRouter.delete("/itenspedido/:id", itenspedidocontroller.deletar);

export default ItensPedidoRouter;