// Seed: gamer role + full CMS homepage configuration
exports.seed = async function seed(knex) {
  // ── 1. Add 'gamer' role if it doesn't exist ──────────────────────────────
  await knex("roles")
    .insert({
      name: "gamer",
      description: "Registered gamer — can book slots and join tournaments",
      is_system: true,
    })
    .onConflict("name")
    .merge({ description: "Registered gamer — can book slots and join tournaments" });

  // ── 2. CMS sections ───────────────────────────────────────────────────────
  const sections = [
    {
      section_name: "site_identity",
      is_visible: true,
      content: {
        site_name: "Skilladiz",
        tagline: "Game. Compete. Conquer.",
        logo_url: "/images/logo.png",
        favicon_url: "/images/favicon.ico",
      },
    },
    {
      section_name: "hero",
      is_visible: true,
      content: {
        heading: "Book Your Battle Station",
        subheading:
          "Reserve premium gaming slots, join tournaments, and level up your game.",
        cta_primary_text: "Book a Slot",
        cta_primary_url: "/booking",
        cta_secondary_text: "View Tournaments",
        cta_secondary_url: "/tournaments",
        background_video_url: "",
        background_image_url: "/images/hero-bg.jpg",
      },
    },
    {
      section_name: "features",
      is_visible: true,
      content: {
        heading: "Why Choose Skilladiz?",
        items: [
          {
            icon: "joystick",
            title: "40+ Gaming Titles",
            description: "From FPS to fighting games — we have it all.",
          },
          {
            icon: "trophy",
            title: "Weekly Tournaments",
            description: "Compete for real prize pools every weekend.",
          },
          {
            icon: "clock",
            title: "Flexible Booking",
            description: "Book any slot online, anytime.",
          },
          {
            icon: "star",
            title: "Membership Perks",
            description: "Members get priority slots and exclusive discounts.",
          },
        ],
      },
    },
    {
      section_name: "about",
      is_visible: true,
      content: {
        heading: "About Us",
        body: "Skilladiz is the region's premier competitive gaming arena. Founded in 2024, we bring together casual and professional gamers in a state-of-the-art facility.",
        image_url: "/images/about.jpg",
        stats: [
          { label: "Gaming Stations", value: "50+" },
          { label: "Monthly Players", value: "2,000+" },
          { label: "Tournaments Hosted", value: "100+" },
        ],
      },
    },
    {
      section_name: "pricing",
      is_visible: true,
      content: {
        heading: "Simple, Transparent Pricing",
        plans: [
          {
            name: "Casual",
            price_per_hour: 5,
            currency: "USD",
            highlights: ["Any available slot", "Standard stations", "Walk-in or book online"],
          },
          {
            name: "Pro Member",
            price_per_month: 39,
            currency: "USD",
            highlights: [
              "Priority slot access",
              "10% discount on bookings",
              "Free tournament entry x1/month",
            ],
          },
        ],
      },
    },
    {
      section_name: "testimonials",
      is_visible: true,
      content: {
        heading: "What Our Gamers Say",
        items: [
          {
            name: "Alex R.",
            avatar_url: "/images/avatar1.jpg",
            quote: "Best gaming setup I've ever played on. The booking system is super smooth!",
            rating: 5,
          },
          {
            name: "Priya K.",
            avatar_url: "/images/avatar2.jpg",
            quote: "Won my first tournament here. The community is incredible.",
            rating: 5,
          },
        ],
      },
    },
    {
      section_name: "social_links",
      is_visible: true,
      content: {
        instagram: "https://instagram.com/skilladiz",
        twitter: "https://twitter.com/skilladiz",
        youtube: "https://youtube.com/@skilladiz",
        discord: "https://discord.gg/skilladiz",
        facebook: "",
      },
    },
    {
      section_name: "contact",
      is_visible: true,
      content: {
        heading: "Find Us",
        address: "123 Arena Street, Gaming District",
        city: "Bangalore",
        country: "India",
        phone: "+91-9876543210",
        email: "hello@skilladiz.com",
        map_embed_url: "",
        open_hours: "Mon–Sun: 10:00 AM – 11:00 PM",
      },
    },
    {
      section_name: "footer",
      is_visible: true,
      content: {
        copyright_text: "© 2024 Skilladiz. All rights reserved.",
        links: [
          { label: "Terms & Conditions", url: "/terms-and-conditions" },
          { label: "Refund Policy", url: "/refund-policy" },
          { label: "Privacy Policy", url: "/privacy-policy" },
          { label: "Contact", url: "/contact" },
        ],
        newsletter_enabled: true,
        newsletter_placeholder: "Enter your email for updates",
      },
    },
    {
      section_name: "seo",
      is_visible: false,
      content: {
        meta_title: "Skilladiz — Book Gaming Slots & Join Tournaments",
        meta_description:
          "Reserve premium gaming stations and compete in live tournaments at Skilladiz, your ultimate gaming arena.",
        og_image_url: "/images/og-image.jpg",
        keywords: "gaming arena, book gaming slot, esports tournament, gaming centre",
      },
    },
  ];

  for (const section of sections) {
    await knex("cms_settings")
      .insert({
        ...section,
        content: JSON.stringify(section.content),
      })
      .onConflict("section_name")
      .merge({
        is_visible: section.is_visible,
        content: JSON.stringify(section.content),
      });
  }
};
