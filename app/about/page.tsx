export default function AboutPage() {
  return (
    <div className="min-h-screen bg-pb-white dark:bg-pb-gray-900 pt-20 page-transition">
      <section className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-4xl font-bold mb-6 text-pb-gray-900 dark:text-pb-white">About Pulsebeat Global</h1>
      <div className="prose prose-invert dark:prose-invert max-w-none space-y-4 text-pb-gray-700 dark:text-pb-gray-300">
        <p>
          Pulsebeat Global is the definitive media hub for a new generation. We are the pulse that connects 
          celebrity culture, original programming, and breaking news into one unified experience.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-pb-gray-900 dark:text-pb-white">Our Mission</h2>
        <p>
          We exist to create sensational, informative, and entertaining content that resonates with audiences 
          who demand authenticity and excellence. Our platform brings together the biggest names in entertainment 
          with fresh voices and perspectives that shape culture.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-pb-gray-900 dark:text-pb-white">What Sets Us Apart</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Exclusive celebrity interviews and behind-the-scenes access</li>
          <li>Original programming that pushes creative boundaries</li>
          <li>Real-time coverage of arts, entertainment, and culture</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-pb-gray-900 dark:text-pb-white">Join the Movement</h2>
        <p>
          Pulsebeat Global is more than a media platform—it&rsquo;s a movement. We&rsquo;re building a community of 
          creators, innovators, and culture enthusiasts who believe in the power of authentic storytelling.
        </p>
      </div>
      </section>
    </div>
  );
}