import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export const RecognitionPanel = () => {
  const [running, setRunning] = useState(false);
  const [text, setText] = useState("");
  const [meaning, setMeaning] = useState("—");

  useEffect(() => {
    if (!running) return;
    const tokens = ["Hello", ",", " my", " name", " is", " Alex", "."];
    let i = 0;
    setText("");
    const id = setInterval(() => {
      setText((t) => t + tokens[i]);
      i++;
      if (i >= tokens.length) {
        setMeaning("Greeting / Introduction");
        clearInterval(id);
        setRunning(false);
      }
    }, 300);
    return () => clearInterval(id);
  }, [running]);

  return (
    <div className="rounded-lg border bg-card p-4 space-y-4">
      <div>
        <h3 className="font-medium text-sm text-muted-foreground">Recognized Text</h3>
        <div className="mt-2 rounded-md border p-3 min-h-16">
          <p className="text-base leading-relaxed">{text || '—'}</p>
        </div>
      </div>
      <div>
        <h3 className="font-medium text-sm text-muted-foreground">Semantic Meaning</h3>
        <div className="mt-2 rounded-md border p-3 min-h-12">
          <p>{meaning}</p>
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        <Button variant={running ? 'destructive' : 'hero'} onClick={() => setRunning((v) => !v)}>
          {running ? 'Stop Recognition' : 'Start Recognition'}
        </Button>
      </div>
    </div>
  );
};
