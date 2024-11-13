import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'text-indigo-600 font-semibold' : 'text-gray-600 hover:text-indigo-600';
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Grocery Store Manager
          </div>
          <div className="space-x-6">
            <Link to="/" className={`${isActive('/')} transition-colors duration-200`}>Dashboard</Link>
            <Link to="/inventory" className={`${isActive('/inventory')} transition-colors duration-200`}>Inventory</Link>
            <Link to="/orders" className={`${isActive('/orders')} transition-colors duration-200`}>Orders</Link>
            <Link to="/customers" className={`${isActive('/customers')} transition-colors duration-200`}>Customers</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;