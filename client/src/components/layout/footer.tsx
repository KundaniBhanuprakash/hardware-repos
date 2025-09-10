import { Link } from "wouter";
import { Facebook, Twitter, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-bold text-blue-400 mb-4">DELL</div>
            <p className="text-gray-300 mb-4">
              Leading technology solutions provider, delivering innovative laptops and computing devices worldwide.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                data-testid="link-facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                data-testid="link-twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                data-testid="link-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                data-testid="link-youtube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/premium" data-testid="link-footer-xps">
                  <span className="text-gray-300 hover:text-blue-400 transition-colors duration-200 cursor-pointer">
                    XPS Laptops
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/category/everyday" data-testid="link-footer-inspiron">
                  <span className="text-gray-300 hover:text-blue-400 transition-colors duration-200 cursor-pointer">
                    Inspiron Series
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/category/gaming" data-testid="link-footer-gaming">
                  <span className="text-gray-300 hover:text-blue-400 transition-colors duration-200 cursor-pointer">
                    Gaming Laptops
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/category/business" data-testid="link-footer-business">
                  <span className="text-gray-300 hover:text-blue-400 transition-colors duration-200 cursor-pointer">
                    Business Laptops
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/category/workstation" data-testid="link-footer-workstations">
                  <span className="text-gray-300 hover:text-blue-400 transition-colors duration-200 cursor-pointer">
                    Workstations
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200" data-testid="link-customer-support">
                  Customer Support
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200" data-testid="link-technical-support">
                  Technical Support
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200" data-testid="link-warranty">
                  Warranty Information
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200" data-testid="link-drivers">
                  Driver Downloads
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200" data-testid="link-manuals">
                  User Manuals
                </a>
              </li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200" data-testid="link-about">
                  About Dell
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200" data-testid="link-careers">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200" data-testid="link-investors">
                  Investor Relations
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200" data-testid="link-press">
                  Press Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200" data-testid="link-environment">
                  Environmental Impact
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">© 2024 Dell Technologies Inc. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-300 hover:text-blue-400 text-sm transition-colors duration-200" data-testid="link-privacy">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 text-sm transition-colors duration-200" data-testid="link-terms">
                Terms of Service
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 text-sm transition-colors duration-200" data-testid="link-cookies">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
