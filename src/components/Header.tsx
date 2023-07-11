import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  const { pathname } = useRouter();
  const { data: sessionData } = useSession();
  return (
    <header className="m-6 box-border flex w-screen items-center justify-between">
      <h1 className="text-5xl font-extrabold tracking-tight text-blue-700 sm:text-6xl">
        {pathname === "/my-page" ? "My Tweets" : "Tweets"}
      </h1>
      <nav>
        <ul className="flex items-center space-x-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/my-page">My Page</Link>
          </li>
          <li>
            <button
              className="mr-6 rounded bg-blue-500 px-4 py-2 font-semibold text-white"
              onClick={sessionData ? () => void signOut() : () => void signIn()}
            >
              {sessionData ? "Sign out" : "Sign in"}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
