import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import logo from "../assets/vcart logo.png";

function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-[#e8fdfd] to-[#c6f3f3] text-gray-800">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Logo + About */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src={logo} alt="OneCart" className="w-10 h-10" />
            <span className="text-xl font-bold">OneCart</span>
          </div>
          <p className="text-sm leading-relaxed text-gray-600">
            OneCart is your all-in-one shopping destination. Get the best deals,
            quality products, and fast delivery—making your life easier every day.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li className="cursor-pointer hover:text-teal-600">Home</li>
            <li className="cursor-pointer hover:text-teal-600">About Us</li>
            <li className="cursor-pointer hover:text-teal-600">Delivery</li>
            <li className="cursor-pointer hover:text-teal-600">Privacy Policy</li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li className="cursor-pointer hover:text-teal-600">Help Center</li>
            <li className="cursor-pointer hover:text-teal-600">FAQs</li>
            <li className="cursor-pointer hover:text-teal-600">Returns</li>
            <li className="cursor-pointer hover:text-teal-600">Track Order</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
          <ul className="space-y-2 text-sm">
            <li>📞 +91-8218801328</li>
            <li>✉️ contact@onecart.com</li>
            <li>📞 +1-123-456-7890</li>
            <li>✉️ admin@onecart.com</li>
          </ul>

          {/* Social Icons */}
         <div className="flex gap-3 mt-4">
  <a 
    href="https://www.facebook.com/share/1Azm8LB9hU/ " 
    target="_blank" 
    rel="noopener noreferrer"
    className="p-2 rounded-full bg-teal-500 text-white hover:bg-teal-600"
  >
    <FaFacebookF />
  </a>
  
  <a 
    href="https://www.instagram.com/hemnt774?igsh=dWEwcjNncTY3MnEw" 
    target="_blank" 
    rel="noopener noreferrer"
    className="p-2 rounded-full bg-teal-500 text-white hover:bg-teal-600"
  >
    <FaInstagram />
  </a>
  
  <a 
    href="https://x.com/hemantmish90005?t=peffqOlL--cpjeCaGIopmw&s=09" 
    target="_blank" 
    rel="noopener noreferrer"
    className="p-2 rounded-full bg-teal-500 text-white hover:bg-teal-600"
  >
    <BsTwitterX />
  </a>
  
  
</div>

        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-300 py-4 text-center text-sm text-gray-600">
        © 2025 OneCart. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
