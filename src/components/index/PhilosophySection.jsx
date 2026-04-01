const philosophyItems = [
  {
    step: "01",
    title: "IMMERSION",
    desc: "Designing spaces where players stay fully engaged, focused, and energized while experiencing games in a truly authentic atmosphere.",
    button: "Inside Skilladiz",
  },
  {
    step: "02",
    title: "EXPLORATION",
    desc: "Bringing together diverse gaming experiences, from classic cue sports to modern consoles and virtual reality adventures.",
    button: "Explore Games",
  },
  {
    step: "03",
    title: "INTERACTION",
    desc: "Creating a community where gamers connect, compete, and share meaningful moments that extend beyond individual play.",
    button: "Our Community",
  },
  {
    step: "04",
    title: "SIMULATION",
    desc: "Adopting advanced gaming technologies that deliver realism, creativity, and innovation to elevate everyday play experiences.",
    button: "VR Experience",
  },
];

function PhilosophySection() {
  return (
    <section className="relative py-20 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,_rgba(248,51,225,0.10),_transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(248,51,225,0.10),_transparent_55%)]" />
      <div className="w-full px-4 mx-auto max-w-7xl sm:px-6">
        <div className="flex items-center gap-3 mb-10">
          <p className="text-xs uppercase tracking-[0.35em] text-white/60">
            Our Philosophy
          </p>
          <img
            src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d9606476c7cb7cb2c4489c_sonna-arrow-down-right%201.svg"
            alt=""
            className="w-4 h-4"
          />
        </div>
        <div className="grid grid-cols-1 gap-2 py-10 sm:grid-cols-2 lg:grid-cols-4 border-y border-white/10">
          {philosophyItems.map((item, idx) => (
            <div
              key={idx}
              className="grid grid-rows-[auto_auto_1fr_auto] gap-4 border-l ps-6 first:ps-0 first:border-l-0 border-white/10"
            >
              <h2 className="text-2xl font-display uppercase tracking-[0.12em]">
                {item.title}
              </h2>
              <p className="text-xs uppercase text-white/90">{item.step}</p>
              <p className="text-base tracking-[.05em] text-white/70 font-sans">
                {item.desc}
              </p>
              <div className="w-full h-auto aspect-[16/8]" />
              <a
                href="/contact"
                className="flex items-center gap-2 mt-2 text-xs uppercase tracking-[0.25em] text-white"
              >
                <div className="flex items-center justify-center w-10 h-10 border rounded-full border-white/20">
                  <img
                    src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d3d739571201bc625f4937_Vector%20101.svg"
                    alt=""
                    className="w-3 h-3"
                  />
                </div>
                {item.button}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PhilosophySection;
