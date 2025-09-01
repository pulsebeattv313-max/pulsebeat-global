export default function DonatePage() {
  const href = process.env.NEXT_PUBLIC_PAYPAL_DONATE_URL || "#";
  return (
    <div className="min-h-screen bg-pb-white dark:bg-black pt-20 page-transition">
      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-4xl font-bold text-pb-gray-900 dark:text-pb-white">Support Pulsebeat Global</h1>
        <p className="text-pb-gray-700 dark:text-pb-gray-300 mt-3 text-lg">
        Your gift powers original arts, entertainment, and culture programming.
      </p>
      <div className="mt-8 space-y-4">
        <p className="text-pb-gray-700 dark:text-pb-gray-300">
          Help us continue creating high-quality content that informs, entertains, and inspires. 
          Your support makes it possible for us to bring exclusive celebrity interviews, original 
          programming, and cultural coverage to audiences worldwide.
        </p>
        <p className="text-pb-gray-700 dark:text-pb-gray-300">
          Every donation, no matter the size, helps us maintain our independence and continue 
          producing the content you love.
        </p>
      </div>
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : "_self"}
        className="inline-block mt-8 px-8 py-4 rounded bg-pb-gold text-pb-gray-900 font-semibold text-lg shadow-soft hover:bg-pb-gold-light transition-colors duration-200"
      >
        Donate Now
      </a>
      <p className="text-sm text-pb-gray-600 dark:text-pb-gray-300 mt-6">
        Pulsebeat Global is committed to transparency and responsible use of donations.
      </p>
    </section>
    </div>
  );
}