export default function Header() {
  return (
        <header className="flex items-center justify-between bg-gradient-to-r from-blue-500 to-purple-500 p-6 shadow-lg">
          <h1 className="text-3xl font-bold text-white">
            Brrrata is the best cheese
          </h1>
          <button className="rounded-lg bg-white px-4 py-2 text-blue-500 shadow-lg transition-all duration-300 ease-in-out hover:bg-gray-100">
            Wallet Connect
          </button>
        </header>
  );
}
