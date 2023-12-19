export default function ChildrenLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      {/* Include shared UI here e.g. a header or sidebar */}
      {children}
    </main>
  )
}