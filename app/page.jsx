// app/components/Header.jsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Redirect to /about on initial load if at root
  useEffect(() => {
    setIsMounted(true);
    
    // If this is the first load and we're at the root path, redirect to /about
    if (pathname === "/") {
      router.push("/about");
    }
  }, [pathname, router]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { href: "/about", label: "About" },
    { href: "/skills", label: "Skills" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href) => {
    const currentPath = pathname || "/";
    
    if (href === "/about") {
      return currentPath === "/about" || currentPath === "/";
    }
    
    return currentPath === href;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const shouldShowMobileMenu = isMounted && isMobileMenuOpen;

  console.log("Current pathname:", pathname);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-xl border-b border-gray-200/50 px-4 sm:px-3">
        <nav className="max-w-7xl mx-auto flex justify-between items-center py-4 md:py-3">
          {/* Logo */}
          <Link 
            href="/about" 
            className="text-xl sm:text-2xl font-bold bg-gradient-to-br from-indigo-500 to-purple-600 bg-clip-text text-transparent z-50 hover:opacity-80 transition-opacity"
          >
            Portfolio
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
                  isActive(item.href)
                    ? "text-indigo-500 font-semibold bg-indigo-50"
                    : "text-slate-500 font-normal hover:text-indigo-500 hover:bg-indigo-50/50"
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-lg text-slate-500 hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200 z-50"
          >
            {isMobileMenuOpen ? (
              <span className="text-xl">✕</span>
            ) : (
              <span className="text-xl">☰</span>
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {shouldShowMobileMenu && (
          <div
            className="md:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-xl border-b border-gray-200/50 shadow-lg z-40 animate-in slide-in-from-top-2 duration-300 flex flex-col"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-5 py-4 text-base transition-all duration-200 border-b border-gray-100 last:border-b-0 ${
                  isActive(item.href)
                    ? "text-indigo-500 font-semibold bg-indigo-50/80 border-l-4 border-indigo-500"
                    : "text-slate-500 hover:text-indigo-500 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Overlay for mobile menu */}
      {shouldShowMobileMenu && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}

export default Header;