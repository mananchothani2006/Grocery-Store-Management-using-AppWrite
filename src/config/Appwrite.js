import { Client, Databases, Account } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
    .setProject('6734a247000de2e14d7e'); // Replace with your project ID

export const databases = new Databases(client);
export const account = new Account(client);

// Collection IDs
export const INVENTORY_COLLECTION_ID = '6734a5a9002eba6cf470';
export const ORDERS_COLLECTION_ID = '6734a5300029a0aff832';
export const CUSTOMERS_COLLECTION_ID = '6734a4b60024d3bfdeb1';
export const DATABASE_ID = '6734a4a8001ef2787575';