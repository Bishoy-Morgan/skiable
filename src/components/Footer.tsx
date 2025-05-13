import React from 'react';

const Footer = () => {
  return (
    <footer className="text-white  py-20">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Skiable. All rights reserved.</p>
        <div className="mt-4">
          <a href="#" className="text-sm text-gray-400 hover:text-white mx-2">Privacy Policy</a>
          <a href="#" className="text-sm text-gray-400 hover:text-white mx-2">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
