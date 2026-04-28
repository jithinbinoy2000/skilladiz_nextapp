// app/componets/Footer/Footer.jsx
'use client';

import React from 'react';
import Link from 'next/link';
// import { GlowCard } from '../ui/GlowCard';
import { 
  Instagram, 
  Facebook, 
  MessageCircle, 
  Youtube, 
  Twitter,
  Gamepad2,
  Users,
  Target,
  HelpCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Trophy,
  Calendar,
  Star,
  BookOpen
} from 'lucide-react';
import { GlowCard } from '@/app/componets/ui/GlowCard';

const data = {
  socialLinks: {
    facebook: 'https://facebook.com/skilladiz',
    instagram: 'https://instagram.com/skilladiz',
    whatsapp: 'https://wa.me/1234567890',
    youtube: 'https://youtube.com/skilladiz',
    discord: 'https://discord.gg/skilladiz',
    twitter: 'https://twitter.com/skilladiz'
  },
  gaming: {
    membership: '/membership',
    tournaments: '/tournaments',
    booking: '/booking',
    reviews: '/reviews',
  },
  about: {
    story: '/about',
    team: '/about#team',
    careers: '/careers',
    events: '/events',
  },
  support: {
    faqs: '/faqs',
    contact: '/contact',
    livechat: '/live-chat',
    support: '/support',
  },
  contact: {
    email: 'hello@skilladiz.com',
    phone: '+1 (555) 123-GAME',
    address: '123 Gaming Street, Tech District',
    hours: 'Open 24/7 for Premium Members',
  },
  company: {
    name: 'Skilladiz Gaming Club',
    description: 'The ultimate gaming destination where premium technology meets community spirit. Game hard, chill harder.',
    logo: '/logo.png',
  },
};

const socialLinks = [
  { 
    icon: Instagram, 
    label: 'Instagram', 
    href: data.socialLinks.instagram,
    color: 'purple',
    hoverColor: 'hover:text-purple-300'
  },
  { 
    icon: Facebook, 
    label: 'Facebook', 
    href: data.socialLinks.facebook,
    color: 'blue',
    hoverColor: 'hover:text-blue-300' 
  },
  { 
    icon: MessageCircle, 
    label: 'WhatsApp', 
    href: data.socialLinks.whatsapp,
    color: 'green',
    hoverColor: 'hover:text-green-300'
  },
  { 
    icon: Youtube, 
    label: 'YouTube', 
    href: data.socialLinks.youtube,
    color: 'red',
    hoverColor: 'hover:text-red-300'
  },
  { 
    icon: Twitter, 
    label: 'Twitter/X', 
    href: data.socialLinks.twitter,
    color: 'blue',
    hoverColor: 'hover:text-cyan-300'
  },
];

const gamingLinks = [
  { text: 'Premium Membership', href: data.gaming.membership, icon: Trophy },
  { text: 'Tournaments & Events', href: data.gaming.tournaments, icon: Calendar },
  { text: 'Book Gaming Session', href: data.gaming.booking, icon: Gamepad2 },
  { text: 'Community Reviews', href: data.gaming.reviews, icon: Star },
];

const aboutLinks = [
  { text: 'Our Story', href: data.about.story, icon: BookOpen },
  { text: 'Meet the Team', href: data.about.team, icon: Users },
  { text: 'Join Our Crew', href: data.about.careers, icon: Target },
  { text: 'Gaming Events', href: data.about.events, icon: Calendar },
];

const supportLinks = [
  { text: 'Help Center', href: data.support.faqs, icon: HelpCircle },
  { text: 'Contact Support', href: data.support.contact, icon: Phone },
  { text: 'Live Chat', href: data.support.livechat, icon: MessageCircle, hasIndicator: true },
  { text: 'Technical Support', href: data.support.support, icon: Target },
];

const contactInfo = [
  { 
    icon: Mail, 
    text: data.contact.email, 
    href: `mailto:${data.contact.email}`,
    color: 'text-blue-400',
    hoverColor: 'hover:text-blue-300'
  },
  { 
    icon: Phone, 
    text: data.contact.phone, 
    href: `tel:${data.contact.phone.replace(/[^\d+]/g, '')}`,
    color: 'text-green-400',
    hoverColor: 'hover:text-green-300'
  },
  { 
    icon: MapPin, 
    text: data.contact.address, 
    isAddress: true,
    color: 'text-purple-400',
    hoverColor: 'hover:text-purple-300'
  },
  { 
    icon: Clock, 
    text: data.contact.hours, 
    isHours: true,
    color: 'text-orange-400',
    hoverColor: 'hover:text-orange-300'
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-gray-800 mt-16">
      {/* Gaming Stats Bar */}
      {/* <div className="border-b border-gray-800 bg-gray-900/30 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <GlowCard 
              glowColor="purple" 
              className="p-4 group cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out" 
              height="100px"
            >
              <div className="text-2xl font-bold text-purple-400 group-hover:text-purple-300 transition-colors duration-300">500+</div>
              <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Active Gamers</div>
            </GlowCard>
            
            <GlowCard 
              glowColor="blue" 
              className="p-4 group cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out" 
              height="100px"
            >
              <div className="text-2xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors duration-300">50+</div>
              <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Gaming Stations</div>
            </GlowCard>
            
            <GlowCard 
              glowColor="green" 
              className="p-4 group cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out" 
              height="100px"
            >
              <div className="text-2xl font-bold text-green-400 group-hover:text-green-300 transition-colors duration-300">100+</div>
              <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Games Available</div>
            </GlowCard>
            
            <GlowCard 
              glowColor="red" 
              className="p-4 group cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out" 
              height="100px"
            >
              <div className="text-2xl font-bold text-red-400 group-hover:text-red-300 transition-colors duration-300">24/7</div>
              <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Always Open</div>
            </GlowCard>
          </div>
        </div>
      </div> */}

      {/* Main Footer Content */}
      <div className="mx-auto max-w-[1500px] px-6 pt-16 pb-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex justify-center items-center gap-3 sm:justify-start mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                {data.company.name}
              </span>
            </div>

            <p className="text-gray-400 mt-6 max-w-md text-center leading-relaxed sm:max-w-xs sm:text-left mb-8">
              {data.company.description}
            </p>

            {/* Social Media Icons */}
            <div className="flex justify-center gap-4 sm:justify-start mb-6">
              {socialLinks.map(({ icon: IconComponent, label, href, color, hoverColor }) => (
                <Link key={label} href={href} className="group">
                  {/* <GlowCard 
                    glowColor={color} 
                    className="p-3 cursor-pointer group-hover:scale-110 transition-all duration-300 ease-in-out hover:shadow-2xl"
                    width="60px"
                    height="60px"
                  > */}
                    <IconComponent 
                      className={`w-8 h-8 mx-auto text-gray-300 group-hover:text-white transition-all duration-300 ease-in-out ${hoverColor}`}
                    />
                  {/* </GlowCard> */}
                </Link>
              ))}
            </div>

            {/* Additional Gaming Platforms */}
            <div className="flex justify-center gap-4 sm:justify-start">
              <Link href={data.socialLinks.discord} className="group">
                {/* <GlowCard 
                  glowColor="purple" 
                  className="p-2 cursor-pointer group-hover:scale-110 transition-all duration-300 ease-in-out" 
                  width="50px" 
                  height="50px"
                > */}
                  <MessageCircle className="w-6 h-6 mx-auto text-gray-300 group-hover:text-purple-300 transition-colors duration-300" />
                {/* </GlowCard> */}
              </Link>
              <div className="group cursor-pointer">
                {/* <GlowCard 
                  glowColor="purple" 
                  className="p-2 group-hover:scale-110 transition-all duration-300 ease-in-out" 
                  width="50px" 
                  height="50px"
                > */}
                  <Gamepad2 className="w-6 h-6 mx-auto text-gray-300 group-hover:text-purple-300 transition-colors duration-300" />
                {/* </GlowCard> */}
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
            {/* Gaming Services */}
            <div className="text-center sm:text-left">
              <h4 className="text-lg font-bold text-white mb-6 flex items-center justify-center sm:justify-start gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                <span>Gaming Hub</span>
              </h4>
              <ul className="space-y-4">
                {gamingLinks.map(({ text, href, icon: IconComponent }) => (
                  <li key={text}>
                    <Link 
                      href={href} 
                      className="group flex items-center justify-center sm:justify-start gap-2 text-gray-400 hover:text-purple-400 transition-all duration-300 ease-in-out text-sm hover:translate-x-2 transform"
                    >
                      <IconComponent className="w-4 h-4 text-gray-500 group-hover:text-purple-400 transition-colors duration-300" />
                      <span>{text}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* About Us */}
            <div className="text-center sm:text-left">
              <h4 className="text-lg font-bold text-white mb-6 flex items-center justify-center sm:justify-start gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                <span>About Us</span>
              </h4>
              <ul className="space-y-4">
                {aboutLinks.map(({ text, href, icon: IconComponent }) => (
                  <li key={text}>
                    <Link 
                      href={href} 
                      className="group flex items-center justify-center sm:justify-start gap-2 text-gray-400 hover:text-blue-400 transition-all duration-300 ease-in-out text-sm hover:translate-x-2 transform"
                    >
                      <IconComponent className="w-4 h-4 text-gray-500 group-hover:text-blue-400 transition-colors duration-300" />
                      <span>{text}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="text-center sm:text-left">
              <h4 className="text-lg font-bold text-white mb-6 flex items-center justify-center sm:justify-start gap-2">
                <HelpCircle className="w-5 h-5 text-green-400" />
                <span>Support</span>
              </h4>
              <ul className="space-y-4">
                {supportLinks.map(({ text, href, icon: IconComponent, hasIndicator }) => (
                  <li key={text}>
                    <Link
                      href={href}
                      className="group flex items-center justify-center sm:justify-start gap-2 text-gray-400 hover:text-green-400 transition-all duration-300 ease-in-out text-sm hover:translate-x-2 transform"
                    >
                      <IconComponent className="w-4 h-4 text-gray-500 group-hover:text-green-400 transition-colors duration-300" />
                      <span>{text}</span>
                      {hasIndicator && (
                        <span className="relative flex h-2 w-2 ml-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="text-center sm:text-left">
              <h4 className="text-lg font-bold text-white mb-6 flex items-center justify-center sm:justify-start gap-2">
                <Phone className="w-5 h-5 text-red-400" />
                <span>Contact</span>
              </h4>
              <ul className="space-y-4">
                {contactInfo.map(({ icon: IconComponent, text, href, isAddress, isHours, color, hoverColor }) => (
                  <li key={text}>
                    {href ? (
                      <a
                        href={href}
                        className={`group flex items-center justify-center sm:justify-start gap-3 text-gray-400 transition-all duration-300 ease-in-out text-sm hover:translate-x-1 transform ${hoverColor}`}
                      >
                        <IconComponent className={`w-4 h-4 ${color} group-hover:scale-110 transition-transform duration-300`} />
                        <span className="flex-1">{text}</span>
                      </a>
                    ) : (
                      <div className="flex items-center justify-center sm:justify-start gap-3 text-gray-400 text-sm">
                        <IconComponent className={`w-4 h-4 ${color}`} />
                        {isAddress ? (
                          <address className="flex-1 not-italic">{text}</address>
                        ) : (
                          <span className="flex-1">{text}</span>
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 text-gray-400 text-sm">
              <span>© 2025 {data.company.name}. All rights reserved.</span>
              <span className="hidden md:block text-gray-600">|</span>
              <span className="flex items-center gap-2">
                Powered by gaming passion 
                <Gamepad2 className="w-4 h-4 text-purple-400" />
              </span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link 
                href="/privacy" 
                className="text-gray-400 hover:text-purple-400 transition-all duration-300 hover:underline"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-gray-400 hover:text-purple-400 transition-all duration-300 hover:underline"
              >
                Terms of Service
              </Link>
              <Link 
                href="/booking" 
                className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg font-bold hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out flex items-center gap-2"
              >
                <Gamepad2 className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                Book Now
              </Link>
            </div>
          </div>
          
          {/* Gaming Quote */}
          <div className="mt-6 text-center">
            <p className="text-gray-500 italic text-sm flex items-center justify-center gap-2">
              "Level up your gaming experience. Game hard, chill harder. Only at Skilladiz." 
              <Trophy className="w-4 h-4 text-yellow-500" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
