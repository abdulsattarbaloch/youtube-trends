// components/footer.tsx
import { TrendingUp } from "lucide-react";
import Link from "next/link";
import Logo from "./logo";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-start gap-2 mb-4">
              <Logo isLight={true} />
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Discover what&apos;s trending on YouTube across different regions
              and categories. Get insights into viral content and stay ahead of
              the curve with real-time analytics.
            </p>
            {/* <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@example.com"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div> */}
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/how-to-use"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  How to Use
                </Link>
              </li>
              <li>
                <Link
                  href="/faqs"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Features Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-red-500" />
            Key Features
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-white mb-1">Global Coverage</h4>
              <p className="text-gray-400">Multiple regions supported</p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">Real-time Data</h4>
              <p className="text-gray-400">Latest trending videos</p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">Smart Filtering</h4>
              <p className="text-gray-400">Advanced search & filters</p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">Rich Analytics</h4>
              <p className="text-gray-400">Detailed video insights</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-center items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} YouTube Trending Tracker. All rights
            reserved.
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-gray-800 mt-6 pt-6">
          <p className="text-gray-500 text-xs text-center">
            This website is not affiliated with YouTube or Google. YouTube is a
            trademark of Google Inc. All video content and metadata are provided
            by the YouTube Data API and are subject to YouTube&apos;s terms of
            service.
          </p>
        </div>
      </div>
    </footer>
  );
}
