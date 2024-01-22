import agentsJson from '@data/agents.json';
import { Agent } from '@types';
import TableLayout from '@components/TableLayout';

export default function AgentLayout() {

  const agents: Agent[] = agentsJson;
  agents.forEach(agent => agent.label = `${agent.code} [${agent.alias}]`)

  return (
    <TableLayout data={agents} />
  );
}
