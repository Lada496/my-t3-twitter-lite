import React from "react";
import Header from "./Header";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-start bg-white">
      <Header />
      {children}
    </main>
  );
}

export default Layout;
