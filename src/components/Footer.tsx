
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                SS
              </div>
              <span className="text-lg font-bold">SkillSwap</span>
            </Link>
            <p className="mt-4 text-gray-400">
              A platform for exchanging skills and knowledge, connecting people who want to learn with those who want to teach.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Platform</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/skills" className="text-gray-400 hover:text-white">
                  Browse Skills
                </Link>
              </li>
              <li>
                <Link to="/requests" className="text-gray-400 hover:text-white">
                  Requests
                </Link>
              </li>
              <li>
                <Link to="/messages" className="text-gray-400 hover:text-white">
                  Messages
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-400 hover:text-white">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/help" className="text-gray-400 hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-gray-400 hover:text-white">
                  Guides
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-400 hover:text-white">
                  Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-400 hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} SkillSwap. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <a
              href="mailto:contact@skillswap.com"
              className="inline-flex items-center text-gray-400 hover:text-white"
            >
              <Mail className="h-5 w-5 mr-2" />
              <span>contact@skillswap.com</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
