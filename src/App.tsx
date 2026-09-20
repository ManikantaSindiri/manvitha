import { useEffect, useState } from 'react';
import MusicToggle from '@/components/MusicToggle';
import Landing from '@/sections/Landing';
import PasswordGate from '@/sections/PasswordGate';
import OurStory from '@/sections/OurStory';
import PhotoMemories from '@/sections/PhotoMemories';
import BilingualFeelings from '@/sections/BilingualFeelings';
import WhyYou from '@/sections/WhyYou';
import TheRealization from '@/sections/TheRealization';
import LoveLetter from '@/sections/LoveLetter';
import AboutMe from '@/sections/AboutMe';
import TheProposal from '@/sections/TheProposal';
import DateInvitation from '@/sections/DateInvitation';
import DateConfirmation from '@/sections/DateConfirmation';
import FinalMessage from '@/sections/FinalMessage';
import {
  checkExistingResponse,
  submitProposalResponse,
  type ProposalResponse,
} from '@/lib/supabase';

type DateDetails = {
  date: string;
  time: string;
  location: string;
  activity: string;
};

const STORAGE_KEY = 'tanvitha_unlocked';
const CHOICE_KEY = 'tanvitha_choice';

export default function App() {
  const [unlocked, setUnlocked] = useState(
    () => localStorage.getItem(STORAGE_KEY) === '1'
  );
  const [entered, setEntered] = useState(false);
  const [lockedResponse, setLockedResponse] = useState<ProposalResponse | null>(
    null
  );
  const [dateDetails, setDateDetails] = useState<DateDetails | null>(null);
  const [checking, setChecking] = useState(true);

  // On mount, check if a response already exists in the database
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const existing = await checkExistingResponse();
        if (active && existing) {
          setLockedResponse(existing);
          // Restore date details from the locked response
          if (existing.date_date || existing.date_time || existing.date_location || existing.date_activity) {
            setDateDetails({
              date: existing.date_date ?? '',
              time: existing.date_time ?? '',
              location: existing.date_location ?? '',
              activity: existing.date_activity ?? '',
            });
          }
          // Restore choice from localStorage too
          localStorage.setItem(CHOICE_KEY, existing.choice);
        } else if (active) {
          // No DB response — check if she made a local choice (pre-DB submit)
          const localChoice = localStorage.getItem(CHOICE_KEY);
          if (localChoice) {
            // She answered but it may not have hit the DB yet; will re-submit
          }
        }
      } catch {
        // Network error — proceed in offline mode
      } finally {
        if (active) setChecking(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const handleUnlock = () => {
    localStorage.setItem(STORAGE_KEY, '1');
    setUnlocked(true);
  };

  const handleOpen = () => {
    setEntered(true);
  };

  // Called when she clicks one of the three proposal options
  const handleProposalChoice = async (
    choice: 'yes' | 'think' | 'friends',
    dateDetails?: {
      date_date?: string;
      date_time?: string;
      date_location?: string;
      date_activity?: string;
    }
  ) => {
    localStorage.setItem(CHOICE_KEY, choice);
    try {
      const result = await submitProposalResponse({
        choice,
        ...dateDetails,
      });
      if (result.response) {
        setLockedResponse(result.response);
      }
    } catch {
      // If the network fails, the choice is still saved locally.
      // The next time she opens the site and the DB is reachable,
      // the lock will be enforced.
    }
  };

  // Called when she accepts the date invitation
  const handleDateAccept = async (details: {
    date_date: string;
    date_time: string;
    date_location: string;
    date_activity: string;
  }) => {
    // If we already have a locked choice, we need to submit the date details
    // as a separate update. But our edge function only inserts (one-time).
    // So we submit date details together with the existing choice.
    const existingChoice = lockedResponse?.choice ?? localStorage.getItem(CHOICE_KEY) as 'yes' | 'think' | 'friends' | null;

    if (existingChoice) {
      try {
        const result = await submitProposalResponse({
          choice: existingChoice,
          date_date: details.date_date,
          date_time: details.date_time,
          date_location: details.date_location,
          date_activity: details.date_activity,
        });
        if (result.response) {
          setLockedResponse(result.response);
        }
      } catch {
        // Network failed — still show confirmation locally
      }
    }
  };

  const handleMaybeAnotherDay = async () => {
    const existingChoice = lockedResponse?.choice ??
      (localStorage.getItem(CHOICE_KEY) as 'yes' | 'think' | 'friends' | null);
    if (!existingChoice) return;
    await submitProposalResponse({ choice: existingChoice });
  };

  // Called when she sends her personal message
  const handleSendMessage = async (message: string) => {
    const existingChoice = lockedResponse?.choice ??
      (localStorage.getItem(CHOICE_KEY) as 'yes' | 'think' | 'friends' | null);

    if (existingChoice) {
      try {
        const result = await submitProposalResponse({
          choice: existingChoice,
          message,
        });
        if (result.response) {
          setLockedResponse(result.response);
        }
      } catch {
        // Network failed — still show as sent locally
      }
    }
  };

  const handleDateConfirmed = (d: DateDetails) => {
    setDateDetails(d);
  };

  // Show nothing while checking the DB (prevents flash of unlocked state)
  if (checking) {
    return (
      <main className="relative flex min-h-screen items-center justify-center bg-warmwhite">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-soft-pulse rounded-full bg-gradient-to-br from-blush-300 to-rose-400" />
          <p className="font-serif text-sm italic text-burgundy-400/60">
            Loading...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-warmwhite text-burgundy-700">
      {!unlocked ? (
        <PasswordGate onUnlock={handleUnlock} />
      ) : !entered ? (
        <Landing onOpen={handleOpen} />
      ) : (
        <div className="animate-fade-in">
          <OurStory />
          <PhotoMemories />
          <BilingualFeelings />
          <WhyYou />
          <TheRealization />
          <LoveLetter />
          <AboutMe />
          <TheProposal
            lockedResponse={lockedResponse}
            onChoose={(choice, dateDetails) =>
              handleProposalChoice(choice, dateDetails)
            }
            onSendMessage={handleSendMessage}
          />
          {dateDetails ? (
            <DateConfirmation details={dateDetails} />
          ) : (
            <DateInvitation
              lockedResponse={lockedResponse}
              onAccept={handleDateConfirmed}
              onSubmitDate={handleDateAccept}
              onMaybe={handleMaybeAnotherDay}
            />
          )}
          <FinalMessage />
        </div>
      )}

      {entered && <MusicToggle />}
    </main>
  );
}
