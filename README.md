# **Enterprise AI Agent Platform**

Plataforma full‑stack diseñada para demostrar una  **arquitectura enterprise de análisis documental con IA** , combinando backend robusto (RAG + agentes orquestados) y frontend profesional orientado a producto.

---

## **Propósito del Proyecto**

Este proyecto fue construido como  **portfolio técnico avanzado** , con foco en:

* Arquitectura backend tolerante a fallos
* Orquestación de agentes de IA
* Procesamiento documental real
* Frontend conectado a un pipeline enterprise

Simula una plataforma utilizada por empresas para **analizar documentos complejos** (informes, contratos, facturas, etc.) mediante agentes especializados.

---

# **Arquitectura General**

```
enterprise-ai-agent-platform/
  backend/
    src/
      agents/        # Agentes de IA, orquestación y control de estados
      api/           # Controllers y rutas REST
      config/        # Archivo de configuración
      core/          # Ingesta, limpieza y chunking
      rag/           # Embeddings, vector store (Chroma) y consultas RAG
      utils/         # Normalizadores, parsers, helpers
  frontend/
    src/
      api/           # Cliente HTTP hacia el backend
      components/    # Componentes UI reutilizables
      pages/         # Vistas principales (Dashboard)
      types/         # Tipos TypeScript compartidos
  README.md
```

---

# **Backend – Características Clave**

* Pipeline completo RAG (Ingesta → Chunking → Embeddings → Query)
* Vector store con **ChromaDB**
* Agentes ejecutados vía **Ollama** (modelos locales)
* Orquestación con:
  * estados (`pending | success | failed`)
  * tiempos de ejecución
  * aislamiento de fallos
* Contratos JSON estables (schema‑first)

### Agentes disponibles

* **Analyst Agent** → resumen, puntos clave, riesgos, oportunidades
* **Classifier Agent** → tipo de documento y campos estructurados
* **Insights Agent** → conclusiones y recomendaciones

---

# **Frontend – Dashboard**

El frontend consume el pipeline completo y muestra los resultados en tiempo real.

### Funcionalidades

* Subida de archivos (TXT, PDF, DOCX)
* Ejecución del pipeline completo
* Visualización por agente:
  * estado
  * duración
  * salida estructurada
* Manejo de errores sin romper la UI

### Tecnologías Frontend

* **React + Vite**
* **TypeScript estricto**
* **Tailwind CSS v4**
* Arquitectura por capas (api / pages / components / types)

---

# **Cómo ejecutar el proyecto**

### 1️⃣ Backend

```bash
cd backend
npm install
npm run dev
```

### 2️⃣ ChromaDB

```bash
chroma run --host localhost --port 8000
```

### 3️⃣ Frontend

```bash
cd frontend
npm install
npm run dev
```

Abrir: [http://localhost:5173](http://localhost:5173/)

---

 Proyecto construido con foco en  **arquitectura, buenas prácticas y diseño profesional**.
