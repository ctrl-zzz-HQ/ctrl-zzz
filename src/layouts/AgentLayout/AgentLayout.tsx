import agents from '@data/agents';
import TableLayout from '@components/TableLayout';

export default function AgentLayout() {

  agents.forEach(agent => agent.label = `${agent.code} [${agent.alias}]`)

  return (
    <TableLayout data={agents} />
  );
}
