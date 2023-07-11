import { useState, type FormEvent } from "react";
import { type User } from "next-auth";
import { api } from "~/utils/api";

const Form = ({ user }: { user: User }) => {
  const [text, setText] = useState("");
  const utils = api.useContext();
  const mutation = api.tweet.add.useMutation({
    async onMutate(text) {
      // Cancel any ongoing requests
      await utils.tweet.oneUser.cancel();

      // Get the previous data
      const prevData = utils.tweet.oneUser.getData({ id: user.id });

      // Create the new tweet object with an optimistic ID
      const optimistcId = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
      const newTweet = {
        id: optimistcId, // Generate a unique ID for the optimistic update
        text,
        createdAt: new Date(),
        userId: user.id,
        user,
      };

      // Update the data with the new tweet added optimistically
      //   utils.tweet.oneUser.setData({ id: user.id }, (old) => [...old, newTweet]);
      utils.tweet.oneUser.setData({ id: user.id }, [newTweet, ...prevData]);

      // Return the previous data for potential rollback on error
      return { prevData };
    },
    onError(err, text, ctx) {
      // If the mutation fails, use the context-value from onMutate
      utils.tweet.oneUser.setData({ id: user.id }, ctx?.prevData);
    },
    async onSettled() {
      // Sync with server once mutation has settled
      await utils.tweet.oneUser.invalidate();
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({ text });
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 box-border flex w-full flex-col items-center px-4"
    >
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="What's happening?"
        maxLength={280}
        rows={3}
        className="mb-2 w-full resize-none rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
      />
      <button
        type="submit"
        disabled={text.trim().length === 0}
        className="rounded bg-blue-500 px-4 py-2 font-semibold text-white disabled:opacity-50"
      >
        Tweet
      </button>
    </form>
  );
};

export default Form;
