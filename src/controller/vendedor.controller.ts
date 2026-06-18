import { Request, Response } from "express";
import { VendedorService } from "../service/vendedor.service";

export class VendedorController {

  constructor(private service = new VendedorService()) { }

  selecionarTodos = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      if (id) {
        const idConvertido = Number(id);

        if (isNaN(idConvertido)) {
          return res.status(400).json({
            message: "ID inválido"
          });
        }

        const vendedor = await this.service.selecionarPorId(idConvertido);

        if (!vendedor) {
          return res.status(404).json({
            message: "Vendedor não encontrado"
          });
        }
        return res.status(200).json(vendedor);
      }

      const vendedores = await this.service.selecionarTodos();

      return res.status(200).json(vendedores);

    } catch (error) {
      console.error(error);

      if (error instanceof Error)
        return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message })
    }
    res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: "Erro desconhecido" })
  }

  inserir = async (req: Request, res: Response) => {
    try {
      const { nome } = req.body;

      const id = await this.service.inserir(nome);

      return res.status(201).json({
        message: "Vendedor criado com sucesso",
        id
      });

    } catch (error) {
      console.error(error);

      if (error instanceof Error)
        return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message })
    }
    res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: "Erro desconhecido" })
  }

  atualizar = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const { nome } = req.body;

      if (isNaN(id)) {
        return res.status(400).json({
          message: "ID inválido"
        });
      }

      await this.service.atualizar(id, nome);

      return res.status(200).json({
        message: "Vendedor atualizado com sucesso"
      });

    } catch (error) {
      console.error(error);

      if (error instanceof Error)
        return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message })
    }
    res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: "Erro desconhecido" })
  }

  deletar = async (req: Request, res: Response) => {
    try {

      const id = Number(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({
          message: "ID inválido"
        });
      }

      await this.service.deletar(id);

      return res.status(200).json({
        message: "Vendedor deletado com sucesso"
      });

    } catch (error) {
      console.error(error);

      if (error instanceof Error)
        return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message })
    }
    res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: "Erro desconhecido" })
  }

}