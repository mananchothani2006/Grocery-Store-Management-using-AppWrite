import { useState, useEffect } from 'react';
import { databases, DATABASE_ID, CUSTOMERS_COLLECTION_ID } from '../config/Appwrite';
import { Query } from 'appwrite';
import toast from 'react-hot-toast';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        CUSTOMERS_COLLECTION_ID,
        [Query.orderDesc('$createdAt')]
      );
      setCustomers(response.documents);
    } catch (error) {
      toast.error('Failed to fetch customers');
    }
  };

  const addCustomer = async (e) => {
    e.preventDefault();
    try {
      await databases.createDocument(
        DATABASE_ID,
        CUSTOMERS_COLLECTION_ID,
        'unique()',
        newCustomer
      );
      toast.success('Customer added successfully');
      fetchCustomers();
      setNewCustomer({ name: '', email: '', phone: '', address: '' });
    } catch (error) {
      toast.error('Failed to add customer');
    }
  };

  const deleteCustomer = async (id) => {
    try {
      await databases.deleteDocument(DATABASE_ID, CUSTOMERS_COLLECTION_ID, id);
      toast.success('Customer deleted successfully');
      fetchCustomers();
    } catch (error) {
      toast.error('Failed to delete customer');
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">Customers Management</h2>
      
      <div className="card p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Add New Customer</h3>
        <form onSubmit={addCustomer} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={newCustomer.name}
              onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
              className="input-field"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={newCustomer.email}
              onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
              className="input-field"
              required
            />
            <input
              type="tel"
              placeholder="Phone"
              value={newCustomer.phone}
              onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
              className="input-field"
              required
            />
            <input
              type="text"
              placeholder="Address"
              value={newCustomer.address}
              onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
              className="input-field"
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            Add Customer
          </button>
        </form>
      </div>

      <div className="table-container">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="table-header">
            <tr>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Phone</th>
              <th className="px-6 py-4 text-left">Address</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {customers.map((customer) => (
              <tr key={customer.$id} className="table-row">
                <td className="px-6 py-4">{customer.name}</td>
                <td className="px-6 py-4">{customer.email}</td>
                <td className="px-6 py-4">{customer.phone}</td>
                <td className="px-6 py-4">{customer.address}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => deleteCustomer(customer.$id)}
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

export default Customers;