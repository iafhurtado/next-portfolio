"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import {
  canvasNodes,
  judgeAttachments,
  replay,
  type CanvasNode,
  type CanvasNodeKind,
} from "@/lib/automation";

const NODE = 72;
const AGENT_W = 220;
const STEP_MS = 650;
const VIEW_W = 1140;
const VIEW_H = 484;

const kindColor: Record<CanvasNodeKind, string> = {
  trigger: "#f59e0b",
  data: "#38bdf8",
  logic: "#a3e635",
  code: "#fb923c",
  sub: "#c084fc",
  agent: "#f59e0b",
  notify: "#f472b6",
};

type Status = "idle" | "active" | "done";

function widthOf(node: CanvasNode) {
  return node.kind === "agent" ? AGENT_W : NODE;
}

function Glyph({ kind, color }: { kind: CanvasNodeKind; color: string }) {
  const common = {
    fill: "none",
    stroke: color,
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (kind) {
    case "trigger":
      return (
        <g {...common}>
          <circle cx="36" cy="36" r="13" />
          <path d="M36 28v8l6 4" />
        </g>
      );
    case "data":
      return (
        <g {...common}>
          <rect x="23" y="25" width="26" height="22" rx="3" />
          <path d="M23 33h26M23 40h26M32 33v14" />
        </g>
      );
    case "logic":
      return (
        <g {...common}>
          <path d="M22 36h9M31 36l8-9h11M31 36l8 9h11" />
          <circle cx="22" cy="36" r="1.5" />
        </g>
      );
    case "code":
      return (
        <g {...common}>
          <path d="M31 26c-4 0-4 3-4 5s0 5-4 5c4 0 4 3 4 5s0 5 4 5" />
          <path d="M41 26c4 0 4 3 4 5s0 5 4 5c-4 0-4 3-4 5s0 5-4 5" />
        </g>
      );
    case "sub":
      return (
        <g {...common}>
          <rect x="22" y="24" width="18" height="14" rx="3" />
          <rect x="32" y="34" width="18" height="14" rx="3" />
        </g>
      );
    case "notify":
      return (
        <g {...common}>
          <path d="M27 42h18l-2-4v-6a7 7 0 0 0-14 0v6z" />
          <path d="M33 46a3 3 0 0 0 6 0" />
        </g>
      );
    default:
      return null;
  }
}

function CheckBadge({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="9" fill="#16a34a" stroke="#0c0c0c" strokeWidth="2" />
      <path d="M-4 0l3 3 5-6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

// Edge leaving node i towards node i + 1.
function edgePath(from: CanvasNode, to: CanvasNode) {
  const startX = from.x + widthOf(from);
  const startY = from.y + NODE / 2;
  const endY = to.y + NODE / 2;
  if (from.y === to.y) return `M${startX} ${startY} H${to.x}`;
  // Wrap from the end of the first row to the start of the second.
  const right = startX + 44;
  const mid = (from.y + NODE + to.y) / 2 + 28;
  const left = to.x - 42;
  const r = 16;
  return [
    `M${startX} ${startY}`,
    `H${right - r}`,
    `Q${right} ${startY} ${right} ${startY + r}`,
    `V${mid - r}`,
    `Q${right} ${mid} ${right - r} ${mid}`,
    `H${left + r}`,
    `Q${left} ${mid} ${left} ${mid + r}`,
    `V${endY - r}`,
    `Q${left} ${endY} ${left + r} ${endY}`,
    `H${to.x}`,
  ].join(" ");
}

function countPosition(from: CanvasNode, to: CanvasNode) {
  if (from.y === to.y) {
    return { x: (from.x + widthOf(from) + to.x) / 2, y: from.y + NODE / 2 - 14 };
  }
  return { x: VIEW_W - 280, y: (from.y + NODE + to.y) / 2 + 28 - 14 };
}

export function WorkflowCanvas() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(-1); // index of the active node; nodes.length = finished
  const [running, setRunning] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const autoPlayed = useRef(false);

  const total = canvasNodes.length;

  const stop = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  }, []);

  const play = useCallback(() => {
    stop();
    setSelected(null);
    if (reduceMotion) {
      setStep(total);
      setRunning(false);
      return;
    }
    setRunning(true);
    setStep(0);
    timer.current = setInterval(() => {
      setStep((current) => {
        const next = current + 1;
        if (next >= total) {
          stop();
          setRunning(false);
          return total;
        }
        return next;
      });
    }, STEP_MS);
  }, [reduceMotion, stop, total]);

  useEffect(() => {
    if (!inView || autoPlayed.current) return;
    // Start the first replay shortly after the canvas scrolls into view.
    const start = setTimeout(() => {
      autoPlayed.current = true;
      play();
    }, 350);
    return () => clearTimeout(start);
  }, [inView, play]);

  useEffect(() => stop, [stop]);

  // On narrow screens the canvas scrolls sideways: keep the running step in view.
  useEffect(() => {
    const box = scroller.current;
    const node = canvasNodes[step];
    if (!box || !node || box.scrollWidth <= box.clientWidth) return;
    const centre = ((node.x + widthOf(node) / 2) / VIEW_W) * box.scrollWidth;
    box.scrollTo({ left: centre - box.clientWidth / 2, behavior: "smooth" });
  }, [step]);

  const statusOf = (index: number): Status => {
    if (step < 0) return "idle";
    if (index < step) return "done";
    if (index === step) return "active";
    return "idle";
  };

  const judge = canvasNodes.find((node) => node.id === "judge")!;
  const finished = step >= total;
  const activeNode = step >= 0 && step < total ? canvasNodes[step] : null;
  const shown =
    canvasNodes.find((node) => node.id === selected) ?? activeNode ?? judge;
  const judgeIndex = canvasNodes.indexOf(judge);
  const guard = canvasNodes.find((node) => node.id === "guard")!;
  const ok = canvasNodes.find((node) => node.id === "ok")!;

  return (
    <div ref={ref} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[#101012]">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] px-4 py-3 sm:px-5">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-[var(--foreground)]">
            Business Development Manager
            <span className="ml-2 rounded-full border border-[var(--border)] px-2 py-0.5 text-[11px] font-normal text-[var(--muted)]">
              orchestrator
            </span>
          </p>
          <p className="mt-0.5 text-xs text-[var(--muted)]" aria-live="polite">
            {finished
              ? `Run succeeded. Replay of a real run: ${replay.runLabel}.`
              : running
                ? `Running: ${activeNode?.name ?? ""}`
                : `Replay of a real run: ${replay.runLabel}.`}
          </p>
        </div>
        <button
          type="button"
          onClick={play}
          disabled={running}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-[var(--background)] transition-transform hover:scale-105 disabled:cursor-default disabled:opacity-60 disabled:hover:scale-100"
        >
          <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden>
            <path d="M0 0l10 6-10 6z" fill="currentColor" />
          </svg>
          {running ? "Running" : finished ? "Replay run" : "Execute workflow"}
        </button>
      </div>

      {/* Canvas */}
      <p className="px-4 pt-3 text-xs text-[var(--muted)] lg:hidden">Scroll sideways to see the whole workflow.</p>
      <div ref={scroller} className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="block h-auto w-full min-w-[920px]"
          role="group"
          aria-label="Diagram of the Business Development Manager workflow. Select a step to read what it does."
        >
          <defs>
            <pattern id="canvas-dots" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1" fill="rgba(255,255,255,0.07)" />
            </pattern>
          </defs>
          <rect width={VIEW_W} height={VIEW_H} fill="url(#canvas-dots)" />

          {/* Main edges */}
          {canvasNodes.slice(0, -1).map((from, i) => {
            const to = canvasNodes[i + 1];
            const done = step > i;
            const flowing = step === i + 1 && running;
            const count = replay.counts[from.id];
            const pos = countPosition(from, to);
            return (
              <g key={`edge-${from.id}`}>
                <path
                  d={edgePath(from, to)}
                  fill="none"
                  stroke={done ? "#22c55e" : "#3f3f46"}
                  strokeWidth="2"
                  className={flowing ? "canvas-edge-flow" : undefined}
                />
                {count && done && (
                  <g transform={`translate(${pos.x} ${pos.y})`}>
                    <rect x="-34" y="-11" width="68" height="20" rx="10" fill="#052e16" stroke="#166534" />
                    <text textAnchor="middle" y="3.5" fontSize="11" fill="#86efac">
                      {count}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Skip branch of the backlog guard */}
          <g>
            <path
              d={`M${guard.x + NODE / 2} ${guard.y + NODE + 44} V${guard.y + NODE + 58}`}
              stroke="#52525b"
              strokeWidth="1.5"
              strokeDasharray="3 4"
            />
            <rect
              x={guard.x + NODE / 2 - 84}
              y={guard.y + NODE + 58}
              width="168"
              height="24"
              rx="12"
              fill="#18181b"
              stroke="#3f3f46"
            />
            <text x={guard.x + NODE / 2} y={guard.y + NODE + 74} textAnchor="middle" fontSize="11" fill="#a1a1aa">
              queue full: log skip, hold slot
            </text>
          </g>

          {/* Failure branch */}
          <g>
            <path
              d={`M${ok.x + NODE / 2} ${ok.y + NODE + 44} V${ok.y + NODE + 60}`}
              stroke="#52525b"
              strokeWidth="1.5"
              strokeDasharray="3 4"
            />
            <rect
              x={ok.x + NODE / 2 - 80}
              y={ok.y + NODE + 60}
              width="160"
              height="24"
              rx="12"
              fill="#18181b"
              stroke="#3f3f46"
            />
            <text x={ok.x + NODE / 2} y={ok.y + NODE + 76} textAnchor="middle" fontSize="11" fill="#a1a1aa">
              failed: log reason, alert me
            </text>
          </g>

          {/* Model, schema and tool attached to the agent */}
          {judgeAttachments.map((attachment) => {
            const cy = judge.y + NODE + 78;
            const anchorX = judge.x + AGENT_W / 2 + (attachment.x - (judge.x + AGENT_W / 2)) * 0.55;
            const lit = step >= judgeIndex;
            return (
              <g key={attachment.id}>
                <path
                  d={`M${anchorX} ${judge.y + NODE} L${attachment.x} ${cy - 20}`}
                  stroke={lit ? "#a16207" : "#52525b"}
                  strokeWidth="1.5"
                  strokeDasharray="3 4"
                  fill="none"
                />
                <circle
                  cx={attachment.x}
                  cy={cy}
                  r="20"
                  fill="#1c1c20"
                  stroke={lit ? "#f59e0b" : "#3f3f46"}
                  strokeWidth="1.5"
                />
                <circle cx={attachment.x} cy={cy} r="4" fill={lit ? "#f59e0b" : "#71717a"} />
                <text x={attachment.x} y={cy + 36} textAnchor="middle" fontSize="11.5" fill="#fafafa">
                  {attachment.name}
                </text>
                <text x={attachment.x} y={cy + 50} textAnchor="middle" fontSize="10.5" fill="#a1a1aa">
                  {attachment.sub}
                </text>
              </g>
            );
          })}

          {/* Nodes */}
          {canvasNodes.map((node, i) => {
            const status = statusOf(i);
            const w = widthOf(node);
            const isSelected = shown?.id === node.id;
            const color = kindColor[node.kind];
            const stroke =
              status === "active" ? "#f59e0b" : status === "done" ? "#22c55e" : isSelected ? "#a1a1aa" : "#3f3f46";
            return (
              <g
                key={node.id}
                transform={`translate(${node.x} ${node.y})`}
                role="button"
                tabIndex={0}
                aria-label={`${node.name}: ${node.what}`}
                aria-pressed={selected === node.id}
                onClick={() => setSelected(node.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelected(node.id);
                  }
                }}
                className="canvas-node cursor-pointer outline-none"
              >
                {status === "active" && (
                  <rect
                    x="-5"
                    y="-5"
                    width={w + 10}
                    height={NODE + 10}
                    rx={node.kind === "trigger" ? 40 : 19}
                    fill="none"
                    stroke="#f59e0b"
                    strokeOpacity="0.35"
                    strokeWidth="4"
                    className="canvas-node-pulse"
                  />
                )}
                <rect
                  width={w}
                  height={NODE}
                  rx={node.kind === "trigger" ? 36 : 14}
                  fill="#1c1c20"
                  stroke={stroke}
                  strokeWidth={status === "idle" && !isSelected ? 1.5 : 2}
                />
                {node.kind === "agent" ? (
                  <>
                    <g transform="translate(6 0)">
                      <g fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="20" y="26" width="26" height="20" rx="5" />
                        <path d="M33 26v-5M28 34v3M38 34v3" />
                        <circle cx="33" cy="19" r="1.5" />
                      </g>
                    </g>
                    <text x="66" y="33" fontSize="14" fontWeight="600" fill="#fafafa">
                      {node.name}
                    </text>
                    <text x="66" y="50" fontSize="11" fill="#a1a1aa">
                      {node.sub} · scores 1 to 5
                    </text>
                  </>
                ) : (
                  <>
                    <Glyph kind={node.kind} color={color} />
                    <text x={w / 2} y={NODE + 19} textAnchor="middle" fontSize="12.5" fontWeight="600" fill="#fafafa">
                      {node.name}
                    </text>
                    <text x={w / 2} y={NODE + 34} textAnchor="middle" fontSize="11" fill="#a1a1aa">
                      {node.sub}
                    </text>
                  </>
                )}
                {status === "done" && <CheckBadge x={w - 4} y={4} />}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Detail panel */}
      <div className="grid gap-4 border-t border-[var(--border)] px-4 py-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:px-5">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--accent)]">
            {shown.name} · {shown.sub}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--foreground)]">{shown.what}</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted)]">
            Why it is built this way
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{shown.why}</p>
        </div>
      </div>
      <p className="border-t border-[var(--border)] px-4 py-3 text-xs leading-relaxed text-[var(--muted)] sm:px-5">
        {replay.caption} Company names removed. Select any step to read what it does.
      </p>
    </div>
  );
}
