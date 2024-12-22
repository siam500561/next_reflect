import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="container mx-auto px-4 md:px-0">{children}</div>;
}
