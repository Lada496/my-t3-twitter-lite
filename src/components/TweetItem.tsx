import React from "react";
import { useSession } from "next-auth/react";
import FeatherIcon from "feather-icons-react";
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
    if (confirm("Are you sure to delete the tweet?")) {
      mutation.mutate({ id: tweet.id });
    }
  };

  return (
    <div className="w-full rounded-lg bg-white p-4 shadow-md">
      <p className="text-base text-sm font-semibold text-gray-600">
        <span className="font-semibold text-blue-500">{tweet.user.name}</span> -{" "}
        {tweet.createdAt.toDateString()}
      </p>

      <div className="w-100 mb-2 flex items-center justify-between">
        <p className="text-lg text-gray-700">{tweet.content}</p>
        {sessionData && (
          <button className="text-blue-500" onClick={handleDelete}>
            <FeatherIcon size={18} icon="trash-2" />
          </button>
        )}
      </div>
    </div>
  );
}

export default TweetItem;
