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

enterprise-ai-agent-platform/
  backend/
    src/
      api/          # Endpoints REST organizados por módulo
      core/         # Núcleo de agentes, herramientas, orquestación
      rag/          # Ingesta, embeddings, chunking, vector stores
      config/       # Variables de entorno, loaders y configuración global
      utils/        # Utilidades compartidas
      app.js        # Configuración de Express
      server.js     # Init del servidor HTTP
    package.json
  .gitignore
  README.md

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


## **Estado Actual**

* Arquitectura base creada
* Módulo RAG inicial implementado
* Extractores para TXT, DOCX y otros formatos
* Limpieza y chunking funcionando
* API inicial activa
