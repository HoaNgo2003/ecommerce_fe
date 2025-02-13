import Image from "next/image";
import Link from "next/link";

export default function SignIn() {
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

      <main className="container mx-auto max-w-[460px] px-4 pt-12">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold mb-2">
            Sign in to your account
          </h1>
          <p className="text-sm">
            New to eBay?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Create account
            </Link>
          </p>
        </div>

        <form className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Email or username"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>

          <button className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition-colors">
            Continue
          </button>
        </form>

        <div className="my-6 flex items-center justify-center gap-2">
          <div className="h-[1px] flex-1 bg-gray-300"></div>
          <span className="text-gray-600">or</span>
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
            Continue with Google
          </button>
          <button className="w-full border border-gray-300 rounded-full py-3 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
            <Image
              src="/placeholder.svg"
              alt="Facebook"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            Continue with Facebook
          </button>
          <button className="w-full border border-gray-300 rounded-full py-3 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
            <Image
              src="/placeholder.svg"
              alt="Apple"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            Continue with Apple
          </button>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <input
            type="checkbox"
            id="stay-signed-in"
            className="rounded border-gray-300"
          />
          <label htmlFor="stay-signed-in" className="text-sm">
            Stay signed in
          </label>
        </div>
      </main>

      <footer className="fixed bottom-0 w-full border-t text-xs text-gray-600 py-4">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <span>Copyright © 1995-2024 eBay Inc. All Rights Reserved.</span>
          <Link href="/accessibility" className="hover:underline">
            Accessibility
          </Link>
          <Link href="/agreement" className="hover:underline">
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
      </footer>
    </div>
  );
}
