import Link from "next/link";
import { ReactElement } from "react";

export default function Home(): ReactElement {
  return (
    <>
      <main className="h-full flex flex-col justify-center items-center">
        <div className="h-[8rem] flex flex-col justify-center items-center text-center mt-14 max-sm:mt-10 mx-12 font-bold tracking-wide text-6xl max-sm:text-5xl font-sans">
          EasyEdit PDF
        </div>
        <div className="h-[6rem] flex flex-col justify-center items-center mt-9 max-sm:mt-3 font-semibold text-5xl max-sm:text-4xl font-sans">
          Tools
        </div>
        <div className="h-[21rem] w-[40rem] max-sm:h-[25.5rem] max-sm:w-[23rem] justify-center items-center mt-6 max-sm:mt-3 text-3xl max-sm:text-2xl font-sans">
          <Link href="/pdf-merger">
            <button className="m-5 max-sm:m-3 rounded-xl bg-[#B43F3F]   hover:bg-[#FF8225] dark:hover:bg-[#04234D] hover:ring hover:ring-[#0091ff] dark:hover:ring-[#B43F3F] text-gray-200 p-2 h-32 w-40 max-sm:h-[7rem] max-sm:w-[8.5rem]">
              PDF Merger
            </button>
          </Link>
          <Link href="/pdf-page-extractor">
            <button className="m-5 max-sm:m-3 rounded-xl bg-[#B43F3F]   hover:bg-[#FF8225] dark:hover:bg-[#04234D] hover:ring hover:ring-[#0091ff] dark:hover:ring-[#B43F3F] text-gray-200 p-2 h-32 w-40 max-sm:h-[7rem] max-sm:w-[8.5rem]">
              PDF Page Extractor
            </button>
          </Link>
          <Link href="/pdf-page-deleter">
            <button className="m-5 max-sm:m-3 rounded-xl bg-[#B43F3F]   hover:bg-[#FF8225] dark:hover:bg-[#04234D] hover:ring hover:ring-[#0091ff] dark:hover:ring-[#B43F3F] text-gray-200 p-2 h-32 w-40 max-sm:h-[7rem] max-sm:w-[8.5rem]">
              PDF Page Deleter
            </button>
          </Link>
          <Link href="/image-to-pdf">
            <button className="m-5 max-sm:m-3 rounded-xl bg-[#B43F3F]   hover:bg-[#FF8225] dark:hover:bg-[#04234D] hover:ring hover:ring-[#0091ff] dark:hover:ring-[#B43F3F] text-gray-200 p-2 h-32 w-40 max-sm:h-[7rem] max-sm:w-[8.5rem]">
              Image To PDF
            </button>
          </Link>
          <Link href="/pdf-encryptor">
            <button className="m-5 max-sm:m-3 rounded-xl bg-[#B43F3F]   hover:bg-[#FF8225] dark:hover:bg-[#04234D] hover:ring hover:ring-[#0091ff] dark:hover:ring-[#B43F3F] text-gray-200 p-2 h-32 w-40 max-sm:h-[7rem] max-sm:w-[8.5rem]">
              PDF Encryptor
            </button>
          </Link>
          <button className="m-5 max-sm:m-3 rounded-xl bg-[#B43F3F]   hover:bg-[#FF8225] dark:hover:bg-[#04234D] hover:ring hover:ring-[#0091ff] dark:hover:ring-[#B43F3F] text-gray-200 p-2 h-32 w-40 max-sm:h-[7rem] max-sm:w-[8.5rem]">
chat with PDF (AI)            </button>
        </div>
      </main>
    </>
  );
}
