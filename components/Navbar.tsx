"use client"
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'My Order', href: '/order-success' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 px-4 md:px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">K</div>
          <span className="font-bold text-xl tracking-tight text-gray-800 uppercase">
            KAMARA's <span className="text-orange-500">SPECIAL</span>
          </span>
        </Link>

        {/* DESKTOP MENU (Hidden on Mobile) */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className={`font-semibold uppercase tracking-wider text-sm ${pathname === link.href ? 'text-orange-500' : 'text-gray-500 hover:text-orange-400'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* HAMBURGER BUTTON (Hidden on Desktop) */}
        <button title='open'
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-800 focus:outline-none"
        >
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-gray-800 transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-800 ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-800 transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* MOBILE SIDE MENU OVERLAY */}
      <div className={`fixed inset-0 z-40 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
        {/* Dark Backdrop */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
        
        {/* Sidebar Content */}
        <div className="absolute right-0 h-full w-64 bg-white shadow-xl p-8 flex flex-col gap-6">
          <button onClick={() => setIsOpen(false)} className="self-end text-gray-400 font-bold uppercase text-xs">Close ✕</button>
          
          <div className="flex flex-col gap-8 mt-10">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className={`text-2xl font-bold uppercase ${pathname === link.href ? 'text-orange-500' : 'text-gray-800'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="mt-auto border-t pt-6">
            <p className="text-xs text-gray-400 uppercase tracking-widest text-center italic">Mom's Stall Accra</p>
          </div>
        </div>
      </div>
    </nav>
  )
}