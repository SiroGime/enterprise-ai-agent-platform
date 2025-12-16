export type AgentStatus = "pending" | "success" | "failed";

export type AgentResult<T = unknown> = {
  status: AgentStatus;
  duration_ms: number | null;
  data: T | null;
  error: string | null;
};

export type PipelineResponse = {
  status: string;
  meta: {
    file: string;
    chunks: number;
    chunksIndexed: number;
  };
  agents: {
    analyst: AgentResult;
    classifier: AgentResult;
    insights: AgentResult;
  };
};
