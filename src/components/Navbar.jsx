"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Instagram, Link2, X } from "lucide-react"
import { HiOutlinePlus } from "react-icons/hi2"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { useSession, signOut } from "next-auth/react"

export default function Navbar() {
  const { data: session, status } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/" })
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/affiliate", label: "Affiliate" },
    { href: "/delivery", label: "Delivery" },
    { href: "/reviews", label: "Reviews" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
    { href: "/store", label: "Store" },
  ]

  if (!mounted) return null

  return (
    <nav className="px-8 sm:px-14 relative w-full bg-[var(--background)] tablet:h-fit h-fit text-white font-light font-[family-name:var(--font-dm-sans)]">
      {/* Desktop Navigation */}
      <div className="py-5 tablet:py-10 text-[1.2rem] flex w-full">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0">
              <Link href="/" className="">
                <Image
                  src="/assets/Logo_1.png"
                  alt="Logo"
                  width={36}
                  height={36}
                  className="inline-block"
                />
              </Link>
            </div>
            <div className="hidden tablet:block">
              <div className="flex items-center gap-0.5">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 cursor-pointer ${
                      pathname === link.href ? "underline underline-offset-8 decoration-1" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden tablet:flex items-center gap-4">
            {status === "authenticated" ? (
              <>
                <span className="cursor-pointer">{session.user.name || session.user.email}</span>
                <button onClick={handleSignOut} className="cursor-pointer">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="cursor-pointer">
                  Login
                </Link>
                <Link href="/signup" className="cursor-pointer">
                  Sign-up
                </Link>
              </>
            )}
            <Link href="https://www.instagram.com/resellora.store/" className="">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="https://t.me/resellora" className="">
              <Link2 className="h-5 w-5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="tablet:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              <div className="relative w-6 h-6">
                <HiOutlinePlus
                  className={`absolute inset-0 h-8 w-8 transition-all duration-300 text-[var(--secondary-text)] ${
                    isMenuOpen ? "opacity-0 rotate-45" : "opacity-100 rotate-0"
                  }`}
                />
                <X
                  className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${
                    isMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-45"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`tablet:hidden fixed inset-0 z-50 transition-opacity duration-300 ease-in-out ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ top: "85px" }}
      >
        <div className="flex flex-col gap-6 py-10 px-8 bg-[var(--background)]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-5xl ${pathname === link.href ? "underline underline-offset-8 decoration-1" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {session ? (
            <>
              <button
                onClick={() => {
                  handleSignOut()
                  setIsMenuOpen(false)
                }}
                className="text-5xl text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="text-5xl" onClick={() => setIsMenuOpen(false)}>
              Login
            </Link>
          )}
          <div className="flex gap-4">
            <Link href="https://www.instagram.com/resellora.store/">
              <Instagram className="h-6 w-6" />
            </Link>
            <Link href="https://t.me/resellora">
              <Link2 className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
