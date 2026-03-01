import { PrismaClient } from '@prisma/client';

class Database {
  static instance = null;

  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    this.client = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
    });
    Database.instance = this;
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

export default new Database();