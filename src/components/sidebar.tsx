"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  ShoppingCart,
  Store,
  HelpCircle,
  Search,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface SidebarProps {
  className?: string;
}

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      href: "/dashboard",
    },
    {
      label: "Orders",
      icon: <ShoppingCart size={20} />,
      href: "/dashboard/orders",
    },
    {
      label: "Shops",
      icon: <Store size={20} />,
      href: "/dashboard/shops",
    },
    {
      label: "FAQ",
      icon: <HelpCircle size={20} />,
      href: "/dashboard/faq",
    },
    {
      label: "SEO",
      icon: <Search size={20} />,
      href: "/dashboard/seo",
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-card border-r transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className,
      )}
    >
      <div className="p-4 flex items-center justify-between border-b">
        {!collapsed && <h2 className="text-xl font-bold">Client Manager</h2>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          {collapsed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          )}
        </Button>
      </div>

      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <span className="mr-3">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-2 border-t">
        <Button
          variant="ghost"
          className={cn(
            "w-full flex items-center justify-start px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          <LogOut size={20} className="mr-3" />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
}
