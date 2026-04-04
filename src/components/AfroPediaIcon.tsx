interface AfroPediaIconProps {
  size?: number
  className?: string
}

export function AfroPediaIcon({ size = 24, className = '' }: AfroPediaIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="AfroPedia icon"
      role="img"
      className={className}
      style={{ display: 'inline-block', flexShrink: 0 }}
    >
      <circle cx="256" cy="256" r="256" fill="#5C3D2E" />
      <circle cx="256" cy="210" r="155" fill="#FFFFFF" />
      <rect x="230" y="318" width="52" height="144" rx="26" fill="#FFFFFF" />
      <rect x="197" y="68" width="16" height="118" rx="8" fill="#5C3D2E" />
      <rect x="235" y="56" width="16" height="130" rx="8" fill="#5C3D2E" />
      <rect x="273" y="56" width="16" height="130" rx="8" fill="#5C3D2E" />
      <rect x="311" y="68" width="16" height="118" rx="8" fill="#5C3D2E" />
      <circle cx="256" cy="450" r="20" fill="#5C3D2E" />
    </svg>
  )
}
