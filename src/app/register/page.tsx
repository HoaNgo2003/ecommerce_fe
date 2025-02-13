import Image from "next/image";
import Link from "next/link";

export default function Register() {
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
              <div className="inline-flex rounded-full p-1 bg-gray-100">
                <button className="px-6 py-2 rounded-full bg-black text-white">
                  Personal
                </button>
                <button className="px-6 py-2 rounded-full text-gray-600">
                  Business
                </button>
              </div>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First name"
                  className="px-4 py-3 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  className="px-4 py-3 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
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

              <button className="w-full bg-gray-300 text-gray-700 py-3 rounded-full hover:bg-gray-400 transition-colors">
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
