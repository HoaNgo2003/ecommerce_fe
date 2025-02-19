"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { PayPalButtons } from "@paypal/react-paypal-js";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

const SHIPPING_COST = 30;

interface CartItem {
  id: string;
  quantity: number;
  product_details: {
    id: string;
    name: string;
    price: string;
    description: string;
    images: string[];
    stock: number;
  };
}

interface CartData {
  id: string;
  items: CartItem[];
  total_price: number;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    setIsLoading(true);
    setError(null);
    const cartId = localStorage.getItem("cart");
    const parsedCartId: { id: string } | null = cartId
      ? JSON.parse(cartId)
      : null;
    if (!cartId) {
      setError("No cart found. Please add items to your cart.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${apiUrl}/cart/carts/${parsedCartId?.id}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch cart data");
      }

      const data: CartData = await response.json();
      setCartData(data);
    } catch (err) {
      setError("Failed to load cart data. Please try again." + err);
    } finally {
      setIsLoading(false);
    }
  };

  const createOrder = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No access token found");
      }
      const customer = localStorage.getItem("customer");
      if (!customer) {
        throw new Error("No customer data found");
      }
      const parsedCustomer: { id: string } = JSON.parse(customer);
      const response = await fetch(`${apiUrl}/order/orders/checkout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          total_price: cartData ? cartData.total_price.toString() : "0",
          status: "pending",
          customer: parsedCustomer.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const data = await response.json();
      return data.order;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingForm((prev) => ({ ...prev, [name]: value }));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("No access token found");
        }

        const customerId = localStorage.getItem("customerId");
        if (!customerId) {
          throw new Error("No customer ID found");
        }

        const response = await fetch(`${apiUrl}/api/addresses/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            street: shippingForm.address1,
            city: shippingForm.city,
            state: shippingForm.state,
            zip_code: shippingForm.zipCode,
            country: shippingForm.country,
            customer: customerId,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save address");
        }

        // Address saved successfully, proceed with payment
        handlePayment();
      } catch (error) {
        console.error("Error saving address:", error);
        setErrors({ submit: "Failed to save address. Please try again." });
      }
    }
  };

  const handlePayment = async () => {
    try {
      const order = await createOrder();

      if (selectedPayment === "paypal") {
        // PayPal payment is handled by the PayPal button
        console.log("PayPal payment selected, order created:", order);
      } else if (selectedPayment === "cod") {
        console.log("Processing COD payment, order created:", order);
        // Here you would typically update the order status to "processing" or similar
        // For now, we'll just simulate a successful order update
        await new Promise((resolve) => setTimeout(resolve, 1000));
        router.push(`/order-confirmation`);
      } else {
        throw new Error("Please select a payment method");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      setError("Failed to process payment. Please try again.");
    }
  };

  const createPayPalOrder = (data: any, actions: any) => {
    if (!cartData) {
      throw new Error("Cart data is not available");
    }
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: (cartData.total_price + SHIPPING_COST).toFixed(2),
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: cartData.total_price.toFixed(2),
              },
              shipping: {
                currency_code: "USD",
                value: SHIPPING_COST.toFixed(2),
              },
            },
          },
        },
      ],
    });
  };

  const onApprove = async (data: any, actions: any) => {
    try {
      const order = await createOrder();
      const paypalOrder = await actions.order.capture();
      console.log("PayPal order captured:", paypalOrder);
      // Here you would typically update the order status to "paid" or similar
      // For now, we'll just simulate a successful order update
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push(`/order-confirmation/${order.id}`);
    } catch (error) {
      console.error("Error capturing PayPal order:", error);
      setError("Failed to process PayPal payment. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!cartData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        No items in cart
      </div>
    );
  }

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
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Order Review */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold mb-6">Review order</h2>

              {cartData.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-6 mb-6 pb-6 border-b last:border-b-0"
                >
                  <div className="w-24 h-24 relative">
                    <Image
                      src={"/placeholder.svg"}
                      alt={item.product_details.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.product_details.name}</h3>
                    <div className="mt-2">
                      US $
                      {Number.parseFloat(item.product_details.price).toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      Quantity: {item.quantity}
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-6 border-t pt-6">
                <h3 className="font-medium mb-2">Delivery</h3>
                <div className="text-sm text-gray-600">
                  Fixed shipping cost: US ${SHIPPING_COST.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold mb-6">Order list</h2>

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
              </form>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Pay with</h2>

              <div className="space-y-4">
                <button
                  className={`w-full border rounded-lg p-4 text-left flex justify-between items-center ${
                    selectedPayment === "cod" ? "border-blue-600" : ""
                  }`}
                  onClick={() => setSelectedPayment("cod")}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 border-2 rounded-full flex items-center justify-center">
                      {selectedPayment === "cod" && (
                        <div className="w-3 h-3 bg-blue-600 rounded-full" />
                      )}
                    </div>
                    <span>Cash on Delivery (COD)</span>
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

                {selectedPayment === "paypal" && (
                  <div className="mt-4">
                    <PayPalButtons
                      createOrder={createPayPalOrder}
                      onApprove={onApprove}
                    />
                  </div>
                )}
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
                  <span>Items ({cartData.items.length})</span>
                  <span>US ${cartData.total_price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>US ${SHIPPING_COST.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-medium">
                    <span>Order total</span>
                    <span>
                      US ${(cartData.total_price + SHIPPING_COST).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                className="w-full bg-blue-600 text-white rounded-full py-3 mt-6 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!selectedPayment}
                onClick={handlePayment} // Updated onClick handler
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
