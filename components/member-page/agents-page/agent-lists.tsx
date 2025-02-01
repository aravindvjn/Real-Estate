import React from "react";
import { UserType } from "../../header/type";
import AgentCell from "./agent-cell";

const AgentLists = ({
  agents,
  verifiedAgents = false,
}: {
  agents: UserType[];
  verifiedAgents: boolean;
}) => {
  return (
    <div className=" p-5">
      <div className="text-2xl font-bold pb-2">
        {verifiedAgents ? "Our" : "Public"} Agents
      </div>
      <div className="flex flex-col gap-3 lg:gap-7 sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-5">
        {agents?.length > 0 &&agents.map((agent) => (
          <AgentCell key={agent.user_id} {...agent} />
        ))}
      </div>
      {agents?.length === 0 && <div className="py-5 text-center">No Agents are Found.</div>}
    </div>
  );
};

export default AgentLists;
