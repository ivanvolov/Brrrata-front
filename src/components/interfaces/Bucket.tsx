export default function Bucket() {
  return (
    <div className="w-1/3 max-w-xs rounded-xl bg-white p-6 shadow-2xl">
      <div className="rounded-lg border p-4 transition-colors hover:bg-gray-50">
        <div className="mb-3 grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-gray-600">Amount:</span>
            <span className="ml-1 font-medium">1000 BRRATA</span>
          </div>
          <div>
            <span className="text-gray-600">Interest:</span>
            <span className="ml-1 font-medium text-green-600">
              +50 BRRATA
            </span>
          </div>
          <div>
            <span className="text-gray-600">Staked:</span>
            <span className="ml-1 font-medium">5 days ago</span>
          </div>
          <div>
            <span className="text-gray-600">Remaining:</span>
            <span className="ml-1 font-medium">9 days</span>
          </div>
        </div>
        <button className="w-full rounded-lg bg-purple-500 py-2 font-medium text-white transition-colors hover:bg-purple-600">
          Unstake
        </button>
      </div>
    </div>
  );
}
