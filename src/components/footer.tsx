import Link from "next/link";
import { ChevronUp, Facebook, Twitter } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Buy Column */}
          <div className="space-y-4">
            <h3 className="font-semibold">Buy</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/registration" className="hover:underline">
                  Registration
                </Link>
              </li>
              <li>
                <Link href="/buying-help" className="hover:underline">
                  Bidding & buying help
                </Link>
              </li>
              <li>
                <Link href="/stores" className="hover:underline">
                  Stores
                </Link>
              </li>
              <li>
                <Link href="/curator-collections" className="hover:underline">
                  Curator Collections
                </Link>
              </li>
              <li>
                <Link href="/charity" className="hover:underline">
                  eBay for Charity
                </Link>
              </li>
              <li>
                <Link href="/charity-shop" className="hover:underline">
                  Charity Shop
                </Link>
              </li>
              <li>
                <Link href="/seasonal-events" className="hover:underline">
                  Seasonal Sales and events
                </Link>
              </li>
              <li>
                <Link href="/gift-cards" className="hover:underline">
                  eBay Gift Cards
                </Link>
              </li>
            </ul>
          </div>

          {/* Sell Column */}
          <div className="space-y-4">
            <h3 className="font-semibold">Sell</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/start-selling" className="hover:underline">
                  Start selling
                </Link>
              </li>
              <li>
                <Link href="/how-to-sell" className="hover:underline">
                  How to sell
                </Link>
              </li>
              <li>
                <Link href="/business-sellers" className="hover:underline">
                  Business sellers
                </Link>
              </li>
              <li>
                <Link href="/affiliates" className="hover:underline">
                  Affiliates
                </Link>
              </li>
            </ul>

            <h3 className="font-semibold pt-4">Tools & apps</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/developers" className="hover:underline">
                  Developers
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:underline">
                  Security center
                </Link>
              </li>
              <li>
                <Link href="/site-map" className="hover:underline">
                  Site map
                </Link>
              </li>
            </ul>
          </div>

          {/* eBay companies Column */}
          <div className="space-y-4">
            <h3 className="font-semibold">eBay companies</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/tcgplayer" className="hover:underline">
                  TCGplayer
                </Link>
              </li>
            </ul>

            <h3 className="font-semibold pt-4">Stay connected</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link
                  href="https://facebook.com/ebay"
                  className="flex items-center gap-2 hover:underline"
                >
                  <Facebook className="h-4 w-4" />
                  Facebook
                </Link>
              </li>
              <li>
                <Link
                  href="https://twitter.com/ebay"
                  className="flex items-center gap-2 hover:underline"
                >
                  <Twitter className="h-4 w-4" />X (Twitter)
                </Link>
              </li>
            </ul>
          </div>

          {/* About eBay Column */}
          <div className="space-y-4">
            <h3 className="font-semibold">About eBay</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/company" className="hover:underline">
                  Company info
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:underline">
                  News
                </Link>
              </li>
              <li>
                <Link href="/investors" className="hover:underline">
                  Investors
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:underline">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/diversity" className="hover:underline">
                  Diversity & Inclusion
                </Link>
              </li>
              <li>
                <Link href="/impact" className="hover:underline">
                  Global Impact
                </Link>
              </li>
              <li>
                <Link href="/government" className="hover:underline">
                  Government relations
                </Link>
              </li>
              <li>
                <Link href="/advertise" className="hover:underline">
                  Advertise with us
                </Link>
              </li>
              <li>
                <Link href="/policies" className="hover:underline">
                  Policies
                </Link>
              </li>
              <li>
                <Link href="/vero" className="hover:underline">
                  Verified Rights Owner (VeRO) Program
                </Link>
              </li>
              <li>
                <Link href="/licenses" className="hover:underline">
                  eCI Licenses
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Contact Column */}
          <div className="space-y-4">
            <h3 className="font-semibold">Help & Contact</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/seller-center" className="hover:underline">
                  Seller Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:underline">
                  eBay Returns
                </Link>
              </li>
              <li>
                <Link href="/guarantee" className="hover:underline">
                  eBay Money Back Guarantee
                </Link>
              </li>
            </ul>
          </div>

          {/* Community Column */}
          <div className="space-y-4">
            <h3 className="font-semibold">Community</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/announcements" className="hover:underline">
                  Announcements
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:underline">
                  eBay Community
                </Link>
              </li>
              <li>
                <Link href="/podcast" className="hover:underline">
                  eBay for Business Podcast
                </Link>
              </li>
            </ul>

            <div className="pt-4">
              <h3 className="font-semibold">eBay Sites</h3>
              <button className="mt-2 flex items-center gap-2 rounded border px-3 py-1.5 text-sm">
                <span className="flex items-center gap-2">
                  🇺🇸 United States
                </span>
                <ChevronUp className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 pt-8 border-t text-xs text-gray-600">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>Copyright © 1995-2024 eBay Inc. All Rights Reserved.</span>
            <Link href="/accessibility" className="hover:underline">
              Accessibility
            </Link>
            <Link href="/user-agreement" className="hover:underline">
              User Agreement
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy
            </Link>
            <Link href="/cookies" className="hover:underline">
              Cookies
            </Link>
            <Link href="/your-privacy-choices" className="hover:underline">
              Your Privacy Choices
            </Link>
            <Link href="/payments" className="hover:underline">
              Payments Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
