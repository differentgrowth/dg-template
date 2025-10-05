import { SpinnerGapIcon } from "@phosphor-icons/react/dist/ssr";

export default function Loading() {
  return (
    <div className="my-24 flex items-center justify-center">
      {/* biome-ignore lint/a11y/useSemanticElements: I prefer this element */}
      <div role="status">
        <SpinnerGapIcon aria-hidden className="inline size-24 animate-spin" />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
