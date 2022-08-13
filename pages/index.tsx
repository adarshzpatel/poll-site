import React from "react";
import type { NextPage } from "next";
import { trpc } from "../utils/trpc";

const QuestionCreator: React.FC = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const client = trpc.useContext();

  const { mutate, isLoading } = trpc.useMutation("questions.create", {
    onSuccess() {
      // invalidate queries forces it to refetch the questions when mutation is success
      client.invalidateQueries("questions.get-all");
      if (!inputRef.current) return;
      inputRef.current.value = "";
    },
  });

  return (
    <input
      ref={inputRef}
      disabled={isLoading}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          console.log("Enterrr ", event.currentTarget.value);
          mutate({ question: event.currentTarget.value });
          event.currentTarget.value = "";
        }
      }}
    ></input>
  );
};

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(["questions.get-all"]);

  if (isLoading || !data) return <div> Loading </div>;

  console.log(data);
  return (
    <div className="p-8">
      <div className="mb-4">
        <h6 className="text-2xl font-bold mb-4">Add a poll</h6>

        <QuestionCreator />
      </div>
      <div>
        <h6 className="text-2xl font-bold mb-4">Questions</h6>
        <div className="flex flex-col gap-4">
          {data?.map((q) => (
            <div className="question" key={q.id}>
              {q.question}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
