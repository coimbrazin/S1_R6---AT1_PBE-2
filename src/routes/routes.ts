import { Router } from "express";
import categoriaRoutes from "./categoria.routes";
import produtoRoutes from "./produto.routes";
import vendedorRoutes from "./vendedor.routes";
import clienteRoutes from "./cliente.routes";
import PedidoRouter from "./pedido.routes";
import ItensPedidoRouter from "./itenspedido.routes";

const router = Router();

router.use('/', categoriaRoutes);
router.use('/', produtoRoutes);
router.use('/', vendedorRoutes);
router.use('/', clienteRoutes);
router.use('/', PedidoRouter);
router.use('/', ItensPedidoRouter);

export default router;