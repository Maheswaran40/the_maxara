import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div id="footer" className="bg-[var(--primary)]">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between gap-y-10 py-10">
            {/* Brand */}
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-[18%]">
              <h1 className="text-3xl font-bold mb-4 text-[var(--primary-dark)]">Maxara</h1>

              <h4 className="font-semibold mb-2">The Greatest Market...</h4>

              <p className="text-sm leading-6 text-gray-600">
                Whether you're a trendsetter, a minimalist, or an adventurer at
                heart, Maxara has something for everyone. Our diverse range of
                styles caters to various personas.
              </p>
            </div>

            {/* About Us */}
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-[15%]">
              <h3 className="text-lg font-semibold mb-4">
                <Link
                  to="/about"
                  className="text-black hover:text-gray-600 transition"
                >
                  About
                </Link>
              </h3>

              <ul className="space-y-2 text-gray-600">
                <li className="cursor-pointer hover:text-black">Our Story</li>
                <li className="cursor-pointer hover:text-black">
                  Missions & Values
                </li>
                <li className="cursor-pointer hover:text-black">
                  Meet Our Team
                </li>
                <li className="cursor-pointer hover:text-black">
                  Sustainability and Efforts
                </li>
                <li className="cursor-pointer hover:text-black">
                  Brand Partnership
                </li>
                <li>
                  <Link to="/faq" className="hover:text-black transition">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Accessibility */}
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-[15%]">
              <h3 className="text-lg font-semibold mb-4">Accessibility</h3>

              <ul className="space-y-2 text-gray-600">
                <li className="cursor-pointer hover:text-black">
                  Accessibility Statement
                </li>
                <li className="cursor-pointer hover:text-black">Site Map</li>
                <li className="cursor-pointer hover:text-black">
                  Web Accessibility Option
                </li>
                <li className="cursor-pointer hover:text-black">
                  ADA Compliance
                </li>
                <li className="cursor-pointer hover:text-black">
                  Privacy Policy
                </li>
              </ul>
            </div>

            {/* Community */}
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-[15%]">
              <h3 className="text-lg font-semibold mb-4">Join Our Community</h3>

              <ul className="space-y-2 text-gray-600">
                <li className="cursor-pointer hover:text-black">
                  VIP Membership
                </li>
                <li className="cursor-pointer hover:text-black">
                  Loyalty Program
                </li>
                <li className="cursor-pointer hover:text-black">
                  Customer Review
                </li>
                <li className="cursor-pointer hover:text-black">Job Opening</li>
                <li className="cursor-pointer hover:text-black">
                  Style Forums
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-[20%]">
              <h2 className="text-xl font-semibold mb-4">Let's Get In Touch</h2>

              <p className="text-sm text-gray-600 mb-4">
                Sign up for our newsletter and receive 10% off your first order.
              </p>

              <div className="flex border border-gray-400 rounded-md overflow-hidden">
                <input
                  type="email"
                  placeholder="Enter your E-mail"
                  className="w-full px-3 py-2 outline-none text-sm"
                />
                <button className="bg-black text-white px-4 hover:bg-gray-800 transition">
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-300" />

        {/* Copyright */}
        <div className="container mx-auto px-4 py-4 text-sm text-gray-600">
          &copy; 2025 Maxara. All rights reserved.
        </div>
      </div>
    </>
  );
}

export default Footer;
