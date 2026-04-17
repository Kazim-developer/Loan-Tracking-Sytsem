"use client";

type LoaderProps = {
  fullScreen?: boolean;
  text?: string;
};

export default function Loader({
  fullScreen = false,
  text = "Loading...",
}: LoaderProps) {
  return (
    <div
      className={`${
        fullScreen ? "fixed inset-0 z-50" : "w-full h-full"
      } flex items-center justify-center bg-white`}
    >
      <div className="flex flex-col items-center gap-5">
        {/* Animated Bars */}
        <div className="flex items-end gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 bg-black rounded-full animate-loaderBar"
              style={{
                height: `${12 + i * 6}px`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>

        {/* Text */}
        <p className="text-sm text-gray-500 tracking-wide">{text}</p>
      </div>
    </div>
  );
}
