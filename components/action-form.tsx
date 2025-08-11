'use client';

import type { VariantProps } from 'class-variance-authority';

import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';

import { SpinnerGapIcon } from '@phosphor-icons/react';
import { track } from '@vercel/analytics';
import { toast } from 'sonner';

import { Button, type buttonVariants } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

type Props = Omit<React.FormHTMLAttributes<HTMLFormElement>, 'action'> & {
  action: (state: State, formData: FormData) => Promise<State>;
  children: React.ReactNode;
  className?: string;
  onSubmit?: () => void;
};

export type State =
  | {
      type: 'warning' | 'error' | 'info' | 'success';
      message: string;
      node?: React.ReactNode;
    }
  | undefined;

export const ActionForm = ({
  action,
  className,
  onSubmit,
  children,
}: Props) => {
  const [state, formAction] = useActionState(action, undefined);

  // biome-ignore lint/correctness/useExhaustiveDependencies: necessary
  useEffect(() => {
    if (typeof onSubmit !== 'undefined') {
      onSubmit();
    }

    if (!state?.type) {
      return;
    }

    toast[state.type](state?.message);
  }, [state]);

  return (
    <>
      <form action={formAction} className={className} noValidate spellCheck>
        {children}
      </form>
      {state?.node ? state.node : null}
    </>
  );
};

type SubmitButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  } & {
    trackName?: string;
    trackTitle?: string;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
  };

export const SubmitButton = ({
  icon,
  iconPosition = 'right',
  className,
  children,
  trackName,
  trackTitle,
  ...props
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  const renderIcon = () => {
    if (pending) {
      return <SpinnerGapIcon aria-hidden="true" className="animate-spin" />;
    }
    if (icon) {
      return icon;
    }
    return null;
  };

  return (
    <Button
      className={cn(
        iconPosition === 'right' ? '[&_svg]:order-2' : '[&_svg]:order-1',
        className
      )}
      onClick={() => {
        if (trackName) {
          track(trackName, {
            title: trackTitle || '',
          });
        }
      }}
      variant="default"
      {...props}
    >
      {children ? (
        <div className={cn(iconPosition === 'right' ? 'order-1' : 'order-2')}>
          {children}
        </div>
      ) : null}
      {renderIcon()}
    </Button>
  );
};

type SwitchProps = {
  name: string;
  id: string;
};

export const SwitchInput = ({ name, id }: SwitchProps) => {
  const [value, setValue] = useState(false);
  return (
    <>
      <input id={id} name={name} type="hidden" value={value ? 'on' : 'off'} />
      <Switch defaultChecked={value} onCheckedChange={setValue} />
    </>
  );
};
