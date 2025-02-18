import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Expand, Heart, Star } from "lucide-react";
import { AddToCartButton } from "./add-to-cart";
const similarProducts = [
  {
    id: "2",
    title:
      "Vintage Nike Air More Uptempo 1996 OG Pippen Jordan Olympic Size 13 - OG $539",
    price: {
      vnd: "10,993,554.00",
    },
    shipping: {
      vnd: "2,913,615.00",
    },
    image: "/placeholder.svg",
  },
  // Add more similar products...
];

const itemSpecifics = {
  brand: "Converse",
  shoeSize: "7",
  decade: "1980s",
  style: "Athletic",
  description: `Up for auction is a NOS pair of 1980's camoflauge Converse All Star hi-top canvas and rubber hi-top sneakers in a men's size 7, women's 8.5. All rubber is nice and flexible. There is a slight discoloration on the white portion of the midsoles. Laces are missing.

Shipping to run $9.95 in USA and $45.00 to Europe or Japan.

Good luck and God Bless!`,
  lastUpdated: "Feb 12, 2024 14:00:14 PST",
  itemNumber: "116473239711",
};

const sellerInfo = {
  username: "nostalgia-on-wheels",
  joinDate: "Aug 2004",
  responseTime: "within 24 hours",
  feedback: {
    positive: "100%",
    itemsSold: "1.4K",
    ratings: {
      description: 4.9,
      shipping: 4.8,
      speed: 5.0,
      communication: 5.0,
    },
    recentFeedback: [
      {
        rating: 5,
        comment:
          "A+++ Great seller! Made an offer, got a quick response with a reasonable counteroffer and deal was done. Packaged with care and shipped FAST. Exactly as described and shown - NO surprises. A+++",
        date: "Past 6 months",
        verified: true,
        item: "Pocket Pistols Pee Wee Herman Big Adventure 10FF83 2023 Tribute Skateboard Deck",
      },
      // Add more feedback items...
    ],
  },
};
async function getProductData(category: string, id: string) {
  const apiUrl = process.env.API_URL || "http://127.0.0.1:8000";
  const pluralCategory = category.endsWith("s") ? category : `${category}s`;
  const res = await fetch(`${apiUrl}/products/${pluralCategory}/${id}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch product data");
  }
  return res.json();
}

export default async function ProductDetail({
  params,
}: {
  params: { category: string; id: string };
}) {
  const product = await getProductData(params.category, params.id);

  // Helper function to format price
  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Number.parseFloat(price));
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <Link href="/products" className="text-gray-600 hover:underline">
          Back to previous page
        </Link>
        <span className="text-gray-400">›</span>
        <Link
          href={`/products/${params.category}`}
          className="text-gray-600 hover:underline capitalize"
        >
          {params.category}
        </Link>
        <span className="text-gray-400">›</span>
        <span className="text-gray-800">{product.name}</span>
      </div>

      {/* Product Section */}
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
              {product.stock} in stock
            </div>
            <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md">
              <Expand className="w-5 h-5" />
            </button>
            <div className="relative aspect-square">
              <Image
                src={"/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <button className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-md">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-md">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-6 gap-2">
            {product.images.map((image: string, i: number) => (
              <button
                key={i}
                className="aspect-square relative border rounded-md overflow-hidden hover:border-blue-600"
              >
                <Image
                  src={"/placeholder.svg"}
                  alt={`Product view ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl font-semibold">{product.name}</h1>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Expand className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-1">
                <span>{product.stock}</span>
                <Heart className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="text-2xl font-bold">
              {formatPrice(product.price)}
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <button className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700">
              Buy It Now
            </button>
            <AddToCartButton
              product={{
                id: product.id.toString(),
                name: product.name,
                price: Number(product.price),
                image: product.images[0] || "/placeholder.svg",
              }}
            />
            <button className="w-full border py-3 rounded-full hover:bg-gray-100">
              ❤ Add to Watchlist
            </button>
          </div>

          <div className="mt-6 space-y-4">
            <div className="border-t pt-4">
              <div className="flex justify-between text-sm">
                <span>Stock:</span>
                <div>{product.stock}</div>
              </div>
            </div>

            {params.category === "books" && (
              <>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm">
                    <span>Author:</span>
                    <div>{product.author}</div>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm">
                    <span>Publisher:</span>
                    <div>{product.publisher}</div>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm">
                    <span>ISBN:</span>
                    <div>{product.isbn}</div>
                  </div>
                </div>
              </>
            )}

            {params.category === "clothes" && (
              <>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm">
                    <span>Size:</span>
                    <div>{product.size}</div>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm">
                    <span>Color:</span>
                    <div>{product.color}</div>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm">
                    <span>Material:</span>
                    <div>{product.material}</div>
                  </div>
                </div>
              </>
            )}

            {params.category === "phones" && (
              <>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm">
                    <span>Brand:</span>
                    <div>{product.brand}</div>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm">
                    <span>Model:</span>
                    <div>{product.model}</div>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm">
                    <span>Storage:</span>
                    <div>{product.storage}</div>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm">
                    <span>RAM:</span>
                    <div>{product.ram}</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Item Description */}

      {/* Item Specifics & Description */}
      <section className="mt-12 border-t pt-8">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold">About this item</h2>
          <button className="text-sm text-gray-600 hover:underline">
            Report this item
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Item specifics</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries({
                Brand: itemSpecifics.brand,
                "US Shoe Size (Men's)": itemSpecifics.shoeSize,
                Decade: itemSpecifics.decade,
                Style: itemSpecifics.style,
              }).map(([key, value]) => (
                <div key={key} className="text-sm">
                  <div className="text-gray-600">{key}</div>
                  <div>{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">
              Item description from the seller
            </h3>
            <p className="text-sm whitespace-pre-line">
              {itemSpecifics.description}
            </p>
            <div className="mt-4 text-xs text-gray-500">
              Last updated on {itemSpecifics.lastUpdated}
            </div>
          </div>
        </div>
      </section>

      {/* Seller Information */}
      <section className="mt-12 border-t pt-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-6">About this seller</h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-orange-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl">
                N
              </div>
              <div>
                <div className="font-medium">{sellerInfo.username}</div>
                <div className="text-sm text-gray-600">
                  {sellerInfo.feedback.positive} positive feedback ·{" "}
                  {sellerInfo.feedback.itemsSold} items sold
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-sm text-gray-600">
                ✓ Joined {sellerInfo.joinDate}
              </div>
              <div className="text-sm text-gray-600">
                ⏱ Usually responds {sellerInfo.responseTime}
              </div>
              <div className="space-y-2">
                <button className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700">
                  Seller&apos;s other items
                </button>
                <button className="w-full border py-2 rounded-full hover:bg-gray-50">
                  Contact
                </button>
                <button className="w-full border py-2 rounded-full hover:bg-gray-50">
                  ❤ Save seller
                </button>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold mb-4">Detailed seller ratings</h3>
              <div className="space-y-3">
                {Object.entries(sellerInfo.feedback.ratings).map(
                  ([key, value]) => (
                    <div key={key} className="flex items-center gap-4">
                      <div className="w-32 text-sm capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </div>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${(value / 5) * 100}%` }}
                        />
                      </div>
                      <div className="text-sm">{value}</div>
                    </div>
                  )
                )}
              </div>
              <div className="text-xs text-gray-500 mt-2">
                Average for the last 12 months
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                Seller feedback ({sellerInfo.feedback.recentFeedback.length})
              </h2>
              <select className="border rounded-md px-3 py-1 text-sm">
                <option>All ratings</option>
                <option>Positive</option>
                <option>Neutral</option>
                <option>Negative</option>
              </select>
            </div>

            <div className="space-y-6">
              {sellerInfo.feedback.recentFeedback.map((feedback, index) => (
                <div key={index} className="border-b pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-1 text-blue-600">
                      {Array.from({ length: feedback.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">{feedback.date}</div>
                  </div>
                  <p className="mt-2 text-sm">{feedback.comment}</p>
                  <div className="mt-2">
                    <Link
                      href="#"
                      className="text-xs text-gray-600 hover:underline"
                    >
                      {feedback.item}
                    </Link>
                  </div>
                  {feedback.verified && (
                    <div className="mt-2 text-xs text-gray-500">
                      Verified purchase
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button className="mt-4 text-blue-600 hover:underline text-sm">
              See all feedback
            </button>
          </div>
        </div>
      </section>

      {/* Similar Items */}
      <section className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Similar items</h2>
          <div className="flex items-center gap-2 text-sm">
            <button className="text-blue-600 hover:underline">
              Feedback on our suggestions
            </button>
            <span>|</span>
            <button className="text-blue-600 hover:underline">See all</button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {similarProducts.map((item, i) => (
            <div key={i} className="group">
              <div className="relative aspect-square mb-3">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover rounded-lg"
                />
                <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
              <h3 className="text-sm font-medium hover:underline">
                <Link href={`/products/vintage/${item.id}`}>{item.title}</Link>
              </h3>
              <div className="mt-1 text-sm">
                <div>{item.price.vnd} VND</div>
                <div className="text-gray-500">
                  + {item.shipping.vnd} VND shipping
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
