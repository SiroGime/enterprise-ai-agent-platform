import type { PipelineResponse } from "../types/pipeline";

export async function runPipeline(file: File): Promise<PipelineResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/pipeline/full", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Pipeline failed");
  }

  return res.json();
}
