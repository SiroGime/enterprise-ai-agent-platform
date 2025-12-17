import { useState } from "react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

export function UploadPanel({ onUpload }: { onUpload: (file: File) => void }) {
  const [file, setFile] = useState<File | null>(null);

  return (
    <Card>
      <h2 className="text-lg font-semibold mb-4">Subir documento</h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4 block w-full text-sm"
      />

      <Button disabled={!file} onClick={() => file && onUpload(file)}>
        Procesar documento
      </Button>
    </Card>
  );
}