import { ResultSetHeader } from "mysql2";
import { connection } from "../database/connection.database";
import { iCliente } from "../models/cliente.model";

export class ClienteRepository {

  async selectAll(): Promise<iCliente[]> {
    const sql = "SELECT * FROM clientes";
    const [rows] = await connection.execute<iCliente[]>(sql);
    return rows;
  }

  async selectById(id: number): Promise<iCliente | null> {
    const sql = "SELECT * FROM clientes WHERE id_cliente=?";
    const values = [id];
    const [rows] = await connection.execute<iCliente[]>(sql, values);
    return rows[0];
  }

  async insert(nome: string, email: string): Promise<number> {
    const sql = "INSERT INTO clientes (nome, email) VALUES (?,?)";
    const values = [nome, email];
    const [rows] = await connection.execute<ResultSetHeader>(sql, values);
    return rows.insertId;
  }

  async update(id: number, nome: string, email: string): Promise<ResultSetHeader> {
    const sql = "UPDATE clientes SET nome=?, email=? WHERE id_cliente=?";
    const values = [nome, email, id];
    const [rows] = await connection.execute<ResultSetHeader>(sql, values);
    return rows;
  }

  async delete(id: number): Promise<ResultSetHeader> {
    const sql = "DELETE FROM clientes WHERE id_cliente=?";
    const values = [id];
    const [rows] = await connection.execute<ResultSetHeader>(sql, values);
    return rows;
  }
}