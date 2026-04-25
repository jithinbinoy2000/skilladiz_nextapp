// 'use client';

// import React, { useState } from 'react';
// import { GlowCard } from '../ui/GlowCard';
// import { Games } from './Games';
// import { DotPattern } from '@/components/ui/dot-pattern';

// const membershipPlans = [
//   {
//     id: 'silver',
//     name: 'SILVER',
//     price: '₹999',
//     period: '',
//     description: 'Perfect for casual players',
//     features: [
//       '10% OFF on every play slot booking',
//       'Earn 10 Skill Streaks per play slot booking',
//       'Validity: 1 Month',
//     ],
//     popular: false,
//     color: 'blue',
//   },
//   {
//     id: 'gold',
//     name: 'GOLD',
//     price: '₹2499',
//     period: '',
//     description: 'For regular Skilladix members',
//     features: [
//       '12% OFF on every play slot booking',
//       'Earn 15 Skill Streaks per play slot booking',
//       'Free Entry to Monthly Tournaments',
//       'Validity: 3 Months',
//     ],
//     popular: true,
//     color: 'purple',
//   },
//   {
//     id: 'platinum',
//     name: 'PLATINUM',
//     price: '₹7999',
//     period: '',
//     description: 'The ultimate Skilladix experience',
//     features: [
//       '12% OFF on every play slot booking',
//       'Earn 15 Skill Streaks per play slot booking',
//       'Free Skilladix Merchandise',
//       'Birthday Offer: 1 Hour Free Play',
//       'Validity: 1 Year',
//     ],
//     popular: false,
//     color: 'green',
//   },
// ];


// const faqs = [
//   {
//     question: 'Can I upgrade or downgrade my membership?',
//     answer:
//       'Yes, you can change your membership plan at any time. Changes take effect at the beginning of your next billing cycle.',
//   },
//   {
//     question: 'Is there a contract or commitment?',
//     answer:
//       'No, all memberships are month-to-month with no long-term commitment. You can cancel anytime.',
//   },
//   {
//     question: 'What happens if I exceed my hours on the Basic plan?',
//     answer:
//       'You can purchase additional hours at Rs 5/hour or upgrade to Premium for unlimited access.',
//   },
//   {
//     question: 'Do you offer student discounts?',
//     answer: 'Yes! Students get 20% off any membership plan with valid student ID.',
//   },
// ];

// function FAQAccordion() {
//   const [openIndex, setOpenIndex] = useState(null);

//   const toggleIndex = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <div className="space-y-4">
//       {faqs.map(({ question, answer }, idx) => {
//         const isOpen = idx === openIndex;

//         return (
//           <GlowCard key={idx} glowColor="blue" className="p-6 rounded-xl shadow-md">
//             <button
//               onClick={() => toggleIndex(idx)}
//               aria-expanded={isOpen}
//               aria-controls={`faq-panel-${idx}`}
//               id={`faq-button-${idx}`}
//               className="w-full text-left flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
//             >
//               <span className="text-lg font-bold text-white">{question}</span>
//               <svg
//                 className={`w-6 h-6 text-white transition-transform duration-200 ${
//                   isOpen ? 'rotate-180' : ''
//                 }`}
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//               </svg>
//             </button>
//             <div
//               id={`faq-panel-${idx}`}
//               role="region"
//               aria-labelledby={`faq-button-${idx}`}
//               className={`mt-3 overflow-hidden transition-max-height duration-300 ease-in-out ${
//                 isOpen ? 'max-h-96' : 'max-h-0'
//               }`}
//             >
//               <p className="text-gray-300 text-base">{answer}</p>
//             </div>
//           </GlowCard>
//         );
//       })}
//     </div>
//   );
// }

// const MembershipPlan = () => {
//   const [selectedPlan, setSelectedPlan] = useState('premium');

//   return (
//     <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
//       <DotPattern className="text-white/10 absolute inset-0 pointer-events-none opacity-30" />

//       {/* Hero Section */}
//       <section className="max-w-[1500px] mx-auto py-10 px-4 text-center  relative z-10">
//         <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
//           Membership Plans
//         </h1>
//         <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto ">
//           Choose the perfect plan for your gaming journey and unlock exclusive benefits
//         </p>
//       </section>

//       {/* Pricing Plans */}
//       <section className="max-w-[1500px] mx-auto py-16 px-4 relative z-10">
//         <div className="flex items-center justify-center flex-wrap gap-8">
//           {/* grid grid-cols-1 md:grid-cols-3 */}
//           {membershipPlans.map((plan) => (
//             <div key={plan.id} className="relative">
//               {plan.popular && (
//                 <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
//                   <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap shadow-lg">
//                     Most Popular
//                   </span>
//                 </div>
//               )}
//               <GlowCard
//                 glowColor={plan.color}
//                 className={`p-8 h-full flex flex-col justify-center rounded-xl shadow-lg transition-transform duration-300 min-w-[300px] max-w-[400px] aspect-[3/5] ${
//                   plan.popular ? 'scale-105' : ''
//                 }`}
//               >
//                 <div>
//                   <div className="text-center mb-6">
//                     <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
//                     <p className="text-gray-400 mb-4">{plan.description}</p>
//                     <div className="flex items-baseline justify-center space-x-2">
//                       <span className="text-4xl font-extrabold text-white">{plan.price}</span>
//                       <span className="text-gray-400">{plan.period}</span>
//                     </div>
//                   </div>
//                   <ul className="space-y-3 text-gray-300 mb-8">
//                     {plan.features.map((feature, idx) => (
//                       <li key={idx} className="flex items-center">
//                         <span className="text-green-400 mr-3 select-none">✓</span>
//                         {feature}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 <button
//                   className={`w-full py-3 rounded-lg font-bold transition-all duration-300 ${
//                     selectedPlan === plan.id
//                       ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white cursor-default'
//                       : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
//                   }`}
//                   onClick={() => setSelectedPlan(plan.id)}
//                   disabled={selectedPlan === plan.id}
//                   aria-pressed={selectedPlan === plan.id}
//                 >
//                   {selectedPlan === plan.id ? 'Selected' : 'Choose Plan'}
//                 </button>
//               </GlowCard>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Games and FAQ */}
//       {/* <div className="max-w-[1500px] mx-auto px-4 py-16 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8">
//         Games Section
//         <div className="md:col-span-8">
//           <Games />
//         </div>

//         FAQ Section
//         <section className="md:col-span-4">
//           <h2 className="text-2xl font-bold text-center mb-12">Frequently Asked Questions</h2>
//           <FAQAccordion />
//         </section>
//       </div> */}

//       {/* CTA Section */}
//       {/* <section className="py-16 px-4 relative z-10">
//         <div className="max-w-4xl mx-auto text-center">
//           <GlowCard glowColor="purple" className="p-8 rounded-xl shadow-lg">
//             <h2 className="text-3xl font-bold text-white mb-4">Ready to Level Up?</h2>
//             <p className="text-gray-300 mb-6">
//               Join thousands of gamers who have made Skilladiz their gaming home
//             </p>
//             <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-bold hover:scale-105 active:scale-95 transition-transform duration-300">
//               Start Your Membership
//             </button>
//           </GlowCard>
//         </div>
//       </section> */}
//     </div>
//   );
// };

// export default MembershipPlan;
'use client';

import React, { useState } from 'react';
import { GlowCard } from '../ui/GlowCard';
import { Games } from './Games';
import { DotPattern } from '@/components/ui/dot-pattern';
import { GridPattern } from '@/components/ui/grid-pattern';

const membershipPlans = [
  {
    id: 'silver',
    name: 'SILVER',
    price: '₹999',
    period: '',
    description: 'Perfect for casual players',
    features: [
      '10% OFF on every play slot booking',
      'Earn 10 Skill Streaks per play slot booking',
      'Validity: 1 Month',
    ],
    popular: false,
    color: 'blue',
    videoUrl: '/membership/5.mp4', // Replace with your video URL
  },
  {
    id: 'gold',
    name: 'GOLD',
    price: '₹2499',
    period: '',
    description: 'For regular Skilladix members',
    features: [
      '12% OFF on every play slot booking',
      'Earn 15 Skill Streaks per play slot booking',
      'Free Entry to Monthly Tournaments',
      'Validity: 3 Months',
    ],
    popular: true,
    color: 'purple',
    videoUrl: '/membership/6.mp4', // Replace with your video URL
  },
  {
    id: 'platinum',
    name: 'PLATINUM',
    price: '₹7999',
    period: '',
    description: 'The ultimate Skilladix experience',
    features: [
      '12% OFF on every play slot booking',
      'Earn 15 Skill Streaks per play slot booking',
      'Free Skilladix Merchandise',
      'Birthday Offer: 1 Hour Free Play',
      'Validity: 1 Year',
    ],
    popular: false,
    color: 'green',
    videoUrl: '/membership/5.mp4', // Replace with your video URL
  },
];

const faqs = [
  {
    question: 'Can I upgrade or downgrade my membership?',
    answer:
      'Yes, you can change your membership plan at any time. Changes take effect at the beginning of your next billing cycle.',
  },
  {
    question: 'Is there a contract or commitment?',
    answer:
      'No, all memberships are month-to-month with no long-term commitment. You can cancel anytime.',
  },
  {
    question: 'What happens if I exceed my hours on the Basic plan?',
    answer:
      'You can purchase additional hours at Rs 5/hour or upgrade to Premium for unlimited access.',
  },
  {
    question: 'Do you offer student discounts?',
    answer: 'Yes! Students get 20% off any membership plan with valid student ID.',
  },
];

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map(({ question, answer }, idx) => {
        const isOpen = idx === openIndex;

        return (
          <div key={idx} glowColor="blue" className="p-6 rounded-xl shadow-md">
            <button
              onClick={() => toggleIndex(idx)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${idx}`}
              id={`faq-button-${idx}`}
              className="w-full text-left flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <span className="text-lg font-bold text-white">{question}</span>
              <svg
                className={`w-6 h-6 text-white transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              id={`faq-panel-${idx}`}
              role="region"
              aria-labelledby={`faq-button-${idx}`}
              className={`mt-3 overflow-hidden transition-max-height duration-300 ease-in-out ${
                isOpen ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <p className="text-gray-300 text-base">{answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const MembershipPlan = () => {
  const [selectedPlan, setSelectedPlan] = useState('gold');

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <DotPattern className="text-white/10 absolute inset-0 pointer-events-none opacity-30" />

      {/* Hero Section */}
      <section className="max-w-[1500px] mx-auto py-10 px-4 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
          Membership Plans
        </h1>
        <p className="text-xl 2xl:text-2xl text-gray-300 max-w-3xl mx-auto ">
          Choose the perfect plan for your gaming journey and unlock exclusive benefits
        </p>
      </section>

      {/* Pricing Plans */}
      <section className="max-w-[1500px] mx-auto py-16 px-4 relative z-10">
        <div className="flex items-center justify-center flex-wrap lg:flex-nowrap gap-8">
          {membershipPlans.map((plan) => (
            <div key={plan.id} className="relative">
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Card container with group for hover */}
              <div className="relative max-w-[350px] 2xl:min-w-[300px] 2xl:max-w-[400px] aspect-[3/5] rounded-3xl overflow-hidden shadow-xl shadow-muted-foreground/5 group">
                <GridPattern  className={"text-white opacity-100"}/>
                {/* Background video */}
                <video
                  className="absolute inset-0 w-full h-full object-cover opacity-60 transition-opacity duration-300 group-hover:opacity-90 p-1 rounded-3xl"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                >
                  <source src={plan.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Dark mask with subtle hover effect */}
                <div
                  className="pointer-events-none absolute inset-0 bg-black/80 transition-colors duration-300 group-hover:bg-black/[0.7]"
                />

                {/* GlowCard overlay hidden on mobile */}
                <div className="absolute inset-0">
                  <div className="hidden sm:block w-full h-full">
                    <GlowCard
                      glowColor={plan.color}
                      className="w-full h-full rounded-xl backdrop-blur-none z-[1] bg-black"
                      style={{ pointerEvents: 'none', position: 'absolute', inset: 0 }}
                    />
                  </div>
                </div>

                {/* Card Content */}
                <div className="relative z-10 p-8 h-full flex flex-col justify-center">
                  <div className="text-center mb-6">
                    <h3 className=" text-lg 2xl:text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className=" text-sm 2xl:text-base text-gray-400 mb-4">{plan.description}</p>
                    <div className="flex items-baseline justify-center space-x-2">
                      <span className="text-3xl 2xl:text-4xl font-extrabold text-white">{plan.price}</span>
                      <span className="text-gray-400">{plan.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-3 text-gray-300 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm 2xl:text-base">
                        <span className="text-green-400 mr-3 select-none">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-3 rounded-lg font-bold transition-all duration-300 text-sm 2xl:text-base ${
                      selectedPlan === plan.id
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white cursor-default'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-700'
                    }`}
                    onClick={() => setSelectedPlan(plan.id)}
                    disabled={selectedPlan === plan.id}
                    aria-pressed={selectedPlan === plan.id}
                  >
                    {selectedPlan === plan.id ? 'Selected' : 'Choose Plan'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Games and FAQ */}
      {/* <div className="max-w-[1500px] mx-auto px-4 py-16 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8">
        Games Section
        <div className="md:col-span-8">
          <Games />
        </div>

        FAQ Section
        <section className="md:col-span-4">
          <h2 className="text-2xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <FAQAccordion />
        </section>
      </div> */}

      {/* CTA Section */}
      {/* <section className="py-16 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <GlowCard glowColor="purple" className="p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Level Up?</h2>
            <p className="text-gray-300 mb-6">
              Join thousands of gamers who have made Skilladiz their gaming home
            </p>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-bold hover:scale-105 active:scale-95 transition-transform duration-300">
              Start Your Membership
            </button>
          </GlowCard>
        </div>
      </section> */}
    </div>
  );
};

export default MembershipPlan;
