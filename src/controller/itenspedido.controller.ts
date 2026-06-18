import { Request, Response } from "express";
import { ItensPedidoService } from "../service/itenspedido.service";

export class ItensPedidoController {

  constructor(private service = new ItensPedidoService()) { }

  selecionarPorPedido = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      if (id) {
        const idConvertido = Number(id);

        if (isNaN(idConvertido)) {
          return res.status(400).json({
            message: "ID inválido"
          });
        }

        const itens = await this.service.listarPorPedido(idConvertido);

        if (!itens || itens.length === 0) {
          return res.status(404).json({
            message: "Itens não encontrados para este pedido"
          });
        }

        return res.status(200).json(itens);
      }

      return res.status(400).json({
        message: "Informe o id do pedido"
      });

    } catch (error) {
      console.error(error);

      if (error instanceof Error)
        return res.status(500).json({
          message: "Ocorreu um erro no servidor",
          errorMessage: error.message
        });
    }

    return res.status(500).json({
      message: "Ocorreu um erro no servidor",
      errorMessage: "Erro desconhecido"
    });
  }

  inserir = async (req: Request, res: Response) => {
    try {
      const { id_pedido, id_produto, quantidade } = req.body;

      if (id_pedido === undefined || id_produto === undefined || quantidade === undefined) {
        return res.status(400).json({
          message: "id_pedido, id_produto e quantidade são obrigatórios"
        });
      }

      const idPedidoNum = Number(id_pedido);
      const idProdutoNum = Number(id_produto);
      const quantidadeNum = Number(quantidade);

      if (isNaN(idPedidoNum) || isNaN(idProdutoNum) || isNaN(quantidadeNum)) {
        return res.status(400).json({
          message: "Valores inválidos"
        });
      }

      const id = await this.service.inserir(idPedidoNum, idProdutoNum, quantidadeNum);

      return res.status(201).json({
        message: "Item adicionado ao pedido",
        id
      });

    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        return res.status(500).json({
          message: "Erro no servidor",
          errorMessage: error.message
        });
      }
    }

    return res.status(500).json({
      message: "Erro desconhecido"
    });
  };

  atualizar = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const { quantidade } = req.body;

      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      const resultado = await this.service.atualizar(id, quantidade);

      return res.status(200).json({
        message: "Item atualizado com sucesso",
        dados: resultado
      });

    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        return res.status(500).json({
          message: "Erro no servidor",
          errorMessage: error.message
        });
      }
    }

    return res.status(500).json({
      message: "Erro desconhecido"
    });
  }

  deletar = async (req: Request, res: Response) => {
    try {
      const id_item = Number(req.params.id);
      const { id_pedido } = req.body;

      if (isNaN(id_item) || !id_pedido) {
        return res.status(400).json({
          message: "ID do item e id_pedido são obrigatórios"
        });
      }

      const resultado = await this.service.deletar(id_item, Number(id_pedido));

      return res.status(200).json({
        message: "Item removido com sucesso",
        dados: resultado
      });

    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        return res.status(500).json({
          message: "Erro no servidor",
          errorMessage: error.message
        });
      }
    }

    return res.status(500).json({
      message: "Erro desconhecido"
    });
  }
}