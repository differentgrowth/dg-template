import { Badge } from "@/components/ui/badge";
import { Badge as BaseBadge } from "@/components/ui/base-badge";

export default function BadgeDemo() {
  return (
    <>
      <div className="flex items-center gap-4">
        <BaseBadge>Primary</BaseBadge>
        <BaseBadge variant="secondary">Secondary</BaseBadge>
        <BaseBadge variant="outline">Outline</BaseBadge>
        <BaseBadge variant="destructive">Destructive</BaseBadge>
        <BaseBadge variant="success">Success</BaseBadge>
        <BaseBadge variant="warning">Warning</BaseBadge>
        <BaseBadge variant="info">Info</BaseBadge>
      </div>
      <div className="flex items-center gap-4">
        <Badge>Primary</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="info">Info</Badge>
      </div>
    </>
  );
}
