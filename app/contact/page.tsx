export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
      <div className="text-center mb-8">
        <p className="text-white/80">
          Ready to connect? We&rsquo;d love to hear from you. Whether you have questions, partnership inquiries, 
          or just want to say hello, get in touch.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 mt-12">
        <div>
          <h2 className="text-xl font-semibold mb-4">General Inquiries</h2>
          <p className="text-white/70 mb-2">For general questions and support</p>
          <p className="text-pb-gold">hello@pulsebeatglobal.com</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Partnership Opportunities</h2>
          <p className="text-white/70 mb-2">For brand partnerships and collaborations</p>
          <p className="text-pb-gold">partnerships@pulsebeatglobal.com</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Press Inquiries</h2>
          <p className="text-white/70 mb-2">For media and press related questions</p>
          <p className="text-pb-gold">press@pulsebeatglobal.com</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Careers</h2>
          <p className="text-white/70 mb-2">Join our growing team</p>
          <p className="text-pb-gold">careers@pulsebeatglobal.com</p>
        </div>
      </div>
    </section>
  );
}