"use client";

import type React from "react";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.push("/");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const registerResponse = await fetch(`${apiUrl}/api/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!registerResponse.ok) {
        throw new Error("Registration failed");
      }

      const registerData = await registerResponse.json();
      localStorage.setItem("accessToken", registerData.tokens.access);
      localStorage.setItem("refreshToken", registerData.tokens.refresh);
      localStorage.setItem("customer", JSON.stringify(registerData.customer));

      // Create cart for the new user
      const cartResponse = await fetch(`${apiUrl}/cart/carts/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${registerData.tokens.access}`,
        },
        body: JSON.stringify({ customer: registerData.customer.id }),
      });

      if (!cartResponse.ok) {
        console.error("Failed to create cart");
        setError(
          "Registration successful, but failed to create cart. Please try logging in or contact support."
        );
      } else {
        const cartData = await cartResponse.json();
        localStorage.setItem("cart", JSON.stringify(cartData));
        router.push("/");
      }
    } catch (err) {
      setError("Registration failed. Please try again." + err);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="p-4">
        <Link href="/">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KpNlpPkfs3C7rJC3mEAfzXApQDH0Ep.png"
            alt="Logo"
            width={120}
            height={50}
            className="h-10 w-auto"
          />
        </Link>
      </div>

      <main className="container mx-auto max-w-[1200px] px-4 pt-8">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="hidden md:block">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-QAvja0OslkMahWjJEaWwTp92cEJsrJ.png"
              alt="Friends enjoying shopping"
              width={600}
              height={800}
              className="w-full h-auto rounded-lg"
            />
          </div>

          <div className="max-w-[460px]">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold mb-6">Create an account</h1>
            </div>

            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                required
              />

              <p className="text-xs text-gray-600">
                By selecting Create personal account, you agree to our{" "}
                <Link
                  href="/user-agreement"
                  className="text-blue-600 hover:underline"
                >
                  User Agreement
                </Link>{" "}
                and acknowledge reading our{" "}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  User Privacy Notice
                </Link>
                .
              </p>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-800 transition-colors"
              >
                Create personal account
              </button>
            </form>

            <div className="my-6 flex items-center justify-center gap-2">
              <div className="h-[1px] flex-1 bg-gray-300"></div>
              <span className="text-gray-600">or continue with</span>
              <div className="h-[1px] flex-1 bg-gray-300"></div>
            </div>

            <div className="space-y-3">
              <button className="w-full border border-gray-300 rounded-full py-3 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                <Image
                  src="/placeholder.svg"
                  alt="Google"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                Google
              </button>
              <button className="w-full border border-gray-300 rounded-full py-3 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                <Image
                  src="/placeholder.svg"
                  alt="Facebook"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                Facebook
              </button>
              <button className="w-full border border-gray-300 rounded-full py-3 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                <Image
                  src="/placeholder.svg"
                  alt="Apple"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                Apple
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
