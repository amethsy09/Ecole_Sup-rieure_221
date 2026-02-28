// src/config/db.js
const { PrismaClient } = require('@prisma/client');

class Database {
  constructor() {
    if (!Database.instance) {
      this.client = new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
      });
      Database.instance = this;
    }
    return Database.instance;
  }

  getClient() {
    return this.client;
  }

  async connect() {
    await this.client.$connect();
    console.log('Base de données connectée');
  }

  async disconnect() {
    await this.client.$disconnect();
    console.log('Base de données déconnectée');
  }
}

const database = new Database();
module.exports = database;
