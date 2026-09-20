import { useState } from 'react';
import {
  Coffee,
  Utensils,
  Sunset,
  Film,
  Flower2,
  Calendar,
  Clock,
  MapPin,
  CalendarHeart,
  Lock,
  type LucideIcon,
} from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import PetalBackground from '@/components/PetalBackground';
import { activities, dateInvite } from '@/data/content';
import type { ProposalResponse } from '@/lib/supabase';

const ACTIVITY_ICONS: Record<string, LucideIcon> = {
  coffee: Coffee,
  dinner: Utensils,
  sunset: Sunset,
  movie: Film,
  'you-choose': Flower2,
};

type DateDetails = {
  date: string;
  time: string;
  location: string;
  activity: string;
};

type Props = {
  /** If a locked response already has date details, show them read-only. */
  lockedResponse: ProposalResponse | null;
  onAccept: (details: DateDetails) => void;
  /** Called to submit date details to the server (sends email). */
  onSubmitDate: (details: {
    date_date: string;
    date_time: string;
    date_location: string;
    date_activity: string;
  }) => Promise<void>;
  onMaybe: () => Promise<void>;
};

export default function DateInvitation({
  lockedResponse,
  onAccept,
  onSubmitDate,
  onMaybe,
}: Props) {
  // Pre-fill from locked response if it exists
  const hasLockedDate =
    lockedResponse &&
    (lockedResponse.date_date ||
      lockedResponse.date_time ||
      lockedResponse.date_location ||
      lockedResponse.date_activity);

  const [date, setDate] = useState(lockedResponse?.date_date ?? '');
  const [time, setTime] = useState(lockedResponse?.date_time ?? '');
  const [location, setLocation] = useState(lockedResponse?.date_location ?? '');
  const [activity, setActivity] = useState(lockedResponse?.date_activity ?? '');
  const [maybe, setMaybe] = useState(false);
  const [submittingMaybe, setSubmittingMaybe] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const locked = Boolean(hasLockedDate);
  const canAccept = date && time && location && activity;

  const handleAccept = async () => {
    if (!canAccept || submitting) return;
    setSubmitting(true);
    try {
      await onSubmitDate({
        date_date: date,
        date_time: time,
        date_location: location,
        date_activity: activity,
      });
      onAccept({ date, time, location, activity });
    } catch {
      onAccept({ date, time, location, activity });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="date"
      className="relative overflow-hidden bg-gradient-to-b from-cream-100 via-blush-50 to-warmwhite px-6 py-24 sm:py-32"
    >
      <PetalBackground count={14} />
      <div className="relative z-10 mx-auto max-w-2xl">
        <ScrollReveal>
          <p className="text-center font-serif text-3xl italic text-burgundy-600/70 sm:text-4xl">
            {dateInvite.title}
          </p>
          <h2 className="mt-3 text-center font-serif text-4xl text-burgundy-700 sm:text-5xl">
            {dateInvite.question}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          {/* Invitation card */}
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-blush-200 bg-white/70 shadow-2xl shadow-burgundy-900/10 backdrop-blur-md">
            <div className="bg-gradient-to-r from-blush-300 via-rose-300 to-blush-300 px-8 py-6 text-center">
              <p className="font-serif text-3xl tracking-wide text-white sm:text-4xl">
                {dateInvite.namesLine}
              </p>
            </div>

            <div className="px-8 py-10">
              <div className="space-y-1 text-center">
                {dateInvite.promise.map((line, i) => (
                  <p
                    key={i}
                    className="font-serif text-lg italic text-burgundy-600/80 sm:text-xl"
                  >
                    {line}
                  </p>
                ))}
              </div>

              {/* Form */}
              <div className="mt-10 space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 flex items-center gap-1.5 font-sans text-xs uppercase tracking-[0.2em] text-burgundy-400">
                      <Calendar className="h-3.5 w-3.5" /> Date
                    </span>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      disabled={locked}
                      className="w-full rounded-xl border border-blush-200 bg-white/80 px-4 py-3 font-sans text-sm text-burgundy-700 outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-200 disabled:opacity-60"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 flex items-center gap-1.5 font-sans text-xs uppercase tracking-[0.2em] text-burgundy-400">
                      <Clock className="h-3.5 w-3.5" /> Time
                    </span>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      disabled={locked}
                      className="w-full rounded-xl border border-blush-200 bg-white/80 px-4 py-3 font-sans text-sm text-burgundy-700 outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-200 disabled:opacity-60"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-1.5 flex items-center gap-1.5 font-sans text-xs uppercase tracking-[0.2em] text-burgundy-400">
                    <MapPin className="h-3.5 w-3.5" /> Location
                  </span>
                  <input
                    type="text"
                    placeholder="Wherever you'd like"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    maxLength={120}
                    disabled={locked}
                    className="w-full rounded-xl border border-blush-200 bg-white/80 px-4 py-3 font-sans text-sm text-burgundy-700 outline-none transition placeholder:text-burgundy-300/50 focus:border-rose-400 focus:ring-2 focus:ring-rose-200 disabled:opacity-60"
                  />
                </label>

                <div>
                  <p className="mb-2 font-sans text-xs uppercase tracking-[0.2em] text-burgundy-400">
                    {dateInvite.yourChoice}
                  </p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {activities.map((a) => {
                      const Icon = ACTIVITY_ICONS[a.id] ?? Flower2;
                      const selected = activity === a.id;
                      return (
                        <button
                          key={a.id}
                          type="button"
                          onClick={() => setActivity(a.id)}
                          disabled={locked}
                          className={`flex flex-col items-center gap-1.5 rounded-2xl border px-3 py-4 text-center transition-all duration-200 disabled:opacity-60 ${
                            selected
                              ? 'border-rose-400 bg-rose-50 text-burgundy-700 shadow-md shadow-rose-200'
                              : 'border-blush-200 bg-white/60 text-burgundy-500/80 hover:border-rose-300 hover:bg-white'
                          }`}
                        >
                          <Icon className="h-5 w-5" strokeWidth={1.6} />
                          <span className="font-sans text-xs">{a.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Actions */}
              {!locked && (
                <div className="mt-8 flex flex-col gap-3">
                  <button
                    onClick={handleAccept}
                    disabled={!canAccept || submitting}
                    className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blush-400 to-rose-500 px-8 py-4 font-sans text-base font-medium text-white shadow-lg shadow-rose-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-rose-500/50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
                  >
                    <CalendarHeart className="h-5 w-5" />
                    {submitting ? 'Saving...' : dateInvite.accept}
                  </button>
                  <button
                    onClick={async () => {
                      if (submittingMaybe) return;
                      setSubmittingMaybe(true);
                      try {
                        await onMaybe();
                      } catch {
                        // Keep the local experience available if email delivery is offline.
                      } finally {
                        setMaybe(true);
                        setSubmittingMaybe(false);
                      }
                    }}
                    disabled={submitting || submittingMaybe}
                    className="rounded-full border border-burgundy-200 bg-white/50 px-8 py-3.5 font-sans text-sm font-medium text-burgundy-500 transition-all duration-300 hover:scale-[1.02] hover:bg-white active:scale-95"
                  >
                    {submittingMaybe ? 'Sending...' : dateInvite.maybe}
                  </button>
                </div>
              )}

              {locked && (
                <div className="mt-8 flex items-center justify-center gap-2 rounded-2xl bg-cream-100 py-4 text-center">
                  <Lock className="h-4 w-4 text-burgundy-400" />
                  <p className="font-sans text-sm text-burgundy-500">
                    Your date details are saved.
                  </p>
                </div>
              )}

              {!canAccept && !maybe && !locked && (
                <p className="mt-4 text-center font-sans text-xs text-burgundy-400/60">
                  Pick a date, time, place, and an activity to continue.
                </p>
              )}

              {maybe && (
                <div className="mt-6 animate-fade-in rounded-2xl bg-cream-100 p-6 text-center">
                  <p className="whitespace-pre-line font-serif text-lg italic text-burgundy-600/80">
                    {dateInvite.maybeResponse}
                  </p>
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
