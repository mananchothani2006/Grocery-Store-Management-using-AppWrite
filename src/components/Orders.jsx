import { useState, useEffect } from 'react';
import { databases, DATABASE_ID, ORDERS_COLLECTION_ID } from '../config/Appwrite';
import { Query } from 'appwrite';
import toast from 'react-hot-toast';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    customerName: '',
    items: '',
    total: 0,
    status: 'pending'
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        ORDERS_COLLECTION_ID,
        [Query.orderDesc('$createdAt')]
      );
      setOrders(response.documents);
    } catch (error) {
      toast.error('Failed to fetch orders');
    }
  };

  const addOrder = async (e) => {
    e.preventDefault();
    try {
      await databases.createDocument(
        DATABASE_ID,
        ORDERS_COLLECTION_ID,
        'unique()',
        newOrder
      );
      toast.success('Order added successfully');
      fetchOrders();
      setNewOrder({ customerName: '', items: '', total: 0, status: 'pending' });
    } catch (error) {
      toast.error('Failed to add order');
    }
  };

  const updateOrderStatus = async (id, newStatus) => {
    try {
      await databases.updateDocument(
        DATABASE_ID,
        ORDERS_COLLECTION_ID,
        id,
        { status: newStatus }
      );
      toast.success('Order status updated');
      fetchOrders();
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || colors.pending;
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">Orders Management</h2>
      
      <div className="card p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Create New Order</h3>
        <form onSubmit={addOrder} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Customer Name"
              value={newOrder.customerName}
              onChange={(e) => setNewOrder({ ...newOrder, customerName: e.target.value })}
              className="input-field"
              required
            />
            <input
              type="text"
              placeholder="Items (comma separated)"
              value={newOrder.items}
              onChange={(e) => setNewOrder({ ...newOrder, items: e.target.value })}
              className="input-field"
              required
            />
            <input
              type="number"
              placeholder="Total Amount"
              value={newOrder.total}
              onChange={(e) => setNewOrder({ ...newOrder, total: parseFloat(e.target.value) })}
              className="input-field"
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            Create Order
          </button>
        </form>
      </div>

      <div className="table-container">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="table-header">
            <tr>
              <th className="px-6 py-4 text-left">Customer</th>
              <th className="px-6 py-4 text-left">Items</th>
              <th className="px-6 py-4 text-left">Total</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.$id} className="table-row">
                <td className="px-6 py-4">{order.customerName}</td>
                <td className="px-6 py-4">{order.items}</td>
                <td className="px-6 py-4">${order.total.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.$id, e.target.value)}
                    className="status-select"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;