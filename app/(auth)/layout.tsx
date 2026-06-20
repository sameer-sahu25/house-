// This layout intentionally has no Sidebar or Header.
// It is used for standalone pages like /login.
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
