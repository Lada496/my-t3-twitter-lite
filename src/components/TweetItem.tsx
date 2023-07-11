import React from "react";
import { useSession } from "next-auth/react";
import FeatherIcon from "feather-icons-react";
import { type RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

type ArryItems<T> = T extends (infer Item)[] ? Item : T;
type TweetItemProps = ArryItems<RouterOutputs["tweet"]["oneUser"]>;

function TweetItem({ tweet }: { tweet: TweetItemProps }) {
  const { data: sessionData } = useSession();
  const utils = api.useContext();
  const mutation = api.tweet.delete.useMutation({
    async onMutate(id) {
      await utils.tweet.oneUser.cancel();
      const prevData = utils.tweet.oneUser.getData({ id: tweet.userId });

      utils.tweet.oneUser.setData({ id: tweet.userId }, (old) =>
        old?.filter((tweet) => tweet.id !== id)
      );
      return { prevData };
    },
    onError(err, id, ctx) {
      // If the mutation fails, use the context-value from onMutate
      utils.tweet.oneUser.setData({ id: tweet.userId }, ctx?.prevData);
    },
    async onSettled() {
      // Sync with server once mutation has settled
      await utils.tweet.oneUser.invalidate();
    },
  });
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
