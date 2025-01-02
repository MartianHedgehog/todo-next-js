import { ReactNode } from "react";

export default function RegistrationPage({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex flex-col h-screen">
      <main className="flex-grow">{children}</main>
    </div>
  );
}
