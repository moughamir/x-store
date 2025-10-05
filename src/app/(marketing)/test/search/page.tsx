import SearchClient from "./search-client";

export default function SearchPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Product Search</h1>
      <SearchClient />
    </main>
  );
}
