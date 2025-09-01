export default function ContactPage() {
  return (
    <div className="min-h-screen bg-pb-white dark:bg-pb-gray-900 pt-20 page-transition">
      <section className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-4xl font-bold mb-6 text-center text-pb-gray-900 dark:text-pb-white">Contact Us</h1>
        <div className="text-center mb-8">
          <p className="text-pb-gray-700 dark:text-pb-gray-300">
          Ready to connect? We&rsquo;d love to hear from you. Whether you have questions, partnership inquiries, 
          or just want to say hello, get in touch.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 mt-12">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-pb-gray-900 dark:text-pb-white">General Inquiries</h2>
                            <p className="text-pb-gray-700 dark:text-pb-gray-300 mb-2">For general questions and support</p>
          <p className="text-pb-gold">hello@pulsebeatglobal.com</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4 text-pb-gray-900 dark:text-pb-white">Partnership Opportunities</h2>
                            <p className="text-pb-gray-700 dark:text-pb-gray-300 mb-2">For brand partnerships and collaborations</p>
          <p className="text-pb-gold">partnerships@pulsebeatglobal.com</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4 text-pb-gray-900 dark:text-pb-white">Press Inquiries</h2>
                            <p className="text-pb-gray-700 dark:text-pb-gray-300 mb-2">For media and press related questions</p>
          <p className="text-pb-gold">press@pulsebeatglobal.com</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4 text-pb-gray-900 dark:text-pb-white">Careers</h2>
                            <p className="text-pb-gray-700 dark:text-pb-gray-300 mb-2">Join our growing team</p>
          <p className="text-pb-gold">careers@pulsebeatglobal.com</p>
        </div>
      </div>
    </section>
    </div>
  );
}