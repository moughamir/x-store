export interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  isNegative?: boolean;
}

export default function StatsCard({
  title,
  value,
  change,
  isNegative = false,
}: StatsCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-2xl font-semibold mt-2">{value}</p>

      {change && (
        <div className="flex items-center mt-2">
          <span
            className={`text-sm ${
              isNegative ? "text-red-500" : "text-green-500"
            }`}
          >
            {change}
          </span>
          <svg
            className={`w-4 h-4 ml-1 ${
              isNegative
                ? "text-red-500 transform rotate-180"
                : "text-green-500"
            }`}
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
      )}
    </div>
  );
}
