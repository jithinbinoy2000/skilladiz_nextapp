import GridDistortion from "@/components/GridDistortion";

function LifestyleSection({ showcases }) {
  return (
    <section className="relative min-h-screen sm:min-h-[850px] overflow-hidden">
      <div className="absolute inset-0 z-0 w-full h-full pb-20">
        <GridDistortion
          imageSrc="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67e27eaed8ecdca4a1a67252_6.webp"
          grid={10}
          mouse={0.1}
          strength={0.15}
          relaxation={0.9}
          className="object-contain w-full h-full mx-auto opacity-50"
        />
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none bg-black/20 backdrop-blur-sm" />

      <div className="relative z-20 w-full px-4 py-1 mx-auto pointer-events-none sm:py-40 sm:px-6 max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">
              Elevate Your Game
            </p>
            <h2 className="text-3xl font-display uppercase tracking-[0.12em] sm:text-4xl">
              Step Into the Ultimate Gaming Lifestyle.
            </h2>
            <p className="max-w-xl font-sans text-xl text-white/70">
              Skilladiz was designed for those who demand more than just a gaming
              session. With a futuristic interior, premium equipment at every
              station, and a community-driven atmosphere that welcomes everyone —
              from casual players to hardcore competitors — Skilladiz is the
              gaming lifestyle upgrade you've been waiting for.
            </p>
            <div className="flex flex-wrap gap-3">
              {showcases.map((image) => (
                <div
                  key={image}
                  className="h-20 overflow-hidden border w-30 rounded-xl border-white/10"
                >
                  <img src={image} alt="Showcase" className="object-cover w-full h-full" />
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden border rounded-3xl border-white/10 h-full min-h-[240px] aspect-video">
            <img
              data-parallax
              src="https://res.cloudinary.com/jerrick/image/upload/v1764906826/6932574a991b82001d403a51.jpg"
              alt="Immersion"
              className="absolute inset-0 object-cover w-full h-full"
            />
            <div className="absolute bottom-0 left-0 p-4 bg-black">
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">
                Elevate Your Game
              </p>
              <h2 className="text-3xl font-display uppercase tracking-[0.12em] sm:text-4xl">
                Step Into the Ultimate Gaming Lifestyle.
              </h2>
            </div>
            <div className="absolute inset-0 bg-black/40" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default LifestyleSection;
