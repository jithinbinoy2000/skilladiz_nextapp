import Image from "next/image";
import SocialSection from "./componets/Home/SocialSection";
import MainHighlightSection from "./componets/Home/MainHighlightSection";
import Footer4Col from "@/components/footer-column";
import { ShuffleHero } from "@/components/shuffle-grid";
import OurVision from "./componets/Home/OurVision";
import Tournaments from "./componets/Home/Tournaments";
import MembershipPlan from "./componets/Home/MembershipPlan";
import AboutPage from "./componets/Home/About";
import { Games } from "./componets/Home/Games";
// import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";


const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Sarah Chen",
      designation: "Product Manager at TechFlow",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Michael Rodriguez",
      designation: "CTO at InnovateSphere",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Emily Watson",
      designation: "Operations Director at CloudScale",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "James Kim",
      designation: "Engineering Lead at DataPro",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Lisa Thompson",
      designation: "VP of Technology at FutureNet",
      src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden -mt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/background.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-40 saturate-200 brightness-90  w-full max-h-[80vh]"
          quality={100}
          priority
        />
        {/* <div className="absolute inset-10 bg-black bg-opacity-60 text-white" /> */}
      </div>

      {/* Page Content */}
     <div className="relative z-10 px-2 sm:px-10 py-4 sm:py-24 min-h-screen">
       <div className="min-h-screen mx-auto my-auto">
          <div className="pt-10 sm:pt-0 py-0 2xl:py-5 2xl:mt-6"><SocialSection/></div>
          <MainHighlightSection/>
       </div>
       {/* <Games/> */}
       <OurVision/>
        <div>
          <ShuffleHero/>
          {/* <Tournaments/> */}
          <MembershipPlan/>
          <AboutPage/>
          <Footer4Col/>
          </div>
     </div>
    </div>
  );
}
