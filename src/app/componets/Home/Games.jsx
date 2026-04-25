import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { BellIcon, CalendarIcon, FileInputIcon, FileTextIcon, Gamepad2, GlobeIcon, Headset, Sparkles, TrophyIcon, Users } from "lucide-react";

// const features = [
//   {
//     Icon: FileTextIcon,
//     name: "Save your files",
//     description: "We automatically save your files as you type.",
//     href: "/",
//     cta: "Learn more",
//     background: <img className="absolute right-0 -top-20 opacity-70 object-cover" src = "/games/ps5.jpg"/>,
//     className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3  bg-black/90",
//   },
//   {
//     Icon: FileInputIcon,
//     name: "Full text search",
//     description: "Search through all your files in one place.",
//     href: "/",
//     cta: "Learn more",
//     background: <img className="absolute right-0 -top-20 opacity-70 object-cover" src = "/games/pool.jpg" />,
//     className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3  bg-black/90",
//   },
//   {
//     Icon: GlobeIcon,
//     name: "Multilingual",
//     description: "Supports 100+ languages and counting.",
//     href: "/",
//     cta: "Learn more",
//     background: <img className="absolute right-0 -top-20 opacity-70 object-cover aspect-[4.5/4]"  src = "/games/friends.jpg" />,
//     className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4  bg-black/90",
//   },
//   {
//     Icon: CalendarIcon,
//     name: "Calendar",
//     description: "Use the calendar to filter your files by date.",
//     href: "/",
//     cta: "Learn more",
//     background: <img className="absolute right-0 -top-20 opacity-70 object-contain"  src = "/games/room.jpg"/>,
//     className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2  bg-black/90",
//   },
//   {
//     Icon: BellIcon,
//     name: "Notifications",
//     description:
//       "Get notified when someone shares a file or mentions you in a comment.",
//     href: "/",
//     cta: "Learn more",
//     background: <img className="absolute right-0 -top-20 opacity-70 object-cover"   src = "/games/vr.jpg"/>,
//     className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4 bg-black/90",
//   },
// ];

const features = [
  {
    Icon: Gamepad2,
    name: "PS5 Gaming",
    description: "Latest PS5 titles in 4K with next-gen performance.",
    href: "/",
    cta: "Play Now",
    background: <img className="absolute right-0 top-0 opacity-70 object-contain" src = "/games/ps5.jpg"/>,
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3  bg-black/90",
  },
  {
    Icon: TrophyIcon,
    name: "8 Ball Pool",
    description: "Professional pool tables for competitive play.",
    href: "/",
    cta: "Challenge",
    background: <img className="absolute right-0 -top-20 opacity-70 object-cover" src = "/games/pool.jpg" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3  bg-black/90",
  },
  {
    Icon: Users,
    name: "Meet & Play",
    description: "Connect with gamers and have fun together.",
    href: "/",
    cta: "Join Us",
    background: <img className="absolute right-0 -top-20 opacity-70 object-cover aspect-[4.5/4]"  src = "/games/friends.jpg" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4  bg-black/90",
  },
  {
    Icon: Sparkles,
    name: "Premium Rooms",
    description: "Super atmospheric spaces for ultimate comfort.",
    href: "/",
    cta: "Explore",
    background: <img className="absolute right-0 -top-20 opacity-70 object-contain"  src = "/games/room.jpg"/>,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2  bg-black/90",
  },
  {
    Icon: Headset,
    name: "VR Gaming",
    description: "Immersive virtual reality experiences and adventures.",
    href: "/",
    cta: "Try VR",
    background: <img className="absolute right-0 -top-20 opacity-70 object-cover"   src = "/games/vr.jpg"/>,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4 bg-black/90",
  },
];

function Games() {
  return (
    <BentoGrid className="lg:grid-rows-3 max-w-[1500px] mx-auto min-h-screen">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  );
}

export { Games };