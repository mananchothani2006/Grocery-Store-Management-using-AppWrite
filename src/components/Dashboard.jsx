import { useState, useEffect } from 'react';
import { databases, DATABASE_ID, INVENTORY_COLLECTION_ID, ORDERS_COLLECTION_ID, CUSTOMERS_COLLECTION_ID } from '../config/Appwrite';

function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [inventory, orders, customers] = await Promise.all([
        databases.listDocuments(DATABASE_ID, INVENTORY_COLLECTION_ID),
        databases.listDocuments(DATABASE_ID, ORDERS_COLLECTION_ID),
        databases.listDocuments(DATABASE_ID, CUSTOMERS_COLLECTION_ID),
      ]);

      setStats({
        totalProducts: inventory.total,
        totalOrders: orders.total,
        totalCustomers: customers.total,
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="card p-6 border-t-4 border-blue-500">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Products</h3>
          <p className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
            {stats.totalProducts}
          </p>
        </div>
        
        <div className="card p-6 border-t-4 border-green-500">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Orders</h3>
          <p className="text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
            {stats.totalOrders}
          </p>
        </div>
        
        <div className="card p-6 border-t-4 border-purple-500">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Customers</h3>
          <p className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
            {stats.totalCustomers}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;