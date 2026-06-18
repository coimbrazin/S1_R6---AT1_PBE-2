import { ResultSetHeader } from "mysql2";
import { connection } from "../database/connection.database";
import { iVendedor } from "../models/vendedor.model";

export class VendedorRepository {

    async selectAll(): Promise<iVendedor[]> {
        const sql = "SELECT * FROM vendedores";
        const [rows] = await connection.execute<iVendedor[]>(sql);
        return rows;
    }

    async selectById(id: number): Promise<iVendedor | null> {
        const sql = "SELECT * FROM vendedores WHERE id_vendedor=?";
        const values = [id];
        const [rows] = await connection.execute<iVendedor[]>(sql, values);
        return rows[0];
    }

    async insert(nome: string): Promise<number> {
        const sql = "INSERT INTO vendedores (nome) VALUES (?)";
        const values = [nome];
        const [rows] = await connection.execute<ResultSetHeader>(sql, values);
        return rows.insertId;
    }

    async update(id: number, nome: string): Promise<ResultSetHeader> {
        const sql = "UPDATE vendedores SET nome=? WHERE id_vendedor=?";
        const values = [nome, id];
        const [rows] = await connection.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async delete(id: number): Promise<ResultSetHeader> {
        const sql = "DELETE FROM vendedores WHERE id_vendedor=?";
        const values = [id];
        const [rows] = await connection.execute<ResultSetHeader>(sql, values);
        return rows;
    }
}