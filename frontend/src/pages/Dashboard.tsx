import { useState } from "react";
import UploadCard from "../components/UploadCard";
import AgentCard from "../components/AgentCard";
import Loader from "../components/Loader";
import { runPipeline } from "../api/pipeline";
import type { PipelineResponse } from "../types/pipeline";

export default function Dashboard() {
  const [data, setData] = useState<PipelineResponse | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleRun(file: File) {
    setLoading(true);
    setData(null);

    try {
      const result = await runPipeline(file);
      setData(result);
    } catch {
      alert("Pipeline error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <UploadCard onRun={handleRun} loading={loading} />

      {loading && <Loader />}

      {data && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {Object.entries(data.agents).map(([name, result]) => (
            <AgentCard
              key={name}
              title={name.toUpperCase()}
              result={result}
            />
          ))}
        </div>
      )}
    </div>
  );
}
