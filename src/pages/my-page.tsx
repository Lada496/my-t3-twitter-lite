import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import MyTweetsList from "~/components/MyTweetsList";
import Form from "~/components/Form";
export default function MyPage() {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {sessionData && (
        <>
          <p className="text-center text-2xl text-black">
            {sessionData && <MyTweetsList id={sessionData.user.id} />}
          </p>
          <Form />
        </>
      )}

      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
      <Link href="/" className="text-blue-500 hover:underline">
        Go to home page
      </Link>
    </div>
  );
}
