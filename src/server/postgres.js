const { Pool } = require('pg');
const connectionString = 'postgresql://admin:admin@localhost:5432/twitter_modoki';
/*const connectionString = {
	database: "dqx_craftsman",
	user: "admin",
	password: "admin",
	host: "localhost",
	port: 5432,
}*/
const pool = new Pool({ connectionString });

/**
 * Postgresクラス
 */
class Postgres {

	/**
	 * Poolからclientを取得
	 * @return {Promise<void>}
	 */
	async init() {
		this.client = await pool.connect();
	}

	/**
	 * SQLを実行
	 * @param query
	 * @param params
	 * @return {Promise<*>}
	 */
	async execute(query, params = []) {
		return (await this.client.query(query, params)).rows;
	}

	/**
	 * 取得したクライアントを解放してPoolに戻す
	 * @return {Promise<void>}
	 */
	async release() {
		await this.client.release(true);
	}

	/**
	 * Transaction Begin
	 * @return {Promise<void>}
	 */
	async begin() {
		await this.client.query('BEGIN');
	}

	/**
	 * Transaction Commit
	 * @return {Promise<void>}
	 */
	async commit() {
		await this.client.query('COMMIT');
	}

	/**
	 * Transaction Rollback
	 * @return {Promise<void>}
	 */
	async rollback() {
		await this.client.query('ROLLBACK');
	}
}

/**
 * Postgresのインスタンスを返却
 * @return {Promise<Postgres>}
 */

async function getClient(){
	const postgres = new Postgres();
	await postgres.init();
	return postgres;
};

module.exports.getPostgresClient = getClient;
