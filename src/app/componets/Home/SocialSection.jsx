'use client'
import React from 'react';
import InstagramIcon from '../Icons/InstagramIcon';
import WhatsAppIcon from '../Icons/WhatsAppIcon';
import FacebookIcon from '../Icons/FacebookIcon';
import YouTubeIcon from '../Icons/YouTubeIcon';

const SocialSection = () => {
  // Helper to navigate to apps if installed, fallback to web
  const handleRedirect = (appUrl, webUrl) => {
    window.location.href = appUrl;

    // Fallback (delay is optional; modern browsers often override this anyway)
    setTimeout(() => {
      window.location.href = webUrl;
    }, 1000);
  };

  return (
    <section className="flex flex-col items-center justify-center text-center py-2 px-4">
      <p className="text-white text-xs md:text-sm mb-2 font-bold">
        JOIN US ON SOCIALS AND CATCH ALL THE ACTIONS!
      </p>
      <div className="flex gap-1 sm:gap-6 flex-wrap justify-center items-center">
        <button onClick={() => handleRedirect('instagram://user?username=yourusername', 'https://instagram.com/yourusername')}>
          <InstagramIcon  className="w-16 h-16 2xl:w-20 2xl:h-20 flex justify-center items-center" />
        </button>
        <button onClick={() => handleRedirect('whatsapp://send?phone=1234567890', 'https://wa.me/1234567890')}>
          <WhatsAppIcon  className="w-16 h-16 2xl:w-20 2xl:h-20 flex justify-center items-center" />
           {/* <InstagramIcon size={60} /> */}
        </button>
        <button onClick={() => handleRedirect('fb://page/yourpageid', 'https://facebook.com/yourpage')}>
          <FacebookIcon className="w-16 h-16 2xl:w-20 2xl:h-20 flex justify-center items-center" />
           {/* <InstagramIcon size={60} /> */}
        </button>
        <button onClick={() => handleRedirect('vnd.youtube://channel/yourchannelid', 'https://youtube.com/channel/yourchannelid')}>
          <YouTubeIcon  className="w-16 h-16 2xl:w-20 2xl:h-20 flex justify-center items-center" />
           {/* <InstagramIcon size={60} /> */}
        </button>
      </div>
    </section>
  );
};

export default SocialSection;
