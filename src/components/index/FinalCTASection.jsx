import FillButton from "@/components/ui/FillButton";

function FinalCTASection() {
  return (
    <section className="pb-20">
      <div className="w-full px-6 mx-auto max-w-7xl">
        <div className="relative overflow-hidden border rounded-3xl border-white/10">
          <img
            data-parallax
            src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67e27eaed8ecdca4a1a67252_6.webp"
            alt="CTA"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative flex flex-col gap-6 p-10 sm:p-14">
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">
              Join the Future
            </p>
            <h2 className="text-3xl font-display uppercase tracking-[0.12em] sm:text-4xl">
              Ready to design your next virtual adventure?
            </h2>
            <div className="flex flex-wrap gap-4">
              <FillButton href="/contact" variant="solid">
                Contact Us
              </FillButton>
              <FillButton href="/services" variant="ghost">
                Explore More
              </FillButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FinalCTASection;
