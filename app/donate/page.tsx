export default function DonatePage() {
  const href = process.env.NEXT_PUBLIC_PAYPAL_DONATE_URL || "#";
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-4xl font-bold">Support Pulsebeat Global</h1>
      <p className="text-white/80 mt-3 text-lg">
        Your gift powers original arts, entertainment, and culture programming.
      </p>
      <div className="mt-8 space-y-4">
        <p className="text-white/70">
          Help us continue creating high-quality content that informs, entertains, and inspires. 
          Your support makes it possible for us to bring exclusive celebrity interviews, original 
          programming, and cultural coverage to audiences worldwide.
        </p>
        <p className="text-white/70">
          Every donation, no matter the size, helps us maintain our independence and continue 
          producing the content you love.
        </p>
      </div>
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : "_self"}
        className="inline-block mt-8 px-8 py-4 rounded bg-pb-gold text-pb-black font-semibold text-lg shadow-soft hover:bg-pb-gold/90 transition"
      >
        Donate Now
      </a>
      <p className="text-sm text-white/50 mt-6">
        Pulsebeat Global is committed to transparency and responsible use of donations.
      </p>
    </section>
  );
}