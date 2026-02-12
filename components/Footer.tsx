import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-[url('/images/pattern-lines-mint.png')] bg-[length:300%_auto] bg-[position:center_bottom] md:bg-cover md:bg-bottom">
      <div className="py-4 sm:py-5 md:py-6 px-4 flex flex-col items-center gap-2 md:block md:relative">
        <a
          href="mailto:arcipelago@zero.net"
          className="text-teal-dark text-sm sm:text-base font-semibold hover:underline transition-all block text-center [text-shadow:_0_1px_2px_rgba(255,255,255,0.6)]"
        >
          arcipelago@zero.net
        </a>
        <p className="text-teal-dark/50 text-[10px] sm:text-xs font-medium md:absolute md:bottom-4 lg:bottom-6 md:right-4">
          &copy; 2026, Arcipelago Zero
        </p>
      </div>
    </footer>
  )
}
