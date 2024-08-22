export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-blue-300 size-full grid place-content-center">
        {children}
      </div>
    </>
  );
}
