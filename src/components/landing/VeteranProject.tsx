import React from "react";
import { ArrowRight, FileText } from "lucide-react";
import Image from "next/image";

const VETERAN_DOCS_IMG =
  "https://static.prod-images.emergentagent.com/jobs/80950cd3-ba3d-4e26-910f-4febc1ac68dd/images/c7d0486b9e68461cf8963a99f927d4723bffecde00b7944787b80a10968f132a.png";

const docs = [
  {
    head: "Office of Admissions",
    body: "We are pleased to inform you of your acceptance into the graduate program in Earth and Environmental Sciences.",
    sig: "Stanford University",
    tag: "ADM · 001",
    tilt: "tilt-1",
  },
  {
    head: "Admissions Committee",
    body: "Congratulations. Your application to the College of Arts and Sciences has been reviewed and accepted.",
    sig: "University of Maine",
    tag: "ADM · 002",
    tilt: "tilt-2",
  },
  {
    head: "Veterans Services",
    body: "Your transfer packet is complete. Welcome to the next chapter.",
    sig: "DD-214",
    tag: "VET · 214",
    tilt: "tilt-3",
  },
];

export default function VeteranProject() {
  return (
    <section
      id="project"
      data-testid="veteran-project"
      style={{
        background: "var(--ink)",
        color: "var(--paper)",
        borderBottom: "1px solid var(--ink)",
      }}
    >
      {/* Top strip */}
      <div
        className="grid grid-cols-12 items-center"
        style={{ borderBottom: "1px solid rgba(244,244,240,0.2)" }}
      >
        <div
          className="col-span-6 md:col-span-3 px-5 md:px-8 py-4 meta"
          style={{ borderRight: "1px solid rgba(244,244,240,0.2)", color: "rgba(244,244,240,0.6)" }}
        >
          § 04 — The Next Mission
        </div>
        <div className="hidden md:block col-span-6 px-8 py-4 meta" style={{ borderRight: "1px solid rgba(244,244,240,0.2)" }}>
          <span className="accent-text">●</span>&nbsp;&nbsp;Operational
        </div>
        <div className="hidden md:block col-span-3 px-8 py-4 meta text-right" style={{ color: "rgba(244,244,240,0.6)" }}>
          Classified · Open
        </div>
      </div>

      <div className="grid grid-cols-12">
        {/* LEFT: headline & body */}
        <div
          className="col-span-12 lg:col-span-7 px-5 md:px-8 lg:px-12 py-16 lg:py-24"
          style={{ borderRight: "1px solid rgba(244,244,240,0.2)" }}
        >
          <h2 className="h-display" style={{ fontSize: "clamp(48px, 8vw, 132px)" }}>
            The Veteran
            <br />
            Transfer
            <br />
            <span className="accent-text">Project.</span>
          </h2>

          <p className="font-serif-ed text-xl md:text-2xl leading-snug mt-12 max-w-[58ch]">
            The next mission begins in the classroom. Helping military veterans
            navigate the path toward elite academic institutions, intellectual
            growth, and renewed purpose after service.
          </p>
          <p className="font-serif-ed text-lg md:text-xl leading-snug mt-6 max-w-[58ch]" style={{ color: "rgba(244,244,240,0.65)" }}>
            Service develops discipline. Education expands possibility. The
            transition between the two should never be walked alone. Built from
            lived experience, this project offers guidance, strategy, and
            mentorship for veterans pursuing higher education and long-term
            transformation.
          </p>

          <div className="mt-12 flex flex-wrap gap-4">
            <a
              data-testid="vtp-explore"
              href="#letter"
              className="btn-stark"
              style={{ background: "var(--accent)", borderColor: "var(--accent)" }}
            >
              Explore The Mission <ArrowRight size={16} />
            </a>
            <a
              data-testid="vtp-manual"
              href="#letter"
              className="btn-ghost"
              style={{ borderColor: "var(--paper)", color: "var(--paper)" }}
            >
              Read The Manual <FileText size={16} />
            </a>
          </div>

          {/* Stats row */}
          <div className="mt-16 grid grid-cols-3 gap-6">
            <div>
              <div className="font-display font-black text-4xl md:text-5xl">01.</div>
              <div className="meta mt-2" style={{ color: "rgba(244,244,240,0.6)" }}>Application Strategy</div>
            </div>
            <div>
              <div className="font-display font-black text-4xl md:text-5xl">02.</div>
              <div className="meta mt-2" style={{ color: "rgba(244,244,240,0.6)" }}>Personal Statement</div>
            </div>
            <div>
              <div className="font-display font-black text-4xl md:text-5xl">03.</div>
              <div className="meta mt-2" style={{ color: "rgba(244,244,240,0.6)" }}>Long-Term Mentorship</div>
            </div>
          </div>
        </div>

        {/* RIGHT: case file image + paper documents */}
        <div className="col-span-12 lg:col-span-5 p-6 md:p-10 lg:p-12 flex flex-col gap-6 relative">
          {/* Veteran documents archival photo */}
          <div
            className="relative overflow-hidden"
            style={{ border: "1px solid rgba(244,244,240,0.2)", aspectRatio: "4 / 3" }}
          >
            <Image
              fill
              src={VETERAN_DOCS_IMG}
              alt="Veteran transfer documents"
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="w-full h-full object-cover"
              style={{ filter: "grayscale(100%) contrast(110%) brightness(90%)" }}
              loading="eager"
            />
            <div
              className="absolute top-3 left-3 meta px-2 py-1"
              style={{ background: "var(--ink)", border: "1px solid rgba(244,244,240,0.2)", color: "rgba(244,244,240,0.7)" }}
            >
              Case File · VTP-001
            </div>
          </div>

          {docs.map((d) => (
            <div
              key={d.tag}
              data-testid={`doc-${d.tag}`}
              className={`${d.tilt} relative transition-transform duration-300 hover:rotate-0 hover:translate-y-[-2px]`}
              style={{
                background: "var(--paper)",
                color: "var(--ink)",
                padding: "20px 22px",
                border: "1px solid var(--ink)",
                boxShadow: "6px 6px 0 0 rgba(255,59,0,0.9)",
              }}
            >
              <div className="flex items-center justify-between meta" style={{ color: "var(--muted)" }}>
                <span>{d.head}</span>
                <span>{d.tag}</span>
              </div>
              <p className="font-serif-ed text-lg md:text-xl mt-3 leading-snug">
                {d.body}
              </p>
              <div
                className="meta mt-4 pt-3"
                style={{ borderTop: "1px dashed var(--ink)" }}
              >
                — {d.sig}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
