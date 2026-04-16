function MarqueeSection() {
  return (
    <section className="py-10 mx-auto border-y border-white/20 max-w-7xl">
      <div className="w-full px-6">
        <div className="overflow-hidden">
          <div className="marquee-track">
            <div className="flex items-center gap-16">
              <span className="text-xs font-display uppercase sm:tracking-[0.2em] text-white/60 sm:text-4xl">
                Game Hard. Chill Harder. Play Smart. Win Together. — Skilladiz Gaming Club
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MarqueeSection;
