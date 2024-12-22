import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";
import { BarLoader } from "react-spinners";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="py-8">
      <div>
        <Link
          href="/dashboard"
          className="text-sm text-orange-500 hover:text-orange-700 cursor-pointer flex gap-1 items-center transition mb-2"
        >
          <ChevronLeftIcon size={15} />
          Back to Dashboard
        </Link>
      </div>
      <Suspense fallback={<BarLoader color="#F97316" width={"100%"} />}>
        {children}
      </Suspense>
    </div>
  );
}
