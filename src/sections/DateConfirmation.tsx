import { Calendar, Clock, MapPin, Sparkles } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import PetalBackground from '@/components/PetalBackground';
import CelebrationOverlay from '@/components/CelebrationOverlay';
import { activities, dateInvite } from '@/data/content';

type Props = {
  details: {
    date: string;
    time: string;
    location: string;
    activity: string;
  };
};

function formatDate(d: string) {
  if (!d) return '';
  try {
    return new Date(d + 'T00:00').toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return d;
  }
}

function formatTime(t: string) {
  if (!t) return '';
  try {
    const [h, m] = t.split(':').map(Number);
    const date = new Date();
    date.setHours(h, m);
    return date.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: '2-digit',
    });
  } catch {
    return t;
  }
}

const activityLabel = (id: string) =>
  activities.find((a) => a.id === id)?.label ?? id;

export default function DateConfirmation({ details }: Props) {
  return (
    <section
      id="confirmation"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-gradient-to-b from-rose-100 via-blush-100 to-cream-100 px-6 py-24"
    >
      <CelebrationOverlay active />
      <PetalBackground count={18} />

      <div className="relative z-10 mx-auto max-w-lg text-center">
        <ScrollReveal>
          <p className="font-serif text-5xl text-burgundy-700 sm:text-6xl">
            {dateInvite.confirmed}
            <span className="ml-2 text-blush-500">❤</span>
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <p className="mt-6 font-script text-3xl text-burgundy-600 sm:text-4xl">
            {dateInvite.coupleLine}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={500}>
          <div className="mt-10 overflow-hidden rounded-[2rem] border border-blush-200 bg-white/70 shadow-2xl shadow-burgundy-900/15 backdrop-blur-md">
            <div className="bg-gradient-to-r from-blush-300 via-rose-300 to-blush-300 px-6 py-4">
              <p className="flex items-center justify-center gap-2 font-sans text-xs uppercase tracking-[0.3em] text-white">
                <Sparkles className="h-4 w-4" /> Our Invitation
              </p>
            </div>
            <div className="space-y-4 px-8 py-8 text-left">
              <div className="flex items-start gap-3">
                <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-burgundy-400">
                    When
                  </p>
                  <p className="font-serif text-lg text-burgundy-700">
                    {formatDate(details.date)}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-burgundy-400">
                    Time
                  </p>
                  <p className="font-serif text-lg text-burgundy-700">
                    {formatTime(details.time)}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-burgundy-400">
                    Where
                  </p>
                  <p className="font-serif text-lg text-burgundy-700">
                    {details.location}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-burgundy-400">
                    What
                  </p>
                  <p className="font-serif text-lg text-burgundy-700">
                    {activityLabel(details.activity)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={700}>
          <p className="mt-8 font-serif text-lg italic text-burgundy-600/70">
            Save this moment — it's ours.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
