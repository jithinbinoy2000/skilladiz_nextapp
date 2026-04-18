function ImaginationSection() {
  return (
    <section className="relative py-16 mb-10 sm:py-24 sm:mb-20 overflow-hidden bg-black">
      <div className="absolute inset-0 z-0 opacity-70">
        <div className="absolute top-[-200px] right-[-200px] w-[700px] h-[700px] rounded-full bg-purple-600/20 blur-[140px]" />
        <div className="absolute bottom-[-200px] left-[-200px] w-[700px] h-[700px] rounded-full bg-pink-600/20 blur-[140px]" />
        <img
          src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d447af45bd43980dba892c_Png-02.webp"
          alt="VR Players"
          className="absolute right-0 z-0 object-contain w-full max-w-7xl -bottom-40"
        />
      </div>
      <div className="absolute inset-0 z-10 pointer-events-none bg-black/10 backdrop-blur-xs" />

      <div className="relative z-10 w-full px-4 mx-auto my-auto max-w-7xl sm:px-6 flex justify-center items-center sm:min-h-[calc(100vh-300px)]">
        <div className="grid gap-10 sm:gap-16 lg:grid-cols-2">
          <div className="max-w-xl space-y-6">
            <p className="text-xs uppercase tracking-[0.25em] text-white/60">
              Where Imagination Lives
            </p>
            <h2 className="text-3xl leading-tight font-display sm:text-4xl lg:text-5xl">
              Skilladiz is a gateway to a limitless gaming universe where
              <span className="text-white/90"> immersive experiences </span>
              blur the line between play and reality.
            </h2>
          </div>

          <div className="relative flex flex-col items-end justify-end gap-6 lg:items-end">
            <div className="text-6xl font-display tracking-[0.12em] sm:text-7xl lg:text-8xl">
              30K+
            </div>
            <p className="max-w-sm font-sans text-sm leading-relaxed text-white/60 sm:text-base lg:text-right">
              Gamers have already stepped into the Skilladiz world, experiencing
              competitive play, immersive VR adventures, and next-level gaming
              moments.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ImaginationSection;
