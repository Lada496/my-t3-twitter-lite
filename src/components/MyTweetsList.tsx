import React from "react";
import TweetItem from "./tweetItem";
import { api } from "~/utils/api";

function MyTweetsList({ id }: { id: string }) {
  const { data: tweets } = api.tweet.oneUser.useQuery({ id });
  console.log(tweets);
  if (!tweets) return <p>Loading...</p>;
  if (tweets.length === 0) return <p>You haven't tweeted yet</p>;
  return (
    <div className="mt-8 flex w-full flex-col items-center gap-4 px-4">
      {tweets.map((tweet) => (
        <TweetItem tweet={tweet} key={tweet.id} />
      ))}
    </div>
  );
}

export default MyTweetsList;
