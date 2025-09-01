export default function TeamPage() {
  return (
    <div className="min-h-screen bg-pb-white dark:bg-black pt-20 page-transition">
      <section className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-4xl font-bold mb-6 text-pb-gray-900 dark:text-pb-white">Our Team</h1>
        <div className="prose prose-invert dark:prose-invert max-w-none space-y-4 text-pb-gray-700 dark:text-pb-gray-300">
        <p>
          Pulsebeat Global is powered by a diverse team of creators, producers, and visionaries who are 
          passionate about redefining media for the digital age.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-pb-gray-900 dark:text-pb-white">Leadership</h2>
        <p>
          Our leadership team brings decades of experience from the worlds of entertainment, technology, 
          and media production. Together, we&rsquo;re building the future of digital content.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-pb-gray-900 dark:text-pb-white">Creative Team</h2>
        <p>
          Our creative team includes award-winning directors, producers, writers, and editors who craft 
          every piece of content with precision and passion. We believe in the power of storytelling to 
          connect, inspire, and entertain.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-pb-gray-900 dark:text-pb-white">Join Us</h2>
        <p>
          We&rsquo;re always looking for talented individuals who share our vision. If you&rsquo;re passionate about 
          media, technology, and creating content that matters, we want to hear from you.
        </p>
        <a href="/contact" className="inline-block mt-4 px-5 py-3 rounded bg-pb-gold text-pb-gray-900 font-semibold hover:bg-pb-gold-light transition-colors duration-200">
          Get in Touch
        </a>
      </div>
    </section>
    </div>
  );
}