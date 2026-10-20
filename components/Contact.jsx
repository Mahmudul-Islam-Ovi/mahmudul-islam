"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { profile } from "@/lib/data";
import {
  MailIcon,
  PhoneIcon,
  LinkedInIcon,
  GitHubIcon,
  CopyIcon,
  CheckIcon,
  ExternalLinkIcon,
  DownloadIcon,
} from "@/components/Icons";

const channels = [
  {
    id: "email",
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    Icon: MailIcon,
    color: "#00ff9c",
    copyable: true,
  },
  {
    id: "phone",
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone}`,
    Icon: PhoneIcon,
    color: "#00e5ff",
    copyable: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "mahmudul-islam",
    href: profile.linkedin,
    Icon: LinkedInIcon,
    color: "#8b5cf6",
    isExternal: true,
  },
  {
    id: "github",
    label: "GitHub",
    value: "Mahmudul-Islam-Ovi",
    href: profile.github,
    Icon: GitHubIcon,
    color: "#ff2bd6",
    isExternal: true,
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (e, id, value) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(value);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId((current) => (current === id ? null : current));
    }, 2000);
  };

  // Opens the visitor's mail app with the message pre-filled
  const submit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— Sent by: ${form.name} (${form.email})`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const input =
    "w-full rounded-lg border border-white/10 bg-black/50 px-4 py-3 font-mono text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-neon focus:shadow-[0_0_20px_rgba(0,255,156,0.25)]";

  return (
    <section id="contact" className="relative px-5 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle tag="contact.sh" title="Let's connect" />

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Left Column: Channels + CV Card */}
          <div className="grid gap-4">
            {channels.map((c, i) => (
              <motion.a
                key={c.id}
                href={c.href}
                target={c.isExternal ? "_blank" : undefined}
                rel="noreferrer"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rgb-card group flex items-center justify-between p-4 sm:p-5 transition-all hover:scale-[1.01]"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-110"
                    style={{
                      color: c.color,
                      borderColor: `${c.color}55`,
                      background: `${c.color}14`,
                      boxShadow: `0 0 20px ${c.color}33`,
                    }}
                  >
                    <c.Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <span className="block font-mono text-[11px] uppercase tracking-wider text-slate-500">
                      {c.label}
                    </span>
                    <span className="block truncate font-mono text-sm font-medium text-white transition-colors group-hover:text-neon">
                      {c.value}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pl-2">
                  {c.copyable && (
                    <button
                      type="button"
                      onClick={(e) => handleCopy(e, c.id, c.value)}
                      title="Copy to clipboard"
                      className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-void/80 px-2.5 py-1.5 font-mono text-xs text-slate-400 transition-all hover:border-neon hover:text-neon"
                    >
                      {copiedId === c.id ? (
                        <>
                          <CheckIcon className="h-3.5 w-3.5 text-neon" />
                          <span className="text-neon text-[11px]">Copied!</span>
                        </>
                      ) : (
                        <>
                          <CopyIcon className="h-3.5 w-3.5" />
                          <span className="text-[11px] hidden sm:inline">Copy</span>
                        </>
                      )}
                    </button>
                  )}

                  {c.isExternal && (
                    <span className="text-slate-500 transition-colors group-hover:text-white">
                      <ExternalLinkIcon className="h-4 w-4" />
                    </span>
                  )}
                </div>
              </motion.a>
            ))}

            {/* Quick Resume Download Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="rgb-card relative overflow-hidden p-5 border border-cyan/30"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-cyan animate-pulse" />
                    <span className="font-mono text-xs uppercase tracking-widest text-cyan">
                      Offline Reference
                    </span>
                  </div>
                  <h4 className="mt-1 text-base font-bold text-white">
                    Need a print-ready resume?
                  </h4>
                  <p className="font-mono text-xs text-slate-400">
                    PDF includes education, credentials, experience & contact details.
                  </p>
                </div>
                <a
                  href={profile.resume || "/resume.pdf"}
                  download="Md_Mahmudul_Islam_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-rgb shrink-0 !py-2.5 !px-4 text-xs font-mono"
                >
                  <DownloadIcon className="h-4 w-4" />
                  <span>GET CV (PDF)</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Secure Transmission Form */}
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rgb-card space-y-5 p-7"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <p className="font-mono text-sm text-neon">$ send_message --secure</p>
              <span className="font-mono text-[11px] text-slate-500">
                [ AES-256 / SSL ]
              </span>
            </div>

            <div>
              <label className="mb-1.5 block font-mono text-xs text-slate-400">
                IDENTIFIER // NAME:
              </label>
              <input
                required
                className={input}
                placeholder="e.g. John Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div>
              <label className="mb-1.5 block font-mono text-xs text-slate-400">
                RETURN ADDRESS // EMAIL:
              </label>
              <input
                required
                type="email"
                className={input}
                placeholder="e.g. john@company.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div>
              <label className="mb-1.5 block font-mono text-xs text-slate-400">
                PAYLOAD // MESSAGE:
              </label>
              <textarea
                required
                rows={4}
                className={input}
                placeholder="// Tell me about your project, security audit, or hiring role..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>

            <button type="submit" className="btn-rgb w-full justify-center">
              TRANSMIT MESSAGE →
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
