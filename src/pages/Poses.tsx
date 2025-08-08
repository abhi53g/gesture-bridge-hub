import { SEO } from "@/components/SEO";
import { PoseViewer3D } from "@/components/poses/PoseViewer3D";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Poses = () => {
  return (
    <div className="container mx-auto py-10">
      <SEO title="Pose Search — SignAI" description="Explore gestures with an interactive 3D viewer and semantic search." />
      <h1 className="font-display text-2xl mb-4">Pose Visualization & Semantic Search</h1>
      <PoseViewer3D />

      <div className="mt-6">
        <label className="text-sm text-muted-foreground">Search by meaning or pose similarity</label>
        <Input placeholder="e.g., thank you, hello, introduction" />
      </div>

      <div className="grid gap-4 md:grid-cols-3 mt-6">
        {["Hello", "Thank you", "Help"].map((name, i) => (
          <Card key={i} className="hover-scale">
            <CardHeader>
              <CardTitle>{name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Matching score: {(90 - i*7)}%</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Poses;
