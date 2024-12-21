"use client";

import { UserButton } from "@clerk/nextjs";
import { ChartNoAxesGanttIcon } from "lucide-react";

export default function UserMenu() {
  return (
    <UserButton
      appearance={{
        elements: { avatarBox: "size-9" },
      }}
    >
      <UserButton.MenuItems>
        <UserButton.Link
          href="/dashboard"
          label="Dashboard"
          labelIcon={<ChartNoAxesGanttIcon size={16} />}
        />
        <UserButton.Action label="manageAccount" />
      </UserButton.MenuItems>
    </UserButton>
  );
}
