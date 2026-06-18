import { Request, Response } from "express";
import { PedidoService } from "../service/pedido.service";

export class PedidoController {

  constructor(private service = new PedidoService()) { }

  selecionarTodos = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      if (id) {
        const idConvertido = Number(id);

        if (isNaN(idConvertido)) {
          return res.status(400).json({ message: "ID inválido" });
        }

        const pedido = await this.service.selecionarPorId(idConvertido);

        if (!pedido) {
          return res.status(404).json({ message: "Pedido não encontrado" });
        }

        return res.status(200).json(pedido);
      }

      const pedidos = await this.service.selecionarTodos();

      return res.status(200).json(pedidos);

    } catch (error) {
      console.error(error);

      if (error instanceof Error)
        return res.status(500).json({
          message: "Ocorreu um erro no servidor",
          errorMessage: error.message
        });
    }

    res.status(500).json({
      message: "Ocorreu um erro no servidor",
      errorMessage: "Erro desconhecido"
    });
  }

  inserir = async (req: Request, res: Response) => {
    try {
      const { id_cliente, id_vendedor } = req.body;

      if (!id_cliente || !id_vendedor) {
        return res.status(400).json({
          message: "id_cliente e id_vendedor são obrigatórios"
        });
      }

      const id = await this.service.inserir(id_cliente, id_vendedor);

      return res.status(201).json({
        message: "Pedido criado com sucesso",
        id
      });

    } catch (error) {
      console.error(error);

      if (error instanceof Error)
        return res.status(500).json({
          message: "Ocorreu um erro no servidor",
          errorMessage: error.message
        });
    }

    res.status(500).json({
      message: "Ocorreu um erro no servidor",
      errorMessage: "Erro desconhecido"
    });
  }

  atualizar = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const { id_cliente, id_vendedor } = req.body;

      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      const resultado = await this.service.atualizar(
        id,
        id_cliente,
        id_vendedor
      );

      return res.status(200).json({
        message: "Pedido atualizado com sucesso",
        dados: resultado
      });

    } catch (error) {
      console.error(error);

      if (error instanceof Error)
        return res.status(500).json({
          message: "Ocorreu um erro no servidor",
          errorMessage: error.message
        });
    }

    res.status(500).json({
      message: "Ocorreu um erro no servidor",
      errorMessage: "Erro desconhecido"
    });
  }

  deletar = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      const resultado = await this.service.deletar(id);

      return res.status(200).json({
        message: "Pedido deletado com sucesso",
        dados: resultado
      });

    } catch (error) {
      console.error(error);

      if (error instanceof Error)
        return res.status(500).json({
          message: "Ocorreu um erro no servidor",
          errorMessage: error.message
        });
    }

    res.status(500).json({
      message: "Ocorreu um erro no servidor",
      errorMessage: "Erro desconhecido"
    });
  }
}