import { useSession } from "next-auth/react";
import MyTweetsList from "~/components/MyTweetsList";
import Form from "~/components/Form";
export default function MyPage() {
  const { data: sessionData } = useSession();

  return (
    <div className="container mx-auto flex w-full flex-col items-center justify-center gap-4">
      {sessionData ? (
        <>
          {sessionData && <MyTweetsList id={sessionData.user.id} />}
          <Form />
        </>
      ) : (
        <p>Please sign in to access your tweets</p>
      )}
    </div>
  );
}
