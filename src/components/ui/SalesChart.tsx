'use client';

export default function SalesChart() {
  // This is a placeholder for a real chart component
  // In a real application, you would use a library like Chart.js, Recharts, or D3.js

  // Mock data for the chart
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const data = [1200, 1900, 1500, 2000, 2400, 1800, 2800, 3200, 2900, 3500, 3800, 4200];

  // Calculate the max value for scaling
  const maxValue = Math.max(...data);

  return (
    <div className="w-full h-64">
      <div className="flex items-end h-52 space-x-2">
        {data.map((value, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div
              className="w-full bg-blue-500 rounded-t"
              style={{
                height: `${(value / maxValue) * 100}%`,
                backgroundColor: index === data.length - 1 ? '#3b82f6' : '#93c5fd'
              }}
            ></div>
            <span className="text-xs mt-1 text-gray-500">{months[index]}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <div className="text-sm text-gray-500">
          <span className="font-medium">Total Sales:</span> $29,800
        </div>
        <div className="text-sm text-green-500 flex items-center">
          <span className="font-medium">+24%</span>
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
