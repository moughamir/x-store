import SalesChart from "@/components/ui/SalesChart";
import StatsCard from "@/components/ui/StatsCard";

export const metadata = {
  title: "Dashboard | X-Store Admin",
  description: "X-Store Admin Dashboard",
};

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard title="Total Sales" value="$12,345" change="+12%" />
        <StatsCard title="Orders" value="156" change="+8%" />
        <StatsCard title="Customers" value="1,245" change="+5%" />
        <StatsCard title="Conversion" value="3.2%" change="-0.5%" isNegative />
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
        <SalesChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          {/* Recent orders table would go here */}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Top Products</h2>
          {/* Top products list would go here */}
        </div>
      </div>
    </div>
  );
}
