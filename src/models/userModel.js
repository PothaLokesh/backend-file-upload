import pool from "../config/db.js";

export default class UserModel {
    // Inserts a single user. Ignores duplicates based on ID.
    static async insertUser({ id, name, age, education }) {
        const query = `
      INSERT INTO users (id, name, age, education)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (id) DO NOTHING
    `;
        return pool.query(query, [id, name, age, education]);
    }

    // Standard fetch with limit/offset pagination
    static async getAllUsers(filters, limit, offset) {
        let query = "SELECT * FROM users";
        let values = [];

        // Add filters
        if (filters.education) {
            query += " WHERE education = $1";
            values.push(filters.education);
        }

        // Add pagination
        query += ` LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
        values.push(limit, offset);

        const result = await pool.query(query, values);
        return result.rows;
    }
}
