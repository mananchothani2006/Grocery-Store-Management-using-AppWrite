import { useState, useEffect } from 'react';
import { databases, DATABASE_ID, INVENTORY_COLLECTION_ID } from '../config/Appwrite';
import { Query } from 'appwrite';
import toast from 'react-hot-toast';

function Inventory() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: 0, price: 0 });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        INVENTORY_COLLECTION_ID,
        [Query.orderDesc('$createdAt')]
      );
      setItems(response.documents);
    } catch (error) {
      toast.error('Failed to fetch inventory items');
    }
  };

  const addItem = async (e) => {
    e.preventDefault();
    try {
      await databases.createDocument(
        DATABASE_ID,
        INVENTORY_COLLECTION_ID,
        'unique()',
        newItem
      );
      toast.success('Item added successfully');
      fetchItems();
      setNewItem({ name: '', quantity: 0, price: 0 });
    } catch (error) {
      toast.error('Failed to add item');
    }
  };

  const deleteItem = async (id) => {
    try {
      await databases.deleteDocument(DATABASE_ID, INVENTORY_COLLECTION_ID, id);
      toast.success('Item deleted successfully');
      fetchItems();
    } catch (error) {
      toast.error('Failed to delete item');
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">Inventory Management</h2>
      
      <div className="card p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Add New Item</h3>
        <form onSubmit={addItem} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Item Name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="input-field"
              required
            />
            <input
              type="number"
              placeholder="Quantity"
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
              className="input-field"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
              className="input-field"
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            Add Item
          </button>
        </form>
      </div>

      <div className="table-container">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="table-header">
            <tr>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Quantity</th>
              <th className="px-6 py-4 text-left">Price</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.$id} className="table-row">
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.quantity}</td>
                <td className="px-6 py-4">${item.price.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => deleteItem(item.$id)}
                    className="btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventory;