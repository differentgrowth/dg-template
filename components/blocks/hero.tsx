import type { Page } from "@/payload-types";

import { HeroHighImpact } from "@/components/blocks/hero-high-impact";
import { HeroLowImpact } from "@/components/blocks/hero-low-impact";

export const Hero = (props: Pick<Page, "hero">) => {
  if (!(props.hero?.title || props.hero?.description)) {
    return null;
  }

  if (props.hero.impact === "low") {
    return <HeroLowImpact {...props} />;
  }

  return <HeroHighImpact {...props} />;
};
