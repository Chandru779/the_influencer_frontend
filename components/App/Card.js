// import { BsEmojiSmile } from "react-icons/bs";
//  <BsEmojiSmile size={24} className="text-[#03045e]" />

export default function Card({ news }) {
  return (
    <div className="h-full relative overflow-y-auto">
      <section className="h-full absolute overflow-y-auto flex flex-col gap-2 px-2 py-1">
        {news?.length > 0 &&
          news.map((info) => (
            <div
              key={info._id}
              className="flex flex-col gap-3 p-4 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-right text-xs text-gray-400">
                {new Date(info.updatedAt).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </div>

              <p className="text-base font-medium text-gray-800 ">
                {info.info}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="relative group w-fit">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-semibold text-gray-600 cursor-default">
                    {info.source.charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute left-10 top-1/2 -translate-y-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                    {info.source}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-sm">
                  <div className="flex flex-wrap items-center gap-2 text-xs ">
                    {/* Status Pill */}
                    <span
                      className={`inline-flex items-center gap-1 px-2 rounded-full font-medium ${
                        info.newsStatus === "verified"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {info.newsStatus === "verified"
                        ? "✅ Verified"
                        : "⚠️ Unverified"}
                    </span>

                    {/* Method Pill */}
                    <span className="inline-flex items-center gap-1 px-2 rounded-full bg-blue-100 text-blue-700 font-medium">
                      🤖{" "}
                      {info.newsSourceMethod.charAt(0).toUpperCase() +
                        info.newsSourceMethod.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </section>
    </div>
  );
}
