import type { Page } from "@/payload-types";

import { HeroHighImpact } from "@/components/blocks/hero-high-impact";
import { HeroLowImpact } from "@/components/blocks/hero-low-impact";

export const Hero = (props: Page["hero"]) => {
  if (!(props?.title || props?.description)) {
    return null;
  }

  if (props.impact === "low") {
    return <HeroLowImpact {...props} />;
  }

  return <HeroHighImpact {...props} />;
};
