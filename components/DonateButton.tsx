type Props = { size?: "sm" | "md" };

export default function DonateButton({ size = "md" }: Props) {
  const href = process.env.NEXT_PUBLIC_PAYPAL_DONATE_URL || "/donate";
  const cls = size === "sm"
    ? "px-3 py-2 text-sm"
    : "px-5 py-3";
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : "_self"}
      className={`${cls} rounded bg-pb-gold text-pb-black font-semibold`}
    >
      Donate
    </a>
  );
}