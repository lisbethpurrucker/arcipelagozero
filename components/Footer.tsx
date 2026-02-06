export default function Footer() {
  return (
    <footer
      className="fixed bottom-0 left-0 right-0 z-40"
      style={{
        backgroundImage: 'url(/images/pattern-lines-mint.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
        textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)',
      }}
    >
      <div className="py-4 sm:py-5 md:py-6 px-4 relative">
        <a
          href="mailto:arcipelago@zero.net"
          className="text-teal-dark text-xs sm:text-sm font-medium hover:underline transition-all block text-center"
        >
          arcipelago@zero.net
        </a>
        <p className="text-teal-dark/50 text-[10px] sm:text-xs font-medium mt-2 sm:mt-0 sm:absolute sm:bottom-4 md:bottom-6 sm:right-4">
          &copy; 2026, Arcipelago Zero
        </p>
      </div>
    </footer>
  )
}
