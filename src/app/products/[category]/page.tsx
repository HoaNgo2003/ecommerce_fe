import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";

const filters = [
  { name: "US Shoe Size", options: ["7", "8", "9", "10", "11", "12"] },
  { name: "Color", options: ["Black", "White", "Red", "Blue"] },
  { name: "Brand", options: ["Nike", "Adidas", "Under Armour", "New Balance"] },
  {
    name: "Performance/Activity",
    options: ["Running", "Basketball", "Training"],
  },
  { name: "Season", options: ["Spring", "Summer", "Fall", "Winter"] },
  { name: "Condition", options: ["New", "Used"] },
  {
    name: "Price",
    options: ["Under $50", "$50-$100", "$100-$200", "Over $200"],
  },
  { name: "Buying Format", options: ["All Listings", "Auction", "Buy It Now"] },
];

const products = [
  {
    id: 1,
    title: "Nike Stranger Things x Cortez OG Collection Red Size 9 Mens 1985",
    condition: "New (Other)",
    brand: "Nike",
    price: "4,853,383.61",
    shipping: "204,536.00",
    watching: 40,
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "3023086-103 Under Armour Embiid 1 Draft Night Men's Sneakers",
    condition: "Brand New",
    brand: "Under Armour",
    price: "3,195,875.00",
    shipping: "407,793.65",
    watching: 15,
    image: "/placeholder.svg",
    isNew: true,
  },
  // Add more products as needed
];

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="text-sm mb-6">
        <Link href="/" className="hover:underline">
          eBay
        </Link>
        <span className="mx-2">›</span>
        <span className="capitalize">{params.category.replace("-", " ")}</span>
      </div>

      {/* Category Title */}
      <h1 className="text-3xl font-bold mb-6 capitalize">
        {params.category.replace("-", " ")}
      </h1>

      {/* Filters and Results */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-64 shrink-0">
          <h2 className="font-semibold mb-4">Shop by Category</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="hover:underline">
                Athletic Vintage Shoes for Men
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Leather Athletic Vintage Shoes for Men
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Canvas Athletic Vintage Shoes for Men
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Suede Athletic Vintage Shoes for Men
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Athletic 1940s Vintage Shoes for Men
              </Link>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Filter Tabs */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button className="bg-gray-800 text-white px-4 py-2 rounded">
                All Listings
              </button>
              <button className="hover:bg-gray-100 px-4 py-2 rounded">
                Auction
              </button>
              <button className="hover:bg-gray-100 px-4 py-2 rounded">
                Buy It Now
              </button>
            </div>
            <select className="border rounded-md px-3 py-2">
              <option>Best Match</option>
              <option>Price + Shipping: lowest first</option>
              <option>Price + Shipping: highest first</option>
              <option>Time: ending soonest</option>
            </select>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {filters.map((filter) => (
              <select
                key={filter.name}
                className="border rounded-full px-4 py-2 text-sm bg-white"
              >
                <option value="">{filter.name}</option>
                {filter.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-sm text-gray-600 mb-6">20,753 Results</div>

          {/* Product Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
            {products.map((product) => (
              <div key={product.id} className="border rounded-lg p-4 relative">
                <button
                  className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
                  aria-label="Add to watchlist"
                >
                  <Heart className="h-5 w-5" />
                </button>
                {product.isNew && (
                  <span className="absolute top-4 left-4 bg-gray-100 text-xs px-2 py-1 rounded">
                    NEW LISTING
                  </span>
                )}
                <div className="flex gap-4">
                  <div className="w-40 h-40 shrink-0">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      width={160}
                      height={160}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium hover:underline">
                      <Link href={`/products/${params.category}/${product.id}`}>
                        {product.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {product.condition} · {product.brand}
                    </p>
                    <div className="mt-2">
                      <div className="text-lg font-semibold">
                        VND {product.price}
                      </div>
                      <div className="text-sm text-gray-600">
                        VND {product.shipping} shipping
                      </div>
                    </div>
                    {product.watching > 0 && (
                      <div className="text-sm text-red-600 mt-2">
                        {product.watching} watching
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
