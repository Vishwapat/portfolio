import { ButtonLink } from "@/components/ui/button-link";
import { ArrowRight } from "@/components/ui/icons";

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] flex-col justify-center py-16">
      <p className="label">Error 404 / Sheet not found</p>
      <h1 className="mt-6 max-w-[16ch] font-serif text-title">
        This sheet is <em className="text-accent">missing</em> from the set.
      </h1>
      <p className="mt-6 max-w-[48ch] text-lg text-fg-soft">
        The page you asked for does not exist or has moved. The index is a safer place to start.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/" icon={<ArrowRight />}>
          Back home
        </ButtonLink>
        <ButtonLink href="/work" variant="outline" icon={<ArrowRight />}>
          See the work
        </ButtonLink>
      </div>
    </section>
  );
}
