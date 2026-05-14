export default function VideoSection() {
  return (
    <div className="flex justify-between items-center gap-[1rem] max-[600px]:flex-col">
      <div className="flex-1">
        <h1 className="text-4xl font-[500]">
          Know exactly what you are creating. Before you create it.
        </h1>
        <p className="text-gray-600 mt-4 text-2xl">
          Loqvio shows installment amounts, payment count, and end date in real
          time — no surprises, no miscalculations.
        </p>
      </div>

      <div className="flex-1 p-4 shadow-xl max-w-[700px] border-2 rounded-md">
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
