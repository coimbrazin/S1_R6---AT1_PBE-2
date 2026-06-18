import { RowDataPacket } from "mysql2";

export interface iItemPedido extends RowDataPacket {
  id_item?: number;
  id_pedido?: number;
  id_produto?: number;
  quantidade?: number;
  preco_unitario?: number;
}

export class ItemPedido {
  private _id_item?: number;
  private _id_pedido: number = 0;
  private _id_produto: number = 0;
  private _quantidade: number = 0;
  private _preco_unitario: number = 0;

  constructor(
    id_pedido: number,
    id_produto: number,
    quantidade: number,
    preco_unitario: number,
    id?: number
  ) {
    this.IdPedido = id_pedido;
    this.IdProduto = id_produto;
    this.Quantidade = quantidade;
    this.PrecoUnitario = preco_unitario;
    this._id_item = id;
  }



  public get Id(): number | undefined {
    return this._id_item;
  }

  public get IdPedido(): number {
    return this._id_pedido;
  }

  public get IdProduto(): number {
    return this._id_produto;
  }

  public get Quantidade(): number {
    return this._quantidade;
  }

  public get PrecoUnitario(): number {
    return this._preco_unitario;
  }



  public set IdPedido(value: number) {
    this._id_pedido = value;
  }

  public set IdProduto(value: number) {
    this._id_produto = value;
  }

  public set Quantidade(value: number) {
    this._validarQuantidade(value);
    this._quantidade = value;
  }

  public set PrecoUnitario(value: number) {
    this._validarPreco(value);
    this._preco_unitario = value;
  }



  public static criar(
    id_pedido: number,
    id_produto: number,
    quantidade: number,
    preco_unitario: number
  ): ItemPedido {
    return new ItemPedido(id_pedido, id_produto, quantidade, preco_unitario);
  }

  public static editar(
    id_pedido: number,
    id_produto: number,
    quantidade: number,
    preco_unitario: number,
    id: number
  ): ItemPedido {
    return new ItemPedido(id_pedido, id_produto, quantidade, preco_unitario, id);
  }



  private _validarQuantidade(value: number): void {
    if (!value || value <= 0) {
      throw new Error("Quantidade deve ser maior que zero");
    }
  }

  private _validarPreco(value: number): void {
    if (!value || value <= 0) {
      throw new Error("Preço deve ser maior que zero");
    }
  }
}