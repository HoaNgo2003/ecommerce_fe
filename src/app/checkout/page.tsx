"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Info } from "lucide-react";

// Mock data - replace with real data from your cart/backend
const orderDetails = {
  seller: {
    name: "St Luke Gardens-Anthropology Store",
    rating: "100% positive feedback",
    image: "/placeholder.svg",
  },
  item: {
    title:
      "Men's Vintage Nike All Court Shoes 8.5 Made In Taiwan 80s Canvas Blue Prop",
    price: 300.0,
    image: "/placeholder.svg",
    quantity: 1,
    isLastOne: true,
  },
  shipping: {
    cost: 99.89,
    method: "eBay International Shipping",
    estimatedDelivery: {
      start: "Mar 31",
      end: "Apr 23",
    },
  },
};

export default function CheckoutPage() {
  const [shippingForm, setShippingForm] = useState({
    country: "Vietnam",
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    email: "",
    confirmEmail: "",
    phone: "",
  });

  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingForm((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!shippingForm.firstName) newErrors.firstName = "Enter a first name";
    if (!shippingForm.lastName) newErrors.lastName = "Enter a last name";
    if (!shippingForm.address1) newErrors.address1 = "Enter a street address";
    if (!shippingForm.city) newErrors.city = "Enter a city";
    if (!shippingForm.state) newErrors.state = "Enter a state/province";
    if (!shippingForm.zipCode) newErrors.zipCode = "Enter a ZIP code";
    if (!shippingForm.email) newErrors.email = "Enter an email address";
    if (shippingForm.email !== shippingForm.confirmEmail) {
      newErrors.confirmEmail = "Email addresses don't match";
    }
    if (!shippingForm.phone) newErrors.phone = "Enter a phone number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Process checkout
      console.log("Processing checkout...");
    }
  };

  const total = orderDetails.item.price + orderDetails.shipping.cost;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KpNlpPkfs3C7rJC3mEAfzXApQDH0Ep.png"
              alt="eBay"
              width={120}
              height={50}
              className="h-8 w-auto"
            />
            <h1 className="text-xl font-semibold">Checkout</h1>
          </div>
          <Link
            href="/feedback"
            className="text-sm text-blue-600 hover:underline"
          >
            How do you like our checkout? Give us feedback
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Order Review */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold mb-6">Review order</h2>

              <div className="flex items-center gap-3 mb-6">
                <Image
                  src={orderDetails.seller.image || "/placeholder.svg"}
                  alt={orderDetails.seller.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <div className="font-medium">{orderDetails.seller.name}</div>
                  <div className="text-sm text-gray-600">
                    {orderDetails.seller.rating}
                  </div>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-24 h-24 relative">
                  <Image
                    src={orderDetails.item.image || "/placeholder.svg"}
                    alt={orderDetails.item.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div className="flex-1">
                  {orderDetails.item.isLastOne && (
                    <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded mb-2">
                      LAST ONE
                    </span>
                  )}
                  <h3 className="font-medium">{orderDetails.item.title}</h3>
                  <div className="mt-2">
                    US ${orderDetails.item.price.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Quantity {orderDetails.item.quantity}
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t pt-6">
                <h3 className="font-medium mb-2">Delivery</h3>
                <div className="text-sm text-gray-600">
                  Est. delivery: {orderDetails.shipping.estimatedDelivery.start}{" "}
                  - {orderDetails.shipping.estimatedDelivery.end}
                </div>
                <div className="text-sm text-gray-600">
                  {orderDetails.shipping.method}
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  US ${orderDetails.shipping.cost.toFixed(2)}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Authorities may apply duties, fees, and taxes upon delivery
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold mb-6">Ship to</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <select
                    className="w-full border rounded-md px-3 py-2"
                    value={shippingForm.country}
                    onChange={(e) =>
                      setShippingForm((prev) => ({
                        ...prev,
                        country: e.target.value,
                      }))
                    }
                  >
                    <option value="Vietnam">Vietnam</option>
                    {/* Add more countries */}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      className={`w-full border rounded-md px-3 py-2 ${
                        errors.firstName ? "border-red-500" : ""
                      }`}
                      value={shippingForm.firstName}
                      onChange={handleInputChange}
                    />
                    {errors.firstName && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.firstName}
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      className={`w-full border rounded-md px-3 py-2 ${
                        errors.lastName ? "border-red-500" : ""
                      }`}
                      value={shippingForm.lastName}
                      onChange={handleInputChange}
                    />
                    {errors.lastName && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.lastName}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    name="address1"
                    placeholder="Street address"
                    className={`w-full border rounded-md px-3 py-2 ${
                      errors.address1 ? "border-red-500" : ""
                    }`}
                    value={shippingForm.address1}
                    onChange={handleInputChange}
                  />
                  {errors.address1 && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.address1}
                    </div>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    name="address2"
                    placeholder="Street address 2 (optional)"
                    className="w-full border rounded-md px-3 py-2"
                    value={shippingForm.address2}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-6 gap-4">
                  <div className="col-span-2">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      className={`w-full border rounded-md px-3 py-2 ${
                        errors.city ? "border-red-500" : ""
                      }`}
                      value={shippingForm.city}
                      onChange={handleInputChange}
                    />
                    {errors.city && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.city}
                      </div>
                    )}
                  </div>
                  <div className="col-span-3">
                    <input
                      type="text"
                      name="state"
                      placeholder="State/Province/Region"
                      className={`w-full border rounded-md px-3 py-2 ${
                        errors.state ? "border-red-500" : ""
                      }`}
                      value={shippingForm.state}
                      onChange={handleInputChange}
                    />
                    {errors.state && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.state}
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="ZIP code"
                      className={`w-full border rounded-md px-3 py-2 ${
                        errors.zipCode ? "border-red-500" : ""
                      }`}
                      value={shippingForm.zipCode}
                      onChange={handleInputChange}
                    />
                    {errors.zipCode && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.zipCode}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className={`w-full border rounded-md px-3 py-2 ${
                        errors.email ? "border-red-500" : ""
                      }`}
                      value={shippingForm.email}
                      onChange={handleInputChange}
                    />
                    {errors.email && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      type="email"
                      name="confirmEmail"
                      placeholder="Confirm email"
                      className={`w-full border rounded-md px-3 py-2 ${
                        errors.confirmEmail ? "border-red-500" : ""
                      }`}
                      value={shippingForm.confirmEmail}
                      onChange={handleInputChange}
                    />
                    {errors.confirmEmail && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.confirmEmail}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <select className="border rounded-md px-3 py-2 w-32">
                    <option value="+84">🇻🇳 +84</option>
                    {/* Add more country codes */}
                  </select>
                  <div className="flex-1">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone number (required)"
                      className={`w-full border rounded-md px-3 py-2 ${
                        errors.phone ? "border-red-500" : ""
                      }`}
                      value={shippingForm.phone}
                      onChange={handleInputChange}
                    />
                    {errors.phone && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.phone}
                      </div>
                    )}
                    <div className="text-xs text-gray-500 mt-1">
                      We only use this number if there&apos;s a shipping issue.
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-24 bg-blue-600 text-white rounded-full py-2 hover:bg-blue-700"
                >
                  Done
                </button>
              </form>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Pay with</h2>

              <div className="space-y-4">
                <button
                  className={`w-full border rounded-lg p-4 text-left flex justify-between items-center ${
                    selectedPayment === "card" ? "border-blue-600" : ""
                  }`}
                  onClick={() => setSelectedPayment("card")}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 border-2 rounded-full flex items-center justify-center">
                      {selectedPayment === "card" && (
                        <div className="w-3 h-3 bg-blue-600 rounded-full" />
                      )}
                    </div>
                    <span>Add new card</span>
                  </div>
                  <div className="flex gap-2">
                    <Image
                      src="/placeholder.svg"
                      alt="Visa"
                      width={32}
                      height={20}
                    />
                    <Image
                      src="/placeholder.svg"
                      alt="Mastercard"
                      width={32}
                      height={20}
                    />
                    <Image
                      src="/placeholder.svg"
                      alt="Discover"
                      width={32}
                      height={20}
                    />
                  </div>
                </button>

                <button
                  className={`w-full border rounded-lg p-4 text-left flex justify-between items-center ${
                    selectedPayment === "paypal" ? "border-blue-600" : ""
                  }`}
                  onClick={() => setSelectedPayment("paypal")}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 border-2 rounded-full flex items-center justify-center">
                      {selectedPayment === "paypal" && (
                        <div className="w-3 h-3 bg-blue-600 rounded-full" />
                      )}
                    </div>
                    <Image
                      src="/placeholder.svg"
                      alt="PayPal"
                      width={80}
                      height={20}
                    />
                  </div>
                </button>

                <button
                  className={`w-full border rounded-lg p-4 text-left flex justify-between items-center ${
                    selectedPayment === "apple" ? "border-blue-600" : ""
                  }`}
                  onClick={() => setSelectedPayment("apple")}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 border-2 rounded-full flex items-center justify-center">
                      {selectedPayment === "apple" && (
                        <div className="w-3 h-3 bg-blue-600 rounded-full" />
                      )}
                    </div>
                    <Image
                      src="/placeholder.svg"
                      alt="Apple Pay"
                      width={80}
                      height={20}
                    />
                  </div>
                </button>
              </div>

              <div className="mt-6">
                <input
                  type="text"
                  placeholder="Add coupons"
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                <Info className="w-4 h-4" />
                <span>Donations can&apos;t be applied at this time.</span>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Item (1)</span>
                  <span>US ${orderDetails.item.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>US ${orderDetails.shipping.cost.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-medium">
                    <span>Order total</span>
                    <span>US ${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                className="w-full bg-gray-300 text-gray-700 rounded-full py-3 mt-6 hover:bg-gray-400 disabled:opacity-50"
                disabled={!selectedPayment}
              >
                Confirm and pay
              </button>

              <div className="mt-4">
                <button className="text-blue-600 hover:underline text-sm">
                  Enter shipping address
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
