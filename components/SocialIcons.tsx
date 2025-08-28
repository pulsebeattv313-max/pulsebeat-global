export default function SocialIcons() {
  return (
    <div className="flex md:justify-end gap-4">
      <a aria-label="YouTube" href={process.env.NEXT_PUBLIC_YOUTUBE || "#"} target="_blank">
        <img src="/social/youtube.svg" alt="" className="h-6 w-6" />
      </a>
      <a aria-label="Instagram" href={process.env.NEXT_PUBLIC_INSTAGRAM || "#"} target="_blank">
        <img src="/social/instagram.svg" alt="" className="h-6 w-6" />
      </a>
      <a aria-label="Twitter" href={process.env.NEXT_PUBLIC_TWITTER || "#"} target="_blank">
        <img src="/social/twitter.svg" alt="" className="h-6 w-6" />
      </a>
    </div>
  );
}