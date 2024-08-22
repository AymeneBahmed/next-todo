export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-gradient-to-b from-teal-400 to-blue-500 size-full grid place-content-center">
        {children}
      </div>
    </>
  );
}
