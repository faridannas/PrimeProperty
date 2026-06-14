import AgentLayoutWrapper from "@/components/agent/AgentLayoutWrapper";

// Layout khusus untuk semua rute /agent/* 
// Ini MENGGANTIKAN root layout (tidak mewarisi Header/Footer publik)
export default function AgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AgentLayoutWrapper>{children}</AgentLayoutWrapper>;
}
