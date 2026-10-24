"use client";

import Image from "next/image";
import {
  createContext,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

const HELP_OPTIONS = [
  "UI/UX Design",
  "Website Design",
  "Mobile App",
  "SaaS Product",
  "Development",
  "Branding",
  "AI Product",
  "Design System",
] as const;

const BUDGETS = ["$1K – $5K", "$5K – $10K", "$10K – $25K", "$25K – $50K", "$50K-$100K+"] as const;

const TRUST = ["Response within 24 hours", "NDA available", "Dedicated specialists"] as const;

const MAX_DETAILS = 500;
const MAX_FILE_BYTES = 20 * 1024 * 1024;

type CtaModalContextValue = {
  open: () => void;
};

const CtaModalContext = createContext<CtaModalContextValue | null>(null);

export function useCtaModal() {
  const value = useContext(CtaModalContext);
  if (!value) {
    throw new Error("useCtaModal must be used within CtaModalProvider");
  }
  return value;
}

export function CtaModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const value = useMemo(() => ({ open: () => setOpen(true) }), []);

  return (
    <CtaModalContext.Provider value={value}>
      {children}
      {isOpen ? <CtaModal onClose={() => setOpen(false)} /> : null}
    </CtaModalContext.Provider>
  );
}

/** Click target that opens the CTA modal. Use for hotspots that are not `CtaButton`. */
export function CtaModalTrigger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { open } = useCtaModal();
  return (
    <button type="button" onClick={open} className={cn("cursor-pointer text-left", className)}>
      {children}
    </button>
  );
}

function CheckTrust() {
  return (
    <span className="flex size-[19.6px] shrink-0 items-center justify-center rounded-[9.8px] border-[1.114px] border-[#b9e8d5] bg-[#e6f7f0]">
      <img src="/figma/cta/check-trust.svg" alt="" width={12.4639} height={12.4639} />
    </span>
  );
}

function CtaModal({ onClose }: { onClose: () => void }) {
  const titleId = useId();
  const detailsId = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [help, setHelp] = useState<string>("UI/UX Design");
  const [budget, setBudget] = useState<string>(BUDGETS[0]);
  const [details, setDetails] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ email?: string; help?: string; details?: string }>({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  function acceptFile(next: File | null) {
    if (!next) {
      setFile(null);
      setFileError(null);
      return;
    }
    const allowed = /\.(pdf|doc|docx|jpg|jpeg|png|zip)$/i.test(next.name);
    if (!allowed) {
      setFile(null);
      setFileError("Use PDF, DOC, JPG, PNG, or ZIP.");
      return;
    }
    if (next.size > MAX_FILE_BYTES) {
      setFile(null);
      setFileError("File must be 20MB or smaller.");
      return;
    }
    setFile(next);
    setFileError(null);
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const nextErrors: { email?: string; help?: string; details?: string } = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Enter a work email.";
    }
    if (!help) nextErrors.help = "Choose what we can help with.";
    if (!details.trim()) nextErrors.details = "Add a short project description.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setSent(true);
  }

  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto">
      <div className="relative flex min-h-full items-center justify-center p-3 sm:p-6">
        <button
          type="button"
          aria-label="Close dialog"
          className="absolute inset-0 bg-[#101513]/72"
          onClick={onClose}
        />
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          className="relative z-10 w-full max-w-[1226px] rounded-[28px] bg-white p-5 shadow-[0_4px_66px_rgba(0,171,12,0.1)] outline-none sm:p-[34px] lg:rounded-[46px]"
        >
          <div className="flex flex-col items-start gap-10 lg:flex-row lg:gap-[50px]">
            <div className="flex w-full flex-col gap-8 lg:h-[830px] lg:w-[538px] lg:shrink-0 lg:justify-between lg:gap-0">
              <div className="flex flex-col gap-[27px]">
                <span className="inline-flex h-[31px] items-center self-start rounded-full border-[1.114px] border-[#8fdabc] px-[13px] text-[12px] leading-[18px] font-semibold tracking-[0.48px] text-[#0a8551] uppercase">
                  Contact Us
                </span>
                <h2
                  id={titleId}
                  className="text-[36px] leading-[1.15] font-semibold tracking-[-0.02em] text-[#0f1623] sm:text-[48px] lg:text-[53px] lg:leading-[72px]"
                >
                  Tell Us About Your
                  <span className="mt-1 block font-normal text-[#0fa968] lg:mt-2 lg:leading-[80px]">
                    Next Project
                  </span>
                </h2>
              </div>

              <div className="flex flex-col gap-5">
                <p className="max-w-[538px] text-[16px] leading-[26px] text-[#697589]">
                  Have an idea, a challenge, or a product in mind? Tell us what you&apos;re
                  building and let&apos;s make it happen.
                </p>
                <ul className="flex flex-wrap gap-x-[14px] gap-y-2">
                  {TRUST.map((item) => (
                    <li key={item} className="flex items-center gap-[7px]">
                      <CheckTrust />
                      <span className="text-[15.6px] leading-[19px] font-medium text-[#3f4a5d]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <figure className="relative h-[280px] w-full overflow-hidden rounded-[20px] border-[1.114px] border-[#e4e8f0] bg-[#f5f7f6] sm:h-[340px] lg:h-[372px]">
                  <Image
                    src="/figma/cta/studio.png"
                    alt="Product specialists collaborating around a studio table"
                    fill
                    sizes="538px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[48%] to-[rgba(9,18,14,0.78)]" />
                  <figcaption className="absolute right-4 bottom-4 left-4 text-white">
                    <p className="text-[16.5px] leading-6 font-semibold">Inside Softvence</p>
                    <p className="text-[13.4px] leading-[19px] text-white/82">
                      Strategy, design, and engineering in one room.
                    </p>
                  </figcaption>
                </figure>
              </div>
            </div>

            <form onSubmit={onSubmit} className="flex w-full min-w-0 flex-col gap-[26px] lg:w-[570px] lg:shrink-0" noValidate>
              <div className="flex items-end justify-between gap-4 border-b border-[#e4e8f0] pb-3">
                <p className="text-[22px] leading-[25px] font-semibold text-[#0f1623] uppercase sm:text-[28px]">
                  Start a project
                </p>
                <p className="max-w-[180px] text-right text-[12px] leading-5 text-[#697589] sm:max-w-none">
                  Share the essentials. We&apos;ll take it from there.
                </p>
              </div>

              <label className="flex flex-col gap-4">
                <span className="text-[14px] leading-5 font-medium text-[#2b2b2b]">Full Name</span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Type your name here..."
                  autoComplete="name"
                  className="h-11 rounded-[11.2px] border border-transparent bg-[#f5f7f6] px-[14px] text-[12px] leading-5 text-[#0f1623] outline-none placeholder:text-[#9aa3b1] focus:border-[#0fa968]"
                />
              </label>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-3">
                  <span className="text-[14px] leading-5 font-medium text-[#2b2b2b]">Work Email*</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Type your email here..."
                    autoComplete="email"
                    aria-invalid={errors.email ? true : undefined}
                    className="h-[43px] rounded-[11.2px] border border-transparent bg-[#f5f7f6] px-[14px] text-[12px] leading-5 text-[#0f1623] outline-none placeholder:text-[#9aa3b1] focus:border-[#0fa968]"
                  />
                  {errors.email ? <span className="text-[12px] text-[#c2410c]">{errors.email}</span> : null}
                </label>
                <label className="flex flex-col gap-3">
                  <span className="text-[14px] leading-5 font-medium text-[#2b2b2b]">WhatsApp Number</span>
                  <span className="flex h-[43px] items-center overflow-hidden rounded-[11.2px] border border-transparent bg-[#f5f7f6] focus-within:border-[#0fa968]">
                    <span className="flex h-6 w-[63px] items-center justify-center border-r border-[#e4e8f0] text-[12.8px] text-[#0f1623]">
                      +880
                    </span>
                    <input
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="Type your whatsapp number here..."
                      inputMode="tel"
                      autoComplete="tel-national"
                      className="h-full min-w-0 flex-1 bg-transparent px-3 text-[12px] leading-5 text-[#0f1623] outline-none placeholder:text-[#9aa3b1]"
                    />
                  </span>
                </label>
              </div>

              <fieldset className="flex flex-col gap-4">
                <legend className="text-[14px] leading-5 font-medium text-[#2b2b2b]">
                  What can we help you with?*
                </legend>
                <div className="grid grid-cols-2 gap-x-[10px] gap-y-2 sm:grid-cols-4">
                  {HELP_OPTIONS.map((option, index) => {
                    const selected = help === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setHelp(option)}
                        className={cn(
                          "cta-help-pulse flex min-h-9 cursor-pointer items-center justify-center gap-[7px] rounded-full border-[1.125px] px-3 text-[12px] leading-5",
                          `cta-help-pulse-${index}`,
                          selected
                            ? "border-[#0fa968] bg-[#0fa968] text-white shadow-[0_7px_9px_rgba(15,169,104,0.16)]"
                            : "border-[#dce2e8] bg-white text-[#445064]",
                        )}
                      >
                        {selected ? (
                          <img src="/figma/cta/check-chip.svg" alt="" width={12.5867} height={12.5867} />
                        ) : null}
                        {option}
                      </button>
                    );
                  })}
                </div>
                {errors.help ? <span className="text-[12px] text-[#c2410c]">{errors.help}</span> : null}
              </fieldset>

              <fieldset className="flex flex-col gap-4">
                <legend className="text-[14px] leading-5 font-medium text-[#2b2b2b]">Project Budget</legend>
                <div className="flex flex-wrap gap-2 lg:flex-nowrap lg:justify-between">
                  {BUDGETS.map((option) => {
                    const selected = budget === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setBudget(option)}
                        className={cn(
                          "h-[41px] min-w-[108px] flex-1 cursor-pointer rounded-full border px-[6px] text-[12px] leading-5",
                          selected
                            ? "border-[#0fa968] bg-[#e6f7f0] text-[#087c4b]"
                            : "border-[#dce2e8] bg-white text-[#445064]",
                        )}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <label className="relative flex flex-col gap-4" htmlFor={detailsId}>
                <span className="text-[14px] leading-5 font-medium text-[#2b2b2b]">Project Details*</span>
                <textarea
                  id={detailsId}
                  value={details}
                  maxLength={MAX_DETAILS}
                  onChange={(event) => setDetails(event.target.value.slice(0, MAX_DETAILS))}
                  placeholder="Tell us briefly about your project, goals, timeline, or requirements..."
                  aria-invalid={errors.details ? true : undefined}
                  className="h-[92px] resize-none rounded-[11.2px] border border-transparent bg-[#f5f7f6] px-[14px] pt-3 pb-6 text-[12px] leading-5 text-[#0f1623] outline-none placeholder:text-[#9aa3b1] focus:border-[#0fa968]"
                />
                <span className="pointer-events-none absolute right-3 bottom-2 text-[11.2px] leading-[17px] text-[#9aa3b1]">
                  {details.length} / {MAX_DETAILS}
                </span>
                {errors.details ? <span className="-mt-2 text-[12px] text-[#c2410c]">{errors.details}</span> : null}
              </label>

              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] leading-5 font-medium text-[#2b2b2b]">Attach Files</span>
                  <span className="text-[9.3px] leading-[14px] font-bold tracking-[0.37px] text-[#84909f] uppercase">
                    Optional
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => {
                    event.preventDefault();
                    acceptFile(event.dataTransfer.files?.[0] ?? null);
                  }}
                  className="relative h-[68px] w-full cursor-pointer rounded-[12.8px] border border-dashed border-[#cbd6d0] bg-[#fbfcfb] text-left"
                >
                  <span className="absolute top-[14px] left-[13px] flex size-[38px] items-center justify-center rounded-[10.4px] border border-[#c4eadb] bg-[#e6f7f0]">
                    <img src="/figma/cta/upload.svg" alt="" width={20} height={20} />
                  </span>
                  <span className="absolute top-[18px] left-[63px] flex flex-col gap-[6px]">
                    <span className="text-[12px] leading-5 text-[#3a4658]">
                      {file ? file.name : "Drop files here or "}
                      {file ? null : <span className="text-[#07804c]">Browse</span>}
                    </span>
                    <span className="text-[9.6px] leading-[14px] text-[#98a1af]">
                      PDF, DOC, JPG, PNG, ZIP · Max 20MB
                    </span>
                  </span>
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip,application/pdf,image/jpeg,image/png,application/zip"
                  className="sr-only"
                  onChange={(event) => acceptFile(event.target.files?.[0] ?? null)}
                />
                {fileError ? <span className="text-[12px] text-[#c2410c]">{fileError}</span> : null}
              </div>

              <div className="flex flex-col items-start gap-4 border-t border-[#e4e8f0] py-[10px] sm:flex-row sm:items-center sm:gap-[41px]">
                <button
                  type="submit"
                  disabled={sent}
                  className="relative h-[56px] w-[121px] shrink-0 cursor-pointer rounded-full bg-brand text-white disabled:cursor-default"
                >
                  <span
                    className={cn(
                      "absolute top-1/2 left-[18px] -translate-y-1/2 text-[16px] leading-6 transition-opacity duration-300",
                      sent &&
                      "bg-gradient-to-r from-white from-[22%] to-transparent to-[67%] bg-clip-text text-transparent",
                    )}
                    style={{ transitionTimingFunction: "cubic-bezier(0, 0, 0.557, 1.466)" }}
                  >
                    Send
                  </span>
                  <img
                    src="/figma/cta/send-arrow.svg"
                    alt=""
                    width={42.1969}
                    height={42.1969}
                    className="absolute top-[7px] transition-[left] duration-300"
                    style={{
                      left: sent ? 7 : 71,
                      transitionTimingFunction: "cubic-bezier(0, 0, 0.557, 1.466)",
                    }}
                  />
                </button>
                <p className="text-[12px] leading-5 text-[#8590a1]">
                  Your information is private and will only be used to respond to your inquiry.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
