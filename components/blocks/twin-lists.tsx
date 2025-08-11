import type { TwinListBlock as TwinListsProps } from '@/payload-types';

import {
  ArrowRightIcon,
  CheckIcon,
  XIcon,
} from '@phosphor-icons/react/dist/ssr';

import { cn } from '@/lib/utils';

export const TwinLists = ({ leftList, rightList }: TwinListsProps) => {
  return (
    <div
      className={cn(
        'container max-w-7xl',
        'grid grid-cols-1 justify-evenly gap-6 sm:grid-cols-2'
      )}
    >
      <List {...leftList} />
      <List {...rightList} />
    </div>
  );
};

export const List = ({
  title,
  list,
}: NonNullable<TwinListsProps['leftList' | 'rightList']>) => {
  if (!list?.length) {
    return null;
  }

  return (
    <div>
      {title ? <h4>{title}</h4> : null}
      <dl>
        {list?.map((item) => (
          <div
            className={cn(
              'grid grid-cols-[min-content_1fr] items-center gap-x-1.5 p-2',
              'rounded-md even:bg-muted'
            )}
            key={item.id}
          >
            <div
              className={cn(
                item.description ? 'row-span-2 mt-1.5 self-start' : 'row-span-1'
              )}
            >
              {item.icon === 'check' ? (
                <CheckIcon aria-hidden="true" className="size-4" />
              ) : null}
              {item.icon === 'x-mark' ? (
                <XIcon aria-hidden="true" className="size-4" />
              ) : null}
              {item.icon === 'arrow' ? (
                <ArrowRightIcon aria-hidden="true" className="size-4" />
              ) : null}
            </div>
            <dt className={cn('mt-0', { 'self-start': item.description })}>
              {item.subtitle}
            </dt>
            {item.description ? (
              <dd className="pl-0">{item.description}</dd>
            ) : null}
          </div>
        ))}
      </dl>
    </div>
  );
};
