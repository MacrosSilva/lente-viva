export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="10.5" />
      <path d="M16 8.2 20.3 16 16 23.8 11.7 16Z" strokeLinejoin="round" />
      <circle cx="16" cy="16" r="2.1" fill="currentColor" stroke="none" />
    </svg>
  );
}
