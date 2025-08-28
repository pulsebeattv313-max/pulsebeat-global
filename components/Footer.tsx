import SocialIcons from "./SocialIcons";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-16">
      <div className="mx-auto max-w-7xl px-4 py-10 grid gap-6 md:grid-cols-3">
        <div>
          <h4 className="text-lg font-semibold">Pulsebeat Global</h4>
          <p className="text-white/70 text-sm mt-2">
            The Pulse of a New Generation.
          </p>
        </div>
        <div>
          <ul className="space-y-2 text-sm">
            <li><a href="/partners">Partners</a></li>
            <li><a href="/team">Team</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </div>
        <div className="md:text-right">
          <SocialIcons />
          <p className="text-white/50 text-xs mt-3">&copy; {new Date().getFullYear()} Pulsebeat Global</p>
        </div>
      </div>
    </footer>
  );
}