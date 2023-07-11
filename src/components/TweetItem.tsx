import React from "react";
import { useSession } from "next-auth/react";
import { type RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

type ArryItems<T> = T extends (infer Item)[] ? Item : T;
type TweetItem = ArryItems<RouterOutputs["tweet"]["oneUser"]>;
type TweetItemProps = {
  tweet: Pick<TweetItem, "id" | "content" | "createdAt" | "userId" | "user">;
};

function TweetItem({ tweet }: TweetItemProps) {
  const { data: sessionData } = useSession();
  const mutation = api.tweet.delete.useMutation();
  const handleDelete = () => {
    mutation.mutate({ id: tweet.id });
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow-md">
      <p className="text-lg font-semibold text-blue-500">
        {tweet.user.name} - {tweet.createdAt.toDateString()}
      </p>
      <p className="text-gray-700">{tweet.content}</p>
      {sessionData && (
        <button className="text-red-500" onClick={handleDelete}>
          Delete Tweet
        </button>
      )}
    </div>
  );
}

export default TweetItem;
