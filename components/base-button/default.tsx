import { Button } from "@/components/ui/base-button";

export default function ButtonDemo() {
  return (
    <div className="flex items-center gap-4">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="mono">Mono</Button>
      <Button variant="dashed">Warning</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="dim">Dim</Button>
      <Button variant="foreground">Foreground</Button>
      <Button variant="inverse">Inverse</Button>
    </div>
  );
}
