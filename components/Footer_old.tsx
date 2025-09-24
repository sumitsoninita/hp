
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-hp-light-gray border-t">
      <div className="container mx-auto px-6 py-8 text-center text-hp-gray">
        <p>&copy; {new Date().getFullYear()} HP Development Company, L.P. Fund for Future Initiative.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="hover:text-hp-blue">Privacy Policy</a>
          <a href="#" className="hover:text-hp-blue">Terms of Use</a>
          <a href="#" className="hover:text-hp-blue">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};
