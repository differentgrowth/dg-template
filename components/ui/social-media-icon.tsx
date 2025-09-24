import type { IconProps } from "@phosphor-icons/react";

import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  TelegramLogoIcon,
  ThreadsLogoIcon,
  TiktokLogoIcon,
  WhatsappLogoIcon,
  XLogoIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react/dist/ssr";

const platformIcons = {
  facebook: (props: IconProps) => <FacebookLogoIcon {...props} />,
  instagram: (props: IconProps) => <InstagramLogoIcon {...props} />,
  linkedin: (props: IconProps) => <LinkedinLogoIcon {...props} />,
  telegram: (props: IconProps) => <TelegramLogoIcon {...props} />,
  threads: (props: IconProps) => <ThreadsLogoIcon {...props} />,
  tiktok: (props: IconProps) => <TiktokLogoIcon {...props} />,
  whatsapp: (props: IconProps) => <WhatsappLogoIcon {...props} />,
  x: (props: IconProps) => <XLogoIcon {...props} />,
  youtube: (props: IconProps) => <YoutubeLogoIcon {...props} />,
};

type PlatformIconProps = IconProps & {
  platform: keyof typeof platformIcons;
};

export const SocialMediaIcon = ({ platform, ...props }: PlatformIconProps) => {
  const Icon = platformIcons[platform];

  return <Icon weight="duotone" {...props} />;
};
