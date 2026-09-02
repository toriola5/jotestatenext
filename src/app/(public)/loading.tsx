import Image from "next/image";

export default function HomeLoading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-5 px-4">
      <div className="relative w-20 h-20 flex items-center justify-center">
        <span className="absolute inset-0 rounded-full border-4 border-gray-100 border-t-[var(--primary)] animate-spin" />
        <Image
          src="/logo.jpeg"
          alt="Jola Estates"
          width={48}
          height={48}
          className="rounded-full object-cover shrink-0"
          priority
        />
      </div>
      <div className="text-center">
        <p className="text-gray-900 font-semibold tracking-wide">
          Loading your experience
        </p>
        <p className="text-gray-400 text-xs mt-1.5 uppercase tracking-widest">
          Jola Estates
        </p>
      </div>
    </div>
  );
}
