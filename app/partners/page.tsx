export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-pb-white dark:bg-pb-gray-900 pt-20 page-transition">
      <section className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-4xl font-bold mb-6 text-pb-gray-900 dark:text-pb-white">Our Partners</h1>
        <div className="prose prose-invert dark:prose-invert max-w-none space-y-4 text-pb-gray-700 dark:text-pb-gray-300">
        <p>
          Pulsebeat Global collaborates with industry leaders, innovative brands, and cultural institutions 
          to create meaningful partnerships that enhance our content and expand our reach.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-pb-gray-900 dark:text-pb-white">Content Partners</h2>
        <p>
          We work with production companies, talent agencies, and content creators to bring exclusive 
          interviews, behind-the-scenes footage, and original programming to our audience.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-pb-gray-900 dark:text-pb-white">Brand Collaborations</h2>
        <p>
          Our brand partnerships are built on shared values of authenticity, quality, and innovation. 
          We create custom content that resonates with our audience while delivering meaningful value 
          to our partners.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-pb-gray-900 dark:text-pb-white">Partnership Opportunities</h2>
        <p>
          Interested in partnering with Pulsebeat Global? We&rsquo;re always open to exploring new collaborations 
          that align with our mission and values. From content partnerships to brand collaborations, 
          we can create something amazing together.
        </p>
        <a href="/contact" className="inline-block mt-4 px-5 py-3 rounded bg-pb-gold text-pb-gray-900 font-semibold hover:bg-pb-gold-light transition-colors duration-200">
          Explore Partnership
        </a>
      </div>
    </section>
    </div>
  );
}