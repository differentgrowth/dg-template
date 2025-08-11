import type { SVGProps } from 'react';

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
} from '@phosphor-icons/react/dist/ssr';

const platformIcons = {
  facebook: (props: SVGProps<SVGSVGElement>) => <FacebookLogoIcon {...props} />,
  instagram: (props: SVGProps<SVGSVGElement>) => (
    <InstagramLogoIcon {...props} />
  ),
  linkedin: (props: SVGProps<SVGSVGElement>) => <LinkedinLogoIcon {...props} />,
  telegram: (props: SVGProps<SVGSVGElement>) => <TelegramLogoIcon {...props} />,
  threads: (props: SVGProps<SVGSVGElement>) => <ThreadsLogoIcon {...props} />,
  tiktok: (props: SVGProps<SVGSVGElement>) => <TiktokLogoIcon {...props} />,
  whatsapp: (props: SVGProps<SVGSVGElement>) => <WhatsappLogoIcon {...props} />,
  x: (props: SVGProps<SVGSVGElement>) => <XLogoIcon {...props} />,
  youtube: (props: SVGProps<SVGSVGElement>) => <YoutubeLogoIcon {...props} />,
};

type PlatformIconProps = SVGProps<SVGSVGElement> & {
  platform: keyof typeof platformIcons;
};

export const SocialMediaIcon = ({ platform, ...props }: PlatformIconProps) => {
  const Icon = platformIcons[platform];

  return <Icon {...props} />;
};
