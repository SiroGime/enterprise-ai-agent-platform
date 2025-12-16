import type { AgentResult } from "../types/pipeline";

interface Props {
  title: string;
  result: AgentResult;
}

export default function AgentCard({ title, result }: Props) {
  const color =
    result.status === "success"
      ? "border-green-500"
      : result.status === "failed"
      ? "border-red-500"
      : "border-yellow-500";

  return (
    <div className={`border ${color} rounded-xl p-4 bg-zinc-900`}>
      <div className="flex justify-between mb-2">
        <h3 className="font-semibold">{title}</h3>
        {result.duration_ms && (
          <span className="text-xs text-zinc-400">
            {result.duration_ms} ms
          </span>
        )}
      </div>

      <pre className="text-xs whitespace-pre-wrap">
        {result.data
          ? JSON.stringify(result.data, null, 2)
          : result.error || "Pending..."}
      </pre>
    </div>
  );
}
