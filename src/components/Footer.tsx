import React from 'react';

const Footer = () => {
  return (
    <footer className="w-[90%] 2xl:w-4/5 mx-auto flex items-center justify-end text-[#FDC830] pt-32 pb-8 border-t border-[#FDC830]/5">
      <div className="w-full flex flex-col items-center justify-center text-center">
        <p>&copy; {new Date().getFullYear()} Skiable. All rights reserved.</p>
        <div className="mt-4">
          <a href="#" className="text-sm text-[#f5ffff] hover:text-[#FDC830] mx-2">Privacy Policy</a>
          <a href="#" className="text-sm text-[#f5ffff] hover:text-[#FDC830] mx-2">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
