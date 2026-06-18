import { RowDataPacket } from "mysql2";

export interface iPedido extends RowDataPacket {
  id_pedido?: number;
  data_pedido?: Date;
  id_cliente?: number;
  id_vendedor?: number;
  valor_final?: number;
}

export class Pedido {
  private _id_pedido?: number;
  private _data_pedido?: Date;
  private _id_cliente: number = 0;
  private _id_vendedor: number = 0;
  private _valor_final: number = 0;

  constructor(
    id_cliente: number,
    id_vendedor: number,
    valor_final: number = 0,
    data_pedido?: Date,
    id?: number
  ) {
    this.IdCliente = id_cliente;
    this.IdVendedor = id_vendedor;
    this.ValorFinal = valor_final;
    this._data_pedido = data_pedido;
    this._id_pedido = id;
  }

  // GETTERS

  public get Id(): number | undefined {
    return this._id_pedido;
  }

  public get DataPedido(): Date | undefined {
    return this._data_pedido;
  }

  public get IdCliente(): number {
    return this._id_cliente;
  }

  public get IdVendedor(): number {
    return this._id_vendedor;
  }

  public get ValorFinal(): number {
    return this._valor_final;
  }

  // SETTERS

  public set IdCliente(value: number) {
    this._id_cliente = value;
  }

  public set IdVendedor(value: number) {
    this._id_vendedor = value;
  }

  public set ValorFinal(value: number) {
    this._valor_final = value
  }

  // FACTORY

  public static criar(id_cliente: number, id_vendedor: number): Pedido {
    return new Pedido(id_cliente, id_vendedor);
  }

  public static editar(id_cliente: number, id_vendedor: number, valor_final: number, id: number): Pedido {
    return new Pedido(id_cliente, id_vendedor, valor_final, undefined, id);
  }
}