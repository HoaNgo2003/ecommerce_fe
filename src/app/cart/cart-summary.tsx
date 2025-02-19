import Link from "next/link";
import Image from "next/image";
import { Info } from "lucide-react";
import { useRouter } from "next/navigation";

interface CartSummaryProps {
  cartData: {
    items: {
      product_details: {
        price: number;
      };
    }[];
    total_price: number;
  };
}

export function CartSummary({ cartData }: CartSummaryProps) {
  const router = useRouter();
  return (
    <div className="border rounded-lg p-6">
      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Items ({cartData.items.length})</span>
          <span>US ${cartData.total_price.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-1">
            <span>Shipping</span>
            <Info className="w-4 h-4 text-gray-400" />
          </div>
          <span>Calculated at checkout</span>
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>US ${cartData.total_price.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => router.push("/checkout")}
        className="w-full bg-blue-600 text-white rounded-full py-3 mt-6 hover:bg-blue-700"
      >
        Go to checkout
      </button>

      <div className="mt-4 flex items-center gap-2 text-sm">
        <Image src="/placeholder.svg" alt="Protection" width={16} height={16} />
        <span>Purchase protected by</span>
        <Link href="#" className="text-blue-600 hover:underline">
          eBay Money Back Guarantee
        </Link>
      </div>
    </div>
  );
}
