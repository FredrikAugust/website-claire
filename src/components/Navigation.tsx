import Link from 'next/link'
import { MobileMenu } from './MobileMenu'

const navLinks = [
  { href: '/works', label: 'Works' },
  { href: '/film', label: 'Film' },
  { href: '/performance', label: 'Performance' },
  { href: '/about', label: 'About' },
  { href: '/cv', label: 'CV' },
  { href: '/contact', label: 'Contact' },
]

export function Navigation({ artistName }: { artistName: string }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        <Link href="/" className="font-heading text-xl tracking-tight text-foreground">
          {artistName}
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-xs uppercase tracking-[0.2em] text-foreground hover:text-foreground transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-foreground after:transition-all hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <MobileMenu artistName={artistName} links={navLinks} />
      </div>
    </nav>
  )
}
