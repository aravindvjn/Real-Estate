import AgentLists from "@/components/member-page/agents-page/agent-lists";
import { UserType } from "@/components/header/type";
import { getAgents } from "@/lib/functions/getAgents";

interface PageProps {
  searchParams: Promise<{ type: "" | "public" }>;
}

const Page = async ({ searchParams }: PageProps) => {

  //extract type of agent from the searchparams
  const { type } = await searchParams;

  let agents: UserType[] = [];

  //get agent details conditionally.
  if (type === "public") {
    agents = await getAgents();
  } else {
    agents = await getAgents(true);
  }

  return (
    <div className="bg-white-1 h-dvh">
      <AgentLists verifiedAgents={!!!type} agents={agents} />
    </div>
  );
};

export default Page;
