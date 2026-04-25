'use client';

import React from "react";
import Card from "./Card";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const cards = [
  {
    title: '8 ball / Snooker Lounge',
    text: 'Step into a classy arena with pro-grade tables, premium cues, and a chill vibe that makes every shot count.',
    image: '/card1.png',
    borderColor: 'pink'
  },
  {
    title: 'PS5 Arena',
    text: '4K 120 FPS visuals, and next-gen action. Whether it’s FIFA face-offs or adrenaline-packed missions, we’ve got your squad covered.',
    image: '/card2.png',
    borderColor: 'blue'
  },
  {
    title: 'VR Zone',
    text: 'Dive into parallel worlds with Meta Quest VR. Fully immersive, totally addictive, and unlike anything you’ve tried before.',
    image: '/card3.png',
    borderColor: 'green'
  }
];

const MainHighlightSection = () => (
  <section className="w-full px-4 sm:py-6 2xl:py-10 bg-transparent text-white">
    <div className="max-w-screen-2xl mx-auto flex flex-col xl:flex-row items-stretch xl:items-start gap-6 2xl:gap-10">
      {/* Left: Description & Animated Title */}
      <div className="flex flex-col justify-center text-center xl:text-left w-full max-w-lg 2xl:max-w-2xl sm:p-6 mx-auto space-y-6 xl:space-y-8">
        <div className="h-[70px] sm:h-[90px] 2xl:h-[140px] flex items-center justify-center">
          <GooeyText
            texts={["Game hard", "Chill harder", "At Skilladiz"]}
            morphTime={2}
            cooldownTime={3}
            className="font-bold text-white w-full text-2xl sm:text-3xl 2xl:text-4xl  font-jura"
          />
        </div>
        <div className="text-gray-300 text-base md:text-base 2xl:text-xl space-y-2">
          <p className="text-center">
            Welcome to Skilladiz Gaming Club – the ultimate hangout spot for gamers, friends and fun-seekers alike!
            Our club was built with one goal in mind: to create a premium & vibrant, welcoming space where gaming lovers of all kinds can come together, compete, relax, and connect.
          </p>
        </div>
        <div className="text-muted-foreground text-base 2xl:text-lg">
          <p className="text-center">
            Whether you're here to challenge your squad or just unwind after a long day, we've got you covered.
          </p>
        </div>
      </div>

      {/* Right: Cards / Carousel */}
      <div className="w-full max-w-4xl mx-auto">
        {/* Desktop: Grid layout */}
        <div className="hidden sm:grid grid-cols-1 md:grid-cols-3 gap-10">
          {cards.map((card, idx) => (
            <Card
              key={idx}
              title={card.title}
              text={card.text}
              image={card.image}
              borderColor={card.borderColor}
            />
          ))}
        </div>

        {/* Mobile: Carousel layout */}
        <div className="sm:hidden block mx-auto">
          <Carousel className={"mx-auto"}>
            <CarouselContent className="sm:flex sm:gap-4 mx-auto">
              {cards.map((card, idx) => (
                <CarouselItem key={idx} className="min-w-full px-8 py-2 flex justify-center mx-auto">
                  <Card
                    title={card.title}
                    text={card.text}
                    image={card.image}
                    borderColor={card.borderColor}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        
      </div>
      
    </div>
    <p className="sm:mt-8 p-4 text-sm md:text-base lg:text-lg font-medium text-green-500 text-center max-w-3xl mx-auto">
          Dive into the world of 8-ball pool, snooker, VR adventures, PlayStation battles, and more — all under one stylish, high-tech roof.
        </p>
  </section>
);

export default MainHighlightSection;
