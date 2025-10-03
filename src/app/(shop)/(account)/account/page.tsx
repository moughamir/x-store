import Link from "next/link";

export const metadata = {
  title: "My Account | X-Store",
  description: "Manage your account settings",
};

export default function AccountPage() {
  // This would typically fetch from an API with authentication
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    joinDate: "May 2023",
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Account Information */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Account Information</h2>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={user.name}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Member Since
                  </label>
                  <input
                    type="text"
                    value={user.joinDate}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  />
                </div>
              </div>

              <div className="mt-6">
                <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* Address Book */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Address Book</h2>
              <button className="text-sm text-indigo-600 hover:text-indigo-900">
                Add New Address
              </button>
            </div>
            <div className="px-6 py-4">
              <div className="border border-gray-200 rounded-md p-4">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Home Address</p>
                    <p className="text-sm text-gray-500">123 Main St</p>
                    <p className="text-sm text-gray-500">Anytown, ST 12345</p>
                    <p className="text-sm text-gray-500">United States</p>
                  </div>
                  <div>
                    <button className="text-sm text-indigo-600 hover:text-indigo-900">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Payment Methods</h2>
              <button className="text-sm text-indigo-600 hover:text-indigo-900">
                Add Payment Method
              </button>
            </div>
            <div className="px-6 py-4">
              <div className="border border-gray-200 rounded-md p-4">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Visa ending in 4242</p>
                    <p className="text-sm text-gray-500">Expires 12/25</p>
                  </div>
                  <div>
                    <button className="text-sm text-indigo-600 hover:text-indigo-900">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          {/* Quick Links */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Quick Links</h2>
            </div>
            <div className="px-6 py-4">
              <nav className="space-y-2">
                <Link
                  href="/orders"
                  className="block px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  My Orders
                </Link>
                <Link
                  href="/wishlist"
                  className="block px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Wishlist
                </Link>
                <Link
                  href={"/account/security"}
                  className="block px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Security Settings
                </Link>
                <button className="block w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-red-600">
                  Sign Out
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
