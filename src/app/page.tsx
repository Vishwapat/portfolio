import { site } from "@/config/site";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col justify-center px-6 py-24">
      <p className="font-mono text-sm tracking-widest text-muted uppercase">In progress</p>
      <h1 className="mt-4 text-5xl font-semibold tracking-tight">{site.name}</h1>
      <p className="mt-6 text-lg text-muted">{site.description}</p>
      <p className="mt-10 font-mono text-sm">
        <a className="underline underline-offset-4" href={site.links.github}>
          github
        </a>
        <span aria-hidden="true"> / </span>
        <a className="underline underline-offset-4" href={site.links.linkedin}>
          linkedin
        </a>
      </p>
    </main>
  );
}
