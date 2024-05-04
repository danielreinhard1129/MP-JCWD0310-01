import Link from "next/link";
import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaYoutube,
    FaGooglePlus,
    FaTiktok,
  } from "react-icons/fa";
  
  const Footer: React.FC = () => {
    return (
      <footer className="bg-gray-800 text-gray-300 py-8 mt-2 mb-0">
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
          {/* Social Media Icons */}
          <div className="flex space-x-4 mb-4 lg:mb-0">
            <a href="#" className="hover:text-gray-500">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-gray-500">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-gray-500">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-gray-500">
              <FaYoutube />
            </a>
            <a href="#" className="hover:text-gray-500">
              <FaGooglePlus />
            </a>
            <a href="#" className="hover:text-gray-500">
              <FaTiktok />
            </a>
          </div>
  
          <div className="mb-4 lg:mb-0">
            <p>&copy; 2024 EventOr. All rights reserved.</p>
          </div>
  
          {/* Menu Drawer */}
          <div className="flex space-x-4">
            <Link href="/" className="hover:text-gray-500">
              Home
            </Link>
            <Link href="about" className="hover:text-gray-500">
              About
            </Link>
            <Link href="/contact" className="hover:text-gray-500">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  