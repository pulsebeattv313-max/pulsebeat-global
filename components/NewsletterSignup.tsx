"use client";
import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setMessage("");

    try {
      // Here you would integrate with your email service (Stripe, Mailchimp, etc.)
      // For now, we'll simulate the API call
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("Thank you for subscribing! Check your email for confirmation.");
        setEmail("");
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 lg:px-8 mt-24 mb-16">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pb-purple/10 via-pb-gold/5 to-pb-accent/10 border border-pb-gold/20 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-pb-white/80 via-pb-white/60 to-pb-white/80 dark:from-black/80 dark:via-black/60 dark:to-black/80"></div>
        <div className="relative z-10 px-8 py-16 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold font-heading text-pb-gray-900 dark:text-pb-white mb-4">
            Never Miss a <span className="text-transparent bg-clip-text bg-gradient-to-r from-pb-gold to-pb-accent">Pulsebeat</span>
          </h2>
          <p className="text-lg text-pb-gray-700 dark:text-pb-gray-300 mb-8 max-w-2xl mx-auto">
            Get exclusive content, early access to new shows, and behind-the-scenes moments 
            delivered directly to your inbox.
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <input
                type="email"
                id="newsletter-email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={isSubmitting}
                className="w-full px-6 py-4 rounded-lg bg-pb-gray-100/50 dark:bg-pb-gray-700/50 border border-pb-gray-300 dark:border-pb-gray-600 text-pb-gray-900 dark:text-pb-white placeholder-pb-gray-600 dark:placeholder-pb-gray-300 focus:border-pb-gold focus:ring-2 focus:ring-pb-gold/20 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button 
                type="submit"
                disabled={isSubmitting || !email}
                className="w-full sm:w-auto px-8 py-4 rounded-lg bg-gradient-to-r from-pb-gold to-pb-gold-light text-pb-gray-900 font-bold hover:shadow-glow transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
            
            {message && (
              <p className={`text-sm mt-4 ${
                message.includes("Thank you") 
                  ? "text-green-600 dark:text-green-400" 
                  : "text-red-600 dark:text-red-400"
              }`}>
                {message}
              </p>
            )}
          </form>
          
          <p className="text-xs text-pb-gray-600 dark:text-pb-gray-300 mt-4">
            No spam. Unsubscribe anytime. Your privacy is protected.
          </p>
        </div>
      </div>
    </section>
  );
}
