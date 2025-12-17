import { useState } from "react";
import { UploadPanel } from "../components/upload/UploadPanel";
import { AgentCard } from "../components/agents/AgentCard";
import { Loader } from "../components/ui/Loader";
import { runPipeline } from "../api/pipeline";
import type { PipelineResponse } from "../types/pipeline";

export default function Dashboard() {
  const [data, setData] = useState<PipelineResponse | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleUpload(file: File) {
    setLoading(true);
    setData(null);
    const response = await runPipeline(file);
    setData(response);
    setLoading(false);
  }

  return (
    <div className="space-y-10">
      {/* HERO */}
      <section className="max-w">
        <h2 className="text-4xl font-extrabold mb-4">
          Procesamiento inteligente de documentos
        </h2>
        <p className="opacity-70 leading-relaxed">
          Plataforma enterprise de procesamiento inteligente de documentos que combina
          técnicas de <strong>Retrieval-Augmented Generation (RAG)</strong> y
          <strong> agentes de IA especializados</strong>.
          <br /><br />
          El <strong>Analyst Agent</strong> analiza el contenido del documento y genera
          un resumen ejecutivo, puntos clave, riesgos, oportunidades y métricas
          relevantes. <br /> 
          El <strong>Classifier Agent</strong> identifica automáticamente
          el tipo de documento (factura, contrato, informe, análisis u otro) y extrae
          campos estructurados cuando corresponde. <br /> 
          El <strong>Insights Agent </strong>
          produce conclusiones estratégicas y recomendaciones accionables a partir del
          contexto recuperado.
        </p>
      </section>

      <UploadPanel onUpload={handleUpload} />

      {loading && <Loader />}

      {data && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AgentCard title="Analyst Agent" result={data.agents.analyst} />
          <AgentCard title="Classifier Agent" result={data.agents.classifier} />
          <AgentCard title="Insights Agent" result={data.agents.insights} />
        </section>
      )}
    </div>
  );
}