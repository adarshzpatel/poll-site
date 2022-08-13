import type { NextPage } from "next";
import { trpc } from "../utils/trpc";

const QuestionCreator: React.FC = () => {
  const { mutate } = trpc.useMutation("questions.create");

  return (
    <input
      onSubmit={(event) => {
        console.log();
      }}
    ></input>
  );
};

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(["questions.get-all"]);

  if (isLoading || !data) return <div> Loading </div>;

  console.log(data);
  return (
    <div>
      <div>
        <h6>Questions</h6>
        <div>
          {data?.map((q) => (
            <div key={q.id}>{q.question}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
