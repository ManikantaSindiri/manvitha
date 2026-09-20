import { useState } from 'react';
import { Heart, HeartCrack, Flower, Lock, Send, Check } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import PetalBackground from '@/components/PetalBackground';
import CelebrationOverlay from '@/components/CelebrationOverlay';
import { proposal, herMessage } from '@/data/content';
import type { ProposalResponse } from '@/lib/supabase';

type Choice = 'yes' | 'think' | 'friends' | null;

type Props = {
  /** If a response already exists in the DB, it's locked. */
  lockedResponse: ProposalResponse | null;
  /** Called when she submits her choice. Parent handles the API + email. */
  onChoose: (
    choice: 'yes' | 'think' | 'friends',
    dateDetails?: {
      date_date?: string;
      date_time?: string;
      date_location?: string;
      date_activity?: string;
    }
  ) => Promise<void>;
  /** Called when she sends her personal message. */
  onSendMessage: (message: string) => Promise<void>;
};

export default function TheProposal({
  lockedResponse,
  onChoose,
  onSendMessage,
}: Props) {
  const [choice, setChoice] = useState<Choice>(lockedResponse?.choice ?? null);
  const [celebrate, setCelebrate] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Message box state
  const [message, setMessage] = useState(lockedResponse?.message ?? '');
  const [sendingMessage, setSendingMessage] = useState(false);
  const [messageSent, setMessageSent] = useState(
    Boolean(lockedResponse?.message)
  );

  const locked = lockedResponse !== null;

  const choose = async (c: Exclude<Choice, null>) => {
    if (locked || submitting) return;
    setSubmitting(true);
    setChoice(c);
    if (c === 'yes') setCelebrate(true);
    try {
      await onChoose(c);
    } catch {
      // If the API fails, still show the response locally
    } finally {
      setSubmitting(false);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || sendingMessage || messageSent) return;
    setSendingMessage(true);
    try {
      await onSendMessage(message.trim());
      setMessageSent(true);
    } catch {
      // Still show as sent locally
      setMessageSent(true);
    } finally {
      setSendingMessage(false);
    }
  };

  const responseText =
    choice === 'yes'
      ? proposal.responses.yes
      : choice === 'think'
      ? proposal.responses.think
      : choice === 'friends'
      ? proposal.responses.friends
      : '';

  return (
    <section
      id="proposal"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-gradient-to-b from-rose-100 via-blush-100 to-cream-100 px-6 py-24"
    >
      <CelebrationOverlay active={celebrate} onDone={() => setCelebrate(false)} />
      <PetalBackground count={22} />

      {locked && (
        <div className="absolute left-1/2 top-6 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-burgundy-700/90 px-4 py-2 text-xs font-medium text-cream-100 shadow-lg">
          <Lock className="h-3.5 w-3.5" />
          Your answer is saved
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <ScrollReveal>
          <p className="font-serif text-5xl text-burgundy-700 sm:text-6xl">
            {proposal.opening}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <p className="mx-auto mt-8 max-w-xl font-serif text-2xl italic leading-relaxed text-burgundy-600/80 sm:text-3xl">
            {proposal.question}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={500}>
          <div className="mt-10 space-y-1">
            {proposal.promise.map((line, i) =>
              line === '' ? (
                <div key={i} className="h-3" />
              ) : (
                <p
                  key={i}
                  className="font-serif text-lg text-burgundy-600/80 sm:text-xl"
                >
                  {line}
                </p>
              )
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={700}>
          <h2 className="mt-12 font-serif text-4xl text-burgundy-700 sm:text-5xl">
            {proposal.mainQuestion}
            <Heart className="ml-2 inline h-8 w-8 fill-blush-400 text-blush-500" />
          </h2>
        </ScrollReveal>

        {/* Options — all three always visible and clickable */}
        <div className="mt-12 flex flex-col items-stretch gap-4 sm:mx-auto sm:max-w-md">
          <button
            onClick={() => choose('yes')}
            disabled={locked || submitting}
            className={`group flex items-center justify-center gap-2 rounded-full px-8 py-4 font-sans text-base font-medium text-white shadow-lg transition-all duration-300 active:scale-95 ${
              locked && choice !== 'yes'
                ? 'border border-blush-200 bg-blush-100 text-blush-300 shadow-none'
                : 'bg-gradient-to-r from-blush-400 to-rose-500 shadow-rose-500/30 hover:scale-[1.03] hover:shadow-rose-500/50'
            } ${locked && choice === 'yes' ? 'ring-2 ring-rose-400 ring-offset-2 ring-offset-cream-100' : ''}`}
          >
            <Heart className="h-5 w-5 fill-white/80" />
            {proposal.options.yes}
          </button>

          <button
            onClick={() => choose('think')}
            disabled={locked || submitting}
            className={`flex items-center justify-center gap-2 rounded-full border px-8 py-4 font-sans text-base font-medium backdrop-blur-sm transition-all duration-300 active:scale-95 ${
              locked && choice !== 'think'
                ? 'border-blush-100 bg-blush-50 text-blush-200'
                : 'border-rose-200 bg-white/70 text-burgundy-600 hover:scale-[1.03] hover:bg-white'
            } ${locked && choice === 'think' ? 'ring-2 ring-rose-400 ring-offset-2 ring-offset-cream-100' : ''}`}
          >
            <Flower className="h-5 w-5 text-rose-400" />
            {proposal.options.think}
          </button>

          <button
            onClick={() => choose('friends')}
            disabled={locked || submitting}
            className={`flex items-center justify-center gap-2 rounded-full border px-8 py-4 font-sans text-base font-medium backdrop-blur-sm transition-all duration-300 active:scale-95 ${
              locked && choice !== 'friends'
                ? 'border-blush-100 bg-blush-50 text-blush-200'
                : 'border-burgundy-200 bg-white/50 text-burgundy-500 hover:scale-[1.03] hover:bg-white'
            } ${locked && choice === 'friends' ? 'ring-2 ring-rose-400 ring-offset-2 ring-offset-cream-100' : ''}`}
          >
            <HeartCrack className="h-5 w-5 text-burgundy-400" />
            {proposal.options.friends}
          </button>
        </div>

        {locked && (
          <p className="mt-5 font-sans text-xs text-burgundy-400/60">
            You've already answered. This is saved forever.
          </p>
        )}

        {/* Response */}
        {choice && (
          <div className="mt-12 animate-rise">
            <div className="glass mx-auto max-w-lg rounded-3xl p-8 shadow-xl shadow-burgundy-900/10">
              {choice === 'yes' && (
                <Heart className="mx-auto mb-4 h-10 w-10 animate-heartbeat fill-blush-400 text-blush-500" />
              )}
              {choice === 'think' && (
                <Flower className="mx-auto mb-4 h-10 w-10 text-rose-400" />
              )}
              {choice === 'friends' && (
                <HeartCrack className="mx-auto mb-4 h-10 w-10 text-burgundy-400" />
              )}
              <p className="whitespace-pre-line font-serif text-xl italic leading-relaxed text-burgundy-700 sm:text-2xl">
                {responseText}
              </p>
            </div>
          </div>
        )}

        {/* Message box — appears after she answers */}
        {choice && (
          <div className="mt-10 animate-rise">
            <div className="mx-auto max-w-lg rounded-3xl border border-blush-200 bg-white/70 p-8 shadow-lg shadow-burgundy-900/5 backdrop-blur-md">
              <h3 className="font-serif text-2xl text-burgundy-700 sm:text-3xl">
                {herMessage.title}
              </h3>
              <p className="mt-2 font-serif text-base italic text-burgundy-600/60">
                {herMessage.subtitle}
              </p>

              {messageSent ? (
                <div className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-rose-50 py-5 text-center">
                  <Check className="h-5 w-5 text-rose-500" />
                  <p className="font-serif text-lg italic text-burgundy-600/80">
                    {locked ? herMessage.lockedSent : herMessage.sent}
                  </p>
                </div>
              ) : (
                <div className="mt-6">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={herMessage.placeholder}
                    rows={5}
                    maxLength={2000}
                    aria-label="Your message to Manish"
                    className="w-full resize-none rounded-2xl border border-blush-200 bg-white/80 px-5 py-4 font-serif text-base leading-relaxed text-burgundy-700 outline-none transition placeholder:text-burgundy-300/50 focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!message.trim() || sendingMessage}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blush-400 to-rose-500 px-6 py-3.5 font-sans text-sm font-medium text-white shadow-lg shadow-rose-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-rose-500/50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
                  >
                    <Send className="h-4 w-4" />
                    {sendingMessage ? 'Sending...' : herMessage.button}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
