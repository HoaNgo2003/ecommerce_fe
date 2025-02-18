import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Product, ProductsResponse } from "@/types/products";

const categoryFilters = {
  books: [
    { name: "Author", options: [] },
    { name: "Publisher", options: [] },
    {
      name: "Price",
      options: ["Under $50", "$50-$100", "$100-$200", "Over $200"],
    },
    { name: "Condition", options: ["New", "Used"] },
  ],
  clothes: [
    { name: "Size", options: ["S", "M", "L", "XL"] },
    { name: "Color", options: ["White", "Black", "Red", "Blue"] },
    { name: "Material", options: ["Cotton", "Polyester", "Wool"] },
    {
      name: "Price",
      options: ["Under $50", "$50-$100", "$100-$200", "Over $200"],
    },
  ],
  phones: [
    { name: "Brand", options: ["Apple", "Samsung", "Google", "OnePlus"] },
    { name: "Storage", options: ["64GB", "128GB", "256GB", "512GB", "1TB"] },
    { name: "RAM", options: ["4GB", "6GB", "8GB", "12GB", "16GB"] },
    {
      name: "Price",
      options: ["Under $500", "$500-$1000", "$1000-$1500", "Over $1500"],
    },
  ],
};

const categorySidebar = {
  books: [
    { name: "Fiction", href: "#" },
    { name: "Non-fiction", href: "#" },
    { name: "Children's Books", href: "#" },
    { name: "Textbooks", href: "#" },
  ],
  clothes: [
    { name: "T-Shirts", href: "#" },
    { name: "Jeans", href: "#" },
    { name: "Dresses", href: "#" },
    { name: "Jackets", href: "#" },
  ],
  phones: [
    { name: "Smartphones", href: "#" },
    { name: "Accessories", href: "#" },
    { name: "Refurbished", href: "#" },
    { name: "5G Phones", href: "#" },
  ],
};

async function getProducts(category: string): Promise<ProductsResponse> {
  const apiUrl = process.env.API_URL || "http://127.0.0.1:8000";
  const pluralCategory = category.endsWith("s") ? category : `${category}s`;
  try {
    const res = await fetch(`${apiUrl}/products/${pluralCategory}/`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const category = params.category;
  const products: ProductsResponse = await getProducts(category);
  const filters =
    categoryFilters[category as keyof typeof categoryFilters] || [];
  const sidebarItems =
    categorySidebar[category as keyof typeof categorySidebar] || [];

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="text-sm mb-6">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-2">›</span>
        <span className="capitalize">{category}</span>
      </div>

      {/* Category Title */}
      <h1 className="text-3xl font-bold mb-6 capitalize">{category}</h1>

      {/* Filters and Results */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-64 shrink-0">
          <h2 className="font-semibold mb-4">Shop by Category</h2>
          <ul className="space-y-2 text-sm">
            {sidebarItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="hover:underline">
                  {item.name}
                </Link>
              </li>
            ))}
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
                New
              </button>
              <button className="hover:bg-gray-100 px-4 py-2 rounded">
                Used
              </button>
            </div>
            <select className="border rounded-md px-3 py-2">
              <option>Best Match</option>
              <option>Price: lowest first</option>
              <option>Price: highest first</option>
              <option>Newest arrivals</option>
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
          <div className="text-sm text-gray-600 mb-6">
            {products.length} Results
          </div>

          {/* Product Grid */}
          {products.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
              {products.map((product: Product) => (
                <div
                  key={product.id}
                  className="border rounded-lg p-4 relative"
                >
                  <button
                    className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
                    aria-label="Add to watchlist"
                  >
                    <Heart className="h-5 w-5" />
                  </button>
                  <div className="flex gap-4">
                    <div className="w-40 h-40 shrink-0">
                      <Image
                        src="/placeholder.svg"
                        alt={product.name}
                        width={160}
                        height={160}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium hover:underline">
                        <Link href={`/products/${category}/${product.id}`}>
                          {product.name}
                        </Link>
                      </h3>
                      {category === "books" && "author" in product && (
                        <p className="text-sm text-gray-600 mt-1">
                          Author: {product.author} · Publisher:{" "}
                          {product.publisher}
                        </p>
                      )}
                      {category === "clothes" && "size" in product && (
                        <p className="text-sm text-gray-600 mt-1">
                          Size: {product.size} · Color: {product.color} ·
                          Material: {product.material}
                        </p>
                      )}
                      {category === "phones" && "brand" in product && (
                        <p className="text-sm text-gray-600 mt-1">
                          Brand: {product.brand} · Model: {product.model} ·
                          Storage: {product.storage} · RAM: {product.ram}
                        </p>
                      )}
                      <div className="mt-2">
                        <div className="text-lg font-semibold">
                          VND{" "}
                          {Number.parseFloat(product.price).toLocaleString()}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 mt-2">
                        Stock: {product.stock}
                      </div>
                      {category === "books" && "isbn" in product && (
                        <div className="text-sm text-gray-600 mt-1">
                          ISBN: {product.isbn}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-xl text-gray-600">No products found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
