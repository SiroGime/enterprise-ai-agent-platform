import type { AgentResult } from "../../types/pipeline";
import { Card } from "../ui/Card";

interface Props {
  title: string;
  result: AgentResult<unknown>;
}

export function AgentCard({ title, result }: Props) {
  const color =
    result.status === "success"
      ? "border-green-500"
      : result.status === "failed"
      ? "border-red-500"
      : "border-yellow-500";

  return (
    <Card>
      <div className={`border-l-4 ${color} pl-4`}>
        <div className="flex justify-between mb-2">
          <h3 className="font-semibold">{title}</h3>
          {result.duration_ms && (
            <span className="text-xs opacity-60">
              {result.duration_ms} ms
            </span>
          )}
        </div>

        <pre className="text-xs whitespace-pre-wrap opacity-80">
          {result.data
            ? JSON.stringify(result.data, null, 2)
            : result.error || "Pendiente"}
        </pre>
      </div>
    </Card>
  );
}