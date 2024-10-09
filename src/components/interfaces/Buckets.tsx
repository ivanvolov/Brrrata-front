import Bucket from "./Bucket";


export default function Buckets() {
  return (
            <div
              id="buckets"
              className="w-full flex-grow mt-8 flex justify-center flex-wrap gap-4"
            >
                <Bucket/>
            </div>
  );
}
