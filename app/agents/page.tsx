import AgentLists from "@/components/agents-page/agent-lists";
import { UserType } from "@/components/header/type";
import { getAgents } from "@/lib/functions/getAgents";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: {
    type: "public" | "";
  };
}) => {
  const { type } = await searchParams;
  let agents: UserType[] = [];

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

export default page;
