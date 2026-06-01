import { getSocialLinks } from '../../lib/brand'

export default function SocialLinks({ settings, className = '' }) {
  const social = getSocialLinks(settings)

  const links = [
    { key: 'instagram', href: social.instagram, label: 'Instagram', emoji: '📷' },
    { key: 'facebook', href: social.facebook, label: 'Facebook', emoji: '💬' },
  ].filter((l) => l.href)

  if (!links.length) return null

  return (
    <div className={`flex justify-center flex-wrap gap-3 ${className}`}>
      {links.map(({ key, href, label, emoji }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full glass text-sm font-semibold text-primary hover:bg-accent/80 transition-all hover:scale-105"
        >
          <span aria-hidden="true">{emoji}</span>
          {label}
        </a>
      ))}
    </div>
  )
}
