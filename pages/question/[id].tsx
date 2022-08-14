import { NextPage } from "next";
import { useRouter } from "next/router";
import { type } from "os";
import { trpc } from "../../utils/trpc";

const QuestionPageContent: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading, error } = trpc.useQuery([
    "questions.get-by-id",
    { id },
  ]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Question not found!</div>;
  }

  return (
    <div>
      <div className="text-2xl font-bold">{data?.question?.question}</div>
      {data?.isOwner && <div> Welcome master </div>}
      <div>
        {(data?.question?.options as string[])?.map((option) => (
          <div key={option}>{option}</div>
        ))}
      </div>
    </div>
  );
};

const QuestionPage: NextPage = () => {
  const { query } = useRouter();
  const { id } = query;

  if (!id || typeof id !== "string") {
    return <div>NO ID </div>;
  }

  return <QuestionPageContent id={id} />;
};

export default QuestionPage;
