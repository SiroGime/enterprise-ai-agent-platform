# **Enterprise AI Agent Platform**

Plataforma modular diseñada para crear y ejecutar  **Agentes de Inteligencia Artificial empresariales** , con arquitectura escalable, soporte para RAG, orquestación de múltiples agentes y procesamiento de documentos.

---

## **Propósito**

Construir una base sólida para desarrollar soluciones de IA aplicadas a empresas, permitiendo:

* Automatizar tareas y procesos
* Analizar documentos, informes y bases de conocimiento
* Integrarse con APIs internas y externas
* Orquestar agentes inteligentes y flujos de trabajo
* Crear asistentes especializados para distintas áreas
* Ejecutar modelos locales utilizando **Ollama**

---

# **Arquitectura del Proyecto**

<pre class="overflow-visible! px-0!" data-start="934" data-end="1435"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>enterprise-ai-agent-platform/
  backend/
    src/
      agents/	    </span><span># Agentes y conexión con ollama</span>
      api/          </span><span># Endpoints REST organizados por módulo</span><span>
      core/         </span><span># Núcleo de agentes, tools, orquestación de prompts</span><span>
      rag/          </span><span># Ingesta, embeddings, chunking y vector store</span><span>
      config/       </span><span># Variables de entorno y configuración global</span><span>
      utils/        </span><span># Utilidades compartidas</span><span>
      app.js        </span><span># Configuración de Express</span><span>
      server.js     </span><span># Init del servidor HTTP</span><span>
    package.json
  .gitignore
  README.md
</span></span></code></div></div></pre>

---

## **Tecnologías**

* **Node.js + Express**
* **Ollama** para ejecución de modelos locales
  * Actualmente usando `qwen2.5:1.5b-instruct` (liviano y estable)
* Soporte para embeddings y RAG
* Arquitectura modular orientada a agentes
* Vector store simple en memoria (extensible a Chroma/Pinecone/pgvector)

---

---

# **Endpoints Principales**

El backend expone múltiples módulos separados por responsabilidad.

Cada módulo tiene su propio router y controlador, siguiendo una arquitectura limpia y escalable.

## **/api/health**

**Archivo:** `healthRoutes.js`

Endpoints básicos para verificar disponibilidad del servicio.

| Método | Endpoint        | Descripción                                                       |
| ------- | --------------- | ------------------------------------------------------------------ |
| GET     | `/api/health` | Responde con un mensaje para confirmar que el backend está activo |

---

## **/api/agents**

**Archivo:** `agentRoutes.js`

Controlador: `agentController.js`

Este módulo permite invocar agentes individuales directamente y probar su funcionamiento sin RAG.

| Método | Endpoint                 | Descripción                                       |
| ------- | ------------------------ | -------------------------------------------------- |
| GET     | `/api/agents/test`     | Prueba simple para verificar el módulo de agentes |
| POST    | `/api/agents/analyze`  | Ejecuta **AnalystAgent**sobre un texto      |
| POST    | `/api/agents/classify` | Ejecuta**ClassifierAgent**sobre un texto     |
| POST    | `/api/agents/insights` | Ejecuta**InsightsAgent**sobre un texto       |

**Uso típico:** debug y testing del comportamiento de cada agente por separado.

---

## **/api/rag**

Controla el pipeline tradicional de RAG sin agentes.

| Método | Endpoint            | Descripción                                                    |
| ------- | ------------------- | --------------------------------------------------------------- |
| POST    | `/api/rag/upload` | Sube un archivo, extrae texto, chunking, embeddings y lo indexa |
| POST    | `/api/rag/query`  | Permite realizar consultas sobre el vector store                |
| GET     | `/api/rag/test`   | Test simple del módulo                                         |

---

## **/api/ingestion**

Módulo enfocado solo en procesar archivos.

| Método | Endpoint                | Descripción                                                |
| ------- | ----------------------- | ----------------------------------------------------------- |
| POST    | `/api/ingestion/file` | Recibe un archivo, lo extrae y devuelve el texto resultante |

Sirve para debuggear la fase de ingesta sin chunking ni agentes.

---

## **/api/pipeline**

**Archivo:** `pipelineRoutes.js`

Controlador: `pipelineController.js`

Orquesta  **TODO el flujo completo** :

1. Extrae el archivo
2. Limpia el texto
3. Chunking
4. Indexación RAG
5. Consulta al vector-store
6. Pasaje de contexto a los agentes
7. Devolución del JSON final consolidado

| Método | Endpoint               | Descripción                               |
| ------- | ---------------------- | ------------------------------------------ |
| POST    | `/api/pipeline/full` | Ejecuta el pipeline completo RAG + agentes |

---



# **Módulo RAG**

El sistema RAG incluye:

* Ingesta de archivos (PDF, DOCX, TXT)
* Limpieza y normalización del texto
* Chunking configurable
* Almacenamiento vectorial en memoria
* Generación de contexto para agentes

# **Agentes Inteligentes**

Se implementó una  **orquestación de múltiples agentes** , cada uno ejecutado mediante Ollama:

## 
    1.**Analyst Agent**

Produce un análisis técnico del contexto:

* resumen
* key points
* riesgos
* oportunidades
* métricas
  ## 2.**Classifier Agent**

Genera una salida estructurada tipo JSON:

* categoría del documento
* campos clave
* estructura inferida
  ## 3.**Insights Agent**
* Entrega conclusiones y recomendaciones accionables.

Todos utilizan el RAG como entrada.

---

# **Estado Actual del Proyecto**

✔ Arquitectura base creada

✔ Pipeline RAG funcionando

✔ Extracción y chunking estables

✔ Vector store en memoria

✔ Agentes funcionando vía Ollama (`qwen2.5:1.5b-instruct`)

✔ Respuestas estructuradas en JSON
