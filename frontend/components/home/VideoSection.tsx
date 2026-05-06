export default function VideoSection() {
  return (
    <div className="flex justify-between items-center gap-4">
      <div className="flex-1">
        <h1 className="text-4xl font-[500]">Set up loans in seconds</h1>
        <p className="text-gray-600 mt-4 text-lg">
          We handle the math so you can focus on your clients
        </p>
      </div>

      <div className="flex-1 p-4 shadow-xl border-2 rounded-md">
        <video
          src="/assets/final-video.webm"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}
