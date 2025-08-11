import type { ContactFormBlock as ContactFormBlockProps } from '@/payload-types';

import { sendEmail } from '@/app/actions';
import {
  ActionForm,
  SubmitButton,
  SwitchInput,
} from '@/components/action-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export const ContactForm = ({
  title,
  description,
  nameLabel,
  emailLabel,
  messageLabel,
  websiteLabel,
  agencyLabel,
}: ContactFormBlockProps) => {
  return (
    <section className="container">
      <ActionForm action={sendEmail} className="mx-auto max-w-xl">
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-3">
              <Label htmlFor="name">{nameLabel}</Label>
              <Input
                id="name"
                name="name"
                placeholder="Laura Pausini"
                type="text"
              />
            </div>
            <div className="flex flex-col space-y-3">
              <Label htmlFor="email">{emailLabel}</Label>
              <Input
                id="email"
                name="email"
                placeholder="me@email.com"
                type="email"
              />
            </div>
            {websiteLabel ? (
              <div className="flex flex-col space-y-3">
                <Label htmlFor="website">{websiteLabel}</Label>
                <Input
                  id="website"
                  inputMode="url"
                  name="website"
                  placeholder="https://..."
                  type="url"
                />
              </div>
            ) : null}
            {agencyLabel ? (
              <div className="flex flex-row items-center space-x-3">
                <SwitchInput id="agency" name="agency" />
                <Label htmlFor="agency">{agencyLabel}</Label>
              </div>
            ) : null}
            <div className="flex flex-col space-y-3">
              <Label htmlFor="message">{messageLabel}</Label>
              <Textarea id="message" name="message" rows={3} />
            </div>
            <div className="sr-only">
              <Label htmlFor="email2">¿Algo que tengamos que saber?</Label>
              <Input
                id="email2"
                name="email2"
                placeholder="honey@email.com"
                type="email"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <SubmitButton>Enviar</SubmitButton>
          </CardFooter>
        </Card>
      </ActionForm>
    </section>
  );
};
