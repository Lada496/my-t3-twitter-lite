import React from "react";
import TweetItem from "./TweetItem";
import { api } from "~/utils/api";

function MyTweetsList({ id }: { id: string }) {
  const { data: tweets } = api.tweet.oneUser.useQuery({ id });
  if (!tweets) return <p>Loading...</p>;
  if (tweets.length === 0) return <p>You haven&apos;t tweeted yet</p>;
  return (
    <div className="mt-8 flex w-full flex-col items-center gap-4 px-4">
      {tweets.map((tweet) => (
        <TweetItem tweet={tweet} key={tweet.id} />
      ))}
    </div>
  );
}

export default MyTweetsList;
