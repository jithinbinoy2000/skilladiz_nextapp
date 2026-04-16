import { motion } from "framer-motion";
import { fadeUpVariant, staggerContainer } from "@/lib/animations";

function MembershipPlansSection({ plans }) {
  return (
    <section className="relative py-20 overflow-hidden bg-black">
      <div className="w-full px-6 mx-auto max-w-7xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,_rgba(248,51,225,0.10),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(248,51,225,0.10),_transparent_55%)]" />
        <div className="flex items-center gap-3 mb-10">
          <p className="text-xs uppercase tracking-[0.35em] text-white/60">
            Membership Plans
          </p>
          <img
            src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d9606476c7cb7cb2c4489c_sonna-arrow-down-right%201.svg"
            alt=""
            className="w-4 h-4"
          />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-2 py-10 sm:grid-cols-2 lg:grid-cols-3 border-y border-white/20"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={fadeUpVariant}
              className="grid grid-rows-[auto_auto_1fr_auto] gap-4 border-l ps-6 first:ps-0 first:border-l-0 border-white/25 relative group aspect-[2/2.5]"
            >
              <h2 className="text-2xl font-display uppercase tracking-[0.12em]">
                {plan.name}
              </h2>

              <div className="flex items-center gap-3">
                <img src={plan.icon} alt="" className="w-10 h-10" />
                <p className="text-sm text-white/70">
                  {plan.price} {plan.duration}
                </p>
              </div>

              <p className="text-base tracking-[.05em] text-white z-50">
                {plan.planDescription}
              </p>

              <ul className="grid gap-3 mb-2 text-white/70">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-4">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/70 shrink-0 font-sans text-sm" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="/membership"
                className="flex items-center gap-2 mt-2 text-xs uppercase tracking-[0.25em] text-white"
              >
                <div className="flex items-center justify-center w-10 h-10 border rounded-full border-white/40 shrink-0">
                  <img
                    src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d3d739571201bc625f4937_Vector%20101.svg"
                    alt=""
                    className="w-3 h-3"
                  />
                </div>
                View {plan.name}
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default MembershipPlansSection;
