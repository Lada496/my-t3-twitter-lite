import { useState, FormEvent } from "react";
import { z } from "zod";
import { api } from "~/utils/api";

const Form: React.FC = () => {
  const [text, setText] = useState("");

  const mutation = api.tweet.add.useMutation({ text });
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({ text });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="box-border flex w-full flex-col items-center"
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
