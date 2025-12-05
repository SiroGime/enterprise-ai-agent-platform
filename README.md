
# **Enterprise AI Agent Platform**

Plataforma modular diseñada para crear y ejecutar **Agentes de Inteligencia Artificial** para entornos empresariales.

Incluye arquitectura escalable, integración con modelos de lenguaje, soporte para RAG y un backend preparado para producción.

## Propósito

Construir una base sólida para desarrollar soluciones de IA aplicadas a empresas, permitiendo:

* Automatizar tareas y procesos
* Analizar documentos y bases de conocimiento
* Integrarse con APIs internas y externas
* Orquestar agentes inteligentes y workflows
* Crear asistentes especializados para distintas áreas

## Arquitectura

<pre class="overflow-visible!" data-start="764" data-end="953"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>enterprise-ai-agent-platform/
  backend/
    src/
      api/
      core/
      rag/
      </span><span>config</span><span>/
      utils/
      app.js
      server.js
    </span><span>package</span><span>.json
  .gitignore
  README.md
</span></span></code></div></div></pre>

## Tecnologías

* Node.js + Express (backend)
* OpenAI / otros LLMs
* Vector Stores (Chroma, Pinecone, pgvector)
* Embeddings y RAG
* Arquitectura modular para agentes y tools

## API Inicial

| Endpoint             | Descripción                |
| -------------------- | --------------------------- |
| `/api/health`      | Estado del servicio         |
| `/api/agents/test` | Test del módulo de agentes |
| `/api/rag/test`    | Test del módulo RAG        |
