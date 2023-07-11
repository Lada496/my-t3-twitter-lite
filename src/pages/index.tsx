import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import TweetItem from "~/components/tweetItem";
import Header from "~/components/Header";

export default function Home() {
  const { data: tweets } = api.tweet.all.useQuery();

  console.log(tweets);
  tweets?.map((tweet) => {
    console.log(tweet);
  });

  return (
    <>
      <Head>
        <title>My T3 Twitter Lite</title>
        <meta
          name="description"
          content="Very lite Twitter-ish app generated by create-t3-app"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <main className="flex min-h-screen flex-col items-center justify-center bg-white"> */}
      <div className="container mx-auto px-4 py-16">
        {/* <Header title="Tweets" /> */}

        <div className="mt-8 flex w-full flex-col items-center gap-4">
          {tweets ? (
            tweets.length === 0 ? (
              <p className="text-2xl text-blue-700">No tweets found</p>
            ) : (
              <>
                {tweets.map((tweet) => (
                  <TweetItem tweet={tweet} key={tweet.id} />
                ))}
              </>
            )
          ) : (
            <p className="text-2xl text-blue-700">Loading...</p>
          )}
        </div>
      </div>
      {/* </main> */}
    </>
  );
}
