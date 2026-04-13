"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fadeUpVariant, staggerContainer, initScrollAnimations } from "@/lib/animations";

// Gallery items - can accept images, videos, and embedded URLs
const galleryItems = [
  {
    id: 1,
    title: "8-Ball Pool Arena",
    category: "Pool Gaming",
    type: "image",
    url: "/vear/67e29cdc0ffb11b522861f7f_Shop-1.jpg",
    thumbnail: "/vear/67e29cdc0ffb11b522861f7f_Shop-1.jpg",
  },
  {
    id: 2,
    title: "Professional Pool Tables",
    category: "Pool Gaming",
    type: "image",
    url: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bd5d89b248471ed7355_2.webp",
    thumbnail: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bd5d89b248471ed7355_2.webp",
  },
  {
    id: 3,
    title: "Tournament Pool Championship",
    category: "Pool Gaming",
    type: "image",
    url: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bd845bd43980da09622_3.webp",
    thumbnail: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bd845bd43980da09622_3.webp",
  },
  {
    id: 4,
    title: "10-Ball Tournament",
    category: "Pool Gaming",
    type: "image",
    url: "https://images.unsplash.com/photo-1557804506-669714d2e9d8?w=800",
    thumbnail: "https://images.unsplash.com/photo-1557804506-669714d2e9d8?w=400",
  },
  {
    id: 5,
    title: "VR Gaming Zone",
    category: "Virtual Reality",
    type: "image",
    url: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac52f/67d41adf70e6281fac07dc19_4",
    thumbnail: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac52f/67d41adf70e6281fac07dc19_4",
  },
  {
    id: 6,
    title: "VR Gaming Experience",
    category: "Virtual Reality",
    type: "image",
    url: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bec00e6b7904f2fe546_9.webp",
    thumbnail: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bec00e6b7904f2fe546_9.webp",
  },
  {
    id: 7,
    title: "Motion Tracking VR",
    category: "Virtual Reality",
    type: "image",
    url: "https://images.unsplash.com/photo-1587721471160-169b7d08ba91?w=800",
    thumbnail: "https://images.unsplash.com/photo-1587721471160-169b7d08ba91?w=400",
  },
  {
    id: 8,
    title: "Co-op VR Adventure",
    category: "Virtual Reality",
    type: "image",
    url: "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=800",
    thumbnail: "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400",
  },
  {
    id: 9,
    title: "PS5 Gaming Setup",
    category: "Console Gaming",
    type: "image",
    url: "/vear/67e29d2441cc3c17285f6f34_Shop-2.jpg",
    thumbnail: "/vear/67e29d2441cc3c17285f6f34_Shop-2.jpg",
  },
  {
    id: 10,
    title: "PS5 Gaming Arena",
    category: "Console Gaming",
    type: "image",
    url: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bbfba94846ccbb1bf89_10.webp",
    thumbnail: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bbfba94846ccbb1bf89_10.webp",
  },
  {
    id: 11,
    title: "Esports Tournament Setup",
    category: "Console Gaming",
    type: "image",
    url: "https://images.unsplash.com/photo-1538481143081-267f06cce340?w=800",
    thumbnail: "https://images.unsplash.com/photo-1538481143081-267f06cce340?w=400",
  },
  {
    id: 12,
    title: "4K Gaming Console",
    category: "Console Gaming",
    type: "image",
    url: "https://images.unsplash.com/photo-1605901287605-552f3b544738?w=800",
    thumbnail: "https://images.unsplash.com/photo-1605901287605-552f3b544738?w=400",
  },
  {
    id: 13,
    title: "Gaming Community",
    category: "Events",
    type: "image",
    url: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bdf2e4a11e6d9a282f2_11.webp",
    thumbnail: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bdf2e4a11e6d9a282f2_11.webp",
  },
  {
    id: 14,
    title: "Weekly Tournament Night",
    category: "Events",
    type: "image",
    url: "https://images.unsplash.com/photo-1511882642117-4b7cf48b4136?w=800",
    thumbnail: "https://images.unsplash.com/photo-1511882642117-4b7cf48b4136?w=400",
  },
  {
    id: 15,
    title: "Community Gaming Event",
    category: "Events",
    type: "image",
    url: "https://images.unsplash.com/photo-1516557595007-09a9674d11ad?w=800",
    thumbnail: "https://images.unsplash.com/photo-1516557595007-09a9674d11ad?w=400",
  },
  {
    id: 16,
    title: "League Championship Finals",
    category: "Events",
    type: "image",
    url: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800",
    thumbnail: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400",
  },
  {
    id: 17,
    title: "Gaming Lounge",
    category: "Facilities",
    type: "image",
    url: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bdc5f950c0d1d312713_6.webp",
    thumbnail: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bdc5f950c0d1d312713_6.webp",
  },
  {
    id: 18,
    title: "Premium Gaming Lounge",
    category: "Facilities",
    type: "image",
    url: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800",
    thumbnail: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400",
  },
  {
    id: 19,
    title: "Gaming Bar & Lounge",
    category: "Facilities",
    type: "image",
    url: "https://images.unsplash.com/photo-1598898657149-7e6c73ce1b5e?w=800",
    thumbnail: "https://images.unsplash.com/photo-1598898657149-7e6c73ce1b5e?w=400",
  },
  {
    id: 20,
    title: "Indoor Gaming Space",
    category: "Facilities",
    type: "image",
    url: "https://images.unsplash.com/photo-1611339555312-e607c04352fa?w=800",
    thumbnail: "https://images.unsplash.com/photo-1611339555312-e607c04352fa?w=400",
  },
];

// Gallery categories for filtering
const categories = [
  { id: "all", label: "All" },
  { id: "Pool Gaming", label: "Pool Gaming" },
  { id: "Virtual Reality", label: "Virtual Reality" },
  { id: "Console Gaming", label: "Console Gaming" },
  { id: "Events", label: "Events" },
  { id: "Facilities", label: "Facilities" },
];

export default function Home4Page() {
  const rootRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const cleanup = initScrollAnimations(rootRef.current);
    return () => cleanup();
  }, []);

  // Filter gallery items by category
  const filteredItems = activeCategory === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <div ref={rootRef} className="text-white bg-black main-wrapper">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 overflow-hidden">
          <div className="w-full px-6 mx-auto text-center max-w-7xl">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.p
                variants={fadeUpVariant}
                className="text-xs uppercase tracking-[0.35em] text-white/60"
              >
                Facility Gallery
              </motion.p>
              <motion.h1
                variants={fadeUpVariant}
                className="font-display text-5xl uppercase tracking-[0.18em] sm:text-6xl"
              >
                Our Gaming Spaces
              </motion.h1>
              <motion.p
                variants={fadeUpVariant}
                className="max-w-2xl mx-auto text-lg text-white/70"
              >
                Explore our world-class gaming facility with state-of-the-art equipment, premium ambiance, and professional gaming environments across all disciplines.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 border-y border-white/10">
          <div className="w-full px-6 mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className={`rounded-full px-6 py-2 text-xs uppercase tracking-[0.2em] transition-all duration-300 border ${
                    activeCategory === category.id
                      ? "bg-white text-black border-white"
                      : "border-white/20 text-white hover:border-pink"
                  }`}
                >
                  {category.label}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-20">
          <div className="w-full px-6 mx-auto max-w-7xl">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  variants={fadeUpVariant}
                  onClick={() => setSelectedImage(item)}
                  className="relative overflow-hidden border cursor-pointer group rounded-2xl border-white/10 bg-white/5 aspect-square"
                >
                  {/* Image Display */}
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="object-cover w-full h-full transition duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4 transition duration-300 opacity-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:opacity-100">
                    <h3 className="text-sm font-display uppercase tracking-[0.1em] text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-white/70">{item.category}</p>
                  </div>

                  {/* Play Icon for Videos */}
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center transition duration-300 opacity-0 group-hover:opacity-100">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* No Results Message */}
            {filteredItems.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-white/70">No images found in this category.</p>
              </div>
            )}
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-16 border-t border-white/10">
          <div className="w-full px-6 mx-auto max-w-7xl">
            <div className="grid gap-8 sm:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-3 text-center"
              >
                <div className="text-4xl font-display uppercase tracking-[0.12em]">40+</div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">Gaming Stations</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="space-y-3 text-center"
              >
                <div className="text-4xl font-display uppercase tracking-[0.12em]">3</div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">Gaming Disciplines</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-3 text-center"
              >
                <div className="text-4xl font-display uppercase tracking-[0.12em]">24/7</div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">Open Access</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="w-full px-6 mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="p-12 space-y-6 text-center border rounded-3xl border-white/10 bg-white/5"
            >
              <h2 className="text-3xl font-display uppercase tracking-[0.12em] sm:text-4xl">
                Ready to Experience Our Facility?
              </h2>
              <p className="max-w-2xl mx-auto text-white/70">
                Book a gaming session, join our community, or explore what makes our gaming hub the ultimate destination for all players.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="/booking"
                  className="rounded-full bg-white px-8 py-3 text-xs uppercase tracking-[0.25em] text-black font-semibold hover:bg-white/90 transition"
                >
                  Book Now
                </a>
                <a
                  href="/contact"
                  className="rounded-full border border-white/20 px-8 py-3 text-xs uppercase tracking-[0.25em] text-white hover:border-pink transition"
                >
                  Get in Touch
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-0 z-10 p-2 text-white transition border rounded-full -top-12 border-white/20 hover:border-pink"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image */}
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="w-full border rounded-2xl border-white/10"
            />

            {/* Image Info */}
            <div className="mt-6 space-y-2 text-center">
              <h3 className="text-2xl font-display uppercase tracking-[0.12em]">
                {selectedImage.title}
              </h3>
              <p className="text-white/70">{selectedImage.category}</p>
            </div>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}
