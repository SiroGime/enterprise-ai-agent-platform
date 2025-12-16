import { useState } from "react";

interface Props {
  onRun: (file: File) => void;
  loading: boolean;
}

export default function UploadCard({ onRun, loading }: Props) {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="text-xl font-semibold mb-4">Upload Document</h2>

      <input
        type="file"
        accept=".txt,.pdf,.docx"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4 block w-full text-sm"
      />

      <button
        disabled={!file || loading}
        onClick={() => file && onRun(file)}
        className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-black font-semibold px-4 py-2 rounded-lg"
      >
        {loading ? "Processing..." : "Run Pipeline"}
      </button>
    </div>
  );
}
