import { Client, Databases, Account } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
    .setProject('67341e4c001b124ade6d'); // Replace with your project ID

export const databases = new Databases(client);
export const account = new Account(client);

// Collection IDs
export const INVENTORY_COLLECTION_ID = '6734349d0013efcfa8e3';
export const ORDERS_COLLECTION_ID = '673434d8001fe1a94058';
export const CUSTOMERS_COLLECTION_ID = '673435e7000a0b4cad77';
export const DATABASE_ID = '6734347c002f169153db';