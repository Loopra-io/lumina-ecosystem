import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CalendarDays, Tag, Inbox, ChevronRight } from 'lucide-react';
import type { Schedule } from '@lumina/data-access';

interface ScheduleCalendarProps {
  schedules: Schedule[];
  loading: boolean;
  error: string | null;
}

// ── Paleta de colores ──────────────────────────────────────────
function resolveColor(color?: string | null) {
  const map: Record<string, { bar: string; glow: string; badge: string; text: string; dot: string }> = {
    cyan:   { bar: 'bg-[#00f2ff]',  glow: 'shadow-[#00f2ff]/20',  badge: 'bg-[#00f2ff]/10 text-[#00f2ff] border-[#00f2ff]/20',     text: 'text-[#00f2ff]',   dot: 'bg-[#00f2ff]'   },
    blue:   { bar: 'bg-blue-400',   glow: 'shadow-blue-400/20',   badge: 'bg-blue-400/10 text-blue-300 border-blue-400/20',         text: 'text-blue-300',    dot: 'bg-blue-400'    },
    purple: { bar: 'bg-purple-400', glow: 'shadow-purple-400/20', badge: 'bg-purple-400/10 text-purple-300 border-purple-400/20',   text: 'text-purple-300',  dot: 'bg-purple-400'  },
    green:  { bar: 'bg-green-400',  glow: 'shadow-green-400/20',  badge: 'bg-green-400/10 text-green-300 border-green-400/20',      text: 'text-green-300',   dot: 'bg-green-400'   },
    yellow: { bar: 'bg-yellow-400', glow: 'shadow-yellow-400/20', badge: 'bg-yellow-400/10 text-yellow-300 border-yellow-400/20',   text: 'text-yellow-300',  dot: 'bg-yellow-400'  },
    red:    { bar: 'bg-red-400',    glow: 'shadow-red-400/20',    badge: 'bg-red-400/10 text-red-300 border-red-400/20',            text: 'text-red-300',     dot: 'bg-red-400'     },
    orange: { bar: 'bg-orange-400', glow: 'shadow-orange-400/20', badge: 'bg-orange-400/10 text-orange-300 border-orange-400/20',   text: 'text-orange-300',  dot: 'bg-orange-400'  },
    pink:   { bar: 'bg-pink-400',   glow: 'shadow-pink-400/20',   badge: 'bg-pink-400/10 text-pink-300 border-pink-400/20',         text: 'text-pink-300',    dot: 'bg-pink-400'    },
  };
  return map[color?.toLowerCase() ?? ''] ?? map['cyan'];
}

// ── Variantes de animación ─────────────────────────────────────
const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const cardVariants = {
  hidden:   { opacity: 0, y: 20 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
};

const sectionVariants = {
  hidden:   { opacity: 0, y: 16 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } },
};

// ── Loading Skeleton ───────────────────────────────────────────
function Skeleton() {
  return (
    <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/30">
      <div className="animate-pulse space-y-5">
        {/* Header skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-white/8" />
            <div className="space-y-1.5">
              <div className="h-2 w-16 rounded-full bg-white/8" />
              <div className="h-4 w-36 rounded-full bg-white/10" />
            </div>
          </div>
          <div className="h-6 w-16 rounded-full bg-white/8" />
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-white/5" />

        {/* Card skeletons */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex overflow-hidden rounded-[24px] border border-white/6 bg-white/3">
            <div className="w-1 flex-shrink-0 bg-white/10" />
            <div className="flex flex-1 flex-col gap-2.5 p-5">
              <div className="h-2.5 w-28 rounded-full bg-white/8" />
              <div className="h-4 w-48 rounded-full bg-white/10" />
              <div className="h-2.5 w-full rounded-full bg-white/5" />
              <div className="h-2.5 w-2/3 rounded-full bg-white/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── ScheduleCalendar ───────────────────────────────────────────
export function ScheduleCalendar({ schedules, loading, error }: ScheduleCalendarProps) {
  if (loading) return <Skeleton />;

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-[32px] border border-red-500/20 bg-red-500/5 p-8 shadow-lg shadow-black/30"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl border border-red-500/20 bg-red-500/10">
            <CalendarDays size={18} className="text-red-400" />
          </span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500/70">
              Error
            </p>
            <h2 className="text-base font-black text-white leading-tight">
              No se pudieron cargar los horarios
            </h2>
          </div>
        </div>
        <p className="pl-[52px] text-sm leading-relaxed text-red-300/70">{error}</p>
      </motion.div>
    );
  }

  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/30"
    >
      {/* ── Header ── */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl border border-[#00f2ff]/20 bg-[#00f2ff]/10">
            <CalendarDays size={17} className="text-[#00f2ff]" />
          </span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00f2ff]/70">
              Calendario
            </p>
            <h2 className="text-base font-black leading-tight text-white">
              Próximos horarios
            </h2>
          </div>
        </div>

        <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-gray-500">
          {schedules.length}&nbsp;{schedules.length === 1 ? 'evento' : 'eventos'}
        </span>
      </div>

      {/* ── Divider ── */}
      <div className="mb-5 h-px w-full bg-white/5" />

      {/* ── Estado vacío ── */}
      <AnimatePresence>
        {schedules.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-3 rounded-[24px] border border-white/6 bg-white/3 py-16 text-center"
          >
            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/8 bg-white/5">
              <Inbox size={22} className="text-gray-600" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-500">Sin horarios registrados</p>
              <p className="text-xs text-gray-700">Comienza agregando tu primer evento.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Lista de horarios ── */}
      <motion.div
        variants={listVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {schedules.map((schedule) => {
          const c = resolveColor(schedule.color);
          return (
            <motion.article
              key={schedule.id}
              variants={cardVariants}
              whileHover={{ x: 4, transition: { duration: 0.2, ease: 'easeOut' } }}
              className="group relative flex overflow-hidden rounded-[24px] border border-white/6 
                         bg-white/3 transition-colors duration-200 
                         hover:border-white/10 hover:bg-white/5"
            >
              {/* Franja lateral de color */}
              <div
                className={`w-1 flex-shrink-0 ${c.bar} opacity-60 
                            transition-opacity duration-200 group-hover:opacity-100`}
              />

              <div className="flex flex-1 flex-col gap-3 p-5 min-w-0 
                              md:flex-row md:items-center md:justify-between">
                {/* Info principal */}
                <div className="min-w-0 flex-1">
                  {/* Tiempo */}
                  <div className={`mb-2 flex items-center gap-1.5 text-xs font-semibold ${c.text}`}>
                    <Clock size={11} />
                    <span className="tracking-wide">
                      {schedule.start_time}&nbsp;→&nbsp;{schedule.end_time}
                    </span>
                  </div>

                  {/* Título */}
                  <h3 className="text-base font-black leading-snug text-white truncate">
                    {schedule.title}
                  </h3>

                  {/* Descripción */}
                  {schedule.description ? (
                    <p className="mt-1.5 text-xs leading-relaxed text-gray-500 line-clamp-2">
                      {schedule.description}
                    </p>
                  ) : (
                    <p className="mt-1.5 text-xs italic text-gray-700">
                      Sin descripción adicional.
                    </p>
                  )}
                </div>

                {/* Badge + flecha */}
                <div className="flex flex-shrink-0 items-center gap-2 self-start md:self-auto">
                  {schedule.color && (
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border 
                                  px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] 
                                  ${c.badge}`}
                    >
                      <Tag size={9} />
                      {schedule.color}
                    </span>
                  )}
                  <span
                    className="grid h-7 w-7 place-items-center rounded-xl border border-white/8 
                               bg-white/5 text-gray-600 opacity-0 transition-opacity duration-200 
                               group-hover:opacity-100"
                  >
                    <ChevronRight size={13} />
                  </span>
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
