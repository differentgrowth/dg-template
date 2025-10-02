import Link from "next/link";

import { ArrowUUpLeftIcon } from "@phosphor-icons/react/dist/ssr";

import { Button } from "@/components/ui/button";

export default function Loading() {
  return (
    <main className="grid place-items-center py-24 sm:py-32">
      <div className="prose-xl prose dark:prose-invert container text-balance text-center">
        <p className="text-base text-primary">404</p>
        <h1 className="mt-4">Página no encontrada</h1>
        <p className="mt-6 text-muted-foreground">
          Lo sentimos, no pudimos encontrar la página que estás buscando.
        </p>
        <div className="mt-10 flex items-center justify-center">
          <Button asChild variant="ghost">
            <Link href="/">
              Volver al inicio
              <ArrowUUpLeftIcon />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
