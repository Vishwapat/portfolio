import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/cn";

interface PortraitPlateProps {
  photo?: StaticImageData;
  className?: string;
}

/**
 * figure framed with print crop marks. shows the portrait when one is supplied,
 * otherwise a typographic plate so the layout never has a hole in it.
 */
export function PortraitPlate({ photo, className }: PortraitPlateProps) {
  return (
    <figure className={cn("crop-marks", className)}>
      <div className="relative aspect-[4/5] overflow-hidden bg-fg text-bg">
        {photo ? (
          <Image
            src={photo}
            alt="Portrait of Vishwa Patel"
            fill
            preload
            sizes="(min-width: 768px) 30vw, 70vw"
            placeholder="blur"
            className="object-cover grayscale-[15%]"
          />
        ) : (
          <div aria-hidden className="absolute inset-0 flex flex-col justify-between p-5">
            <div className="flex justify-between font-mono text-[0.65rem] tracking-[0.14em] uppercase opacity-60">
              <span>Plate</span>
              <span>4:5</span>
            </div>
            <div className="font-serif text-[clamp(6rem,18vw,11rem)] leading-[0.8] italic">
              V<span className="text-accent">.</span>
              <br />P
            </div>
            <div className="h-px bg-current opacity-30" />
          </div>
        )}
      </div>
      <figcaption className="label mt-3 flex justify-between gap-4">
        <span>Fig. 01</span>
        <span className="truncate">Brampton, ON</span>
      </figcaption>
    </figure>
  );
}
