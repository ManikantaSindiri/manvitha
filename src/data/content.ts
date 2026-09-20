// All the words on this website live here.
// Edit any line below to make it yours, Manish.

export const names = {
  me: 'Manish',
  her: 'Tanvitha',
};

// Entry password — Tanvitha must type this to open the site.
// Change it here to whatever you want.
export const entryPassword = 'mannuu';

// Where Manish receives the email notification when she answers.
export const notifyEmail = 'sindrimanikantaswaroop@gmail.com';

export const landing = {
  greeting: 'Hey Tanvitha...',
  subline: 'I made something for you.',
  button: 'Open My Heart',
};

export const story = {
  title: 'Somewhere between friendship and forever...',
  intro: [
    'It started with friendship.',
    'Simple conversations.',
    'Random laughs.',
    'Little moments that somehow became my favorite moments.',
  ],
  reveal: 'And somewhere along the way... you became more than just my best friend.',
};

export type TimelineItem = {
  label: string;
  title: string;
  description: string;
  image: string;
  imageHint: string;
};

export const timeline: TimelineItem[] = [
  {
    label: 'The beginning',
    title: 'The first conversation',
    description:
      'I didn\'t know it then, but this was the moment everything quietly started.',
    image: '/images/memories/01.png',
    imageHint: 'soft pastel flowers',
  },
  {
    label: 'A memory',
    title: 'The first unforgettable memory',
    description:
      'The kind of moment that stays with you long after the day is over.',
    image: '/images/memories/02.jpg',
    imageHint: 'warm golden sunset',
  },
  {
    label: 'Pure joy',
    title: 'The funniest moment',
    description:
      'We laughed until it hurt. I think that\'s when I first felt it — how easy you are to be around.',
    image: '/images/memories/03.jpg',
    imageHint: 'bright blooming garden',
  },
  {
    label: 'A shift',
    title: 'The moment I realized how important you are',
    description:
      'It wasn\'t dramatic. It was quiet. And somehow that made it matter more.',
    image: '/images/memories/04.jpg',
    imageHint: 'soft pink rose petals',
  },
  {
    label: 'Together',
    title: 'Our favorite memory',
    description:
      'If I had to pick one moment to keep forever, it would probably be this one.',
    image: '/images/memories/05.jpg',
    imageHint: 'gentle pastel blossoms',
  },
  {
    label: 'Now',
    title: 'Today',
    description:
      'The day I finally gathered the courage to tell you everything.',
    image: '/images/memories/06.jpg',
    imageHint: 'soft glowing petals',
  },
];

export type GalleryPhoto = {
  image: string;
  date: string;
  caption: string;
  description: string;
  imageHint: string;
};

export const gallery: GalleryPhoto[] = [
  {
    image: '/images/gallery/01.jpg',
    date: 'A day I remember',
    caption: 'That smile...',
    description: 'The kind of smile that makes the whole day feel lighter.',
    imageHint: 'soft pink rose petals',
  },
  {
    image: '/images/gallery/02.jpg',
    date: 'One of those days',
    caption: 'One of my favorite days.',
    description: 'Nothing extraordinary happened. And that\'s exactly why I loved it.',
    imageHint: 'golden sunset silhouette',
  },
  {
    image: '/images/gallery/03.jpg',
    date: 'A quiet moment',
    caption: 'I didn\'t know this moment would mean so much.',
    description: 'Some moments only become precious in hindsight. This was one of them.',
    imageHint: 'pastel blooming flowers',
  },
  {
    image: '/images/gallery/04.jpg',
    date: 'Just us',
    caption: 'Just us being us.',
    description: 'No pretense. No performance. Just two people, completely at ease.',
    imageHint: 'soft pink magnolia',
  },
  {
    image: '/images/gallery/05.jpg',
    date: 'A random evening',
    caption: 'The kind of ordinary I\'d choose again.',
    description: 'I\'d take a hundred more evenings exactly like this one.',
    imageHint: 'warm pastel blossoms',
  },
  {
    image: '/images/gallery/06.jpg',
    date: 'Somewhere in between',
    caption: 'Where everything quietly changed.',
    description: 'I didn\'t notice it happening. But looking back, this is where it began.',
    imageHint: 'delicate pink ranunculus',
  },
];

export type BilingualLine = {
  telugu: string;
  english: string;
};

export const feelings: BilingualLine[] = [
  {
    telugu: 'నువ్వు నా జీవితంలోకి వచ్చిన తర్వాత,\nసాధారణమైన రోజులు కూడా ప్రత్యేకంగా అనిపించాయి.',
    english:
      'After you came into my life,\neven ordinary days started feeling special.',
  },
  {
    telugu:
      'మన friendship నాకు చాలా precious...\nకానీ నిజం చెప్పాలంటే,\nనా heart లో నువ్వు ఇంకొంచెం special.',
    english:
      'You became my best friend first,\nand somewhere along the way,\nmy heart started seeing you differently.',
  },
  {
    telugu: 'నీతో మాట్లాడటం ఒక అలవాటు కాదు...\nనా రోజులో నాకు ఇష్టమైన భాగం.',
    english:
      'Talking to you isn\'t just a habit...\nit\'s my favorite part of the day.',
  },
];

export const whyYou = {
  title: 'Why you, Tanvitha?',
  closing: 'It\'s not one big reason.\nIt\'s a thousand little reasons.',
};

export type ReasonCard = {
  icon: string;
  title: string;
  text: string;
};

export const reasons: ReasonCard[] = [
  {
    icon: 'smile',
    title: 'Your smile',
    text: 'The one that makes a bad day feel a little less heavy.',
  },
  {
    icon: 'heart-handshake',
    title: 'Your kindness',
    text: 'The way you treat people — gently, honestly, without expecting anything back.',
  },
  {
    icon: 'shield-check',
    title: 'Your honesty',
    text: 'You say what you mean. And you mean what you say. That\'s rare.',
  },
  {
    icon: 'ear',
    title: 'The way you understand me',
    text: 'Sometimes without me saying a word. You just know.',
  },
  {
    icon: 'home',
    title: 'The comfort I feel around you',
    text: 'Like I can finally set everything down and just be.',
  },
  {
    icon: 'sparkles',
    title: 'The little things you do',
    text: 'The small gestures you probably don\'t even notice. I do.',
  },
  {
    icon: 'user-round',
    title: 'The person I become around you',
    text: 'A little braver. A little softer. A little more myself.',
  },
];

export const realization = {
  lines: [
    'I kept calling you my best friend...',
    '...because that was the safest way to describe what you meant to me.',
    'But eventually I realized...',
    'I wasn\'t just afraid of losing my best friend.',
    'I was afraid of never telling you how much I love you.',
  ],
};

export const letter = {
  salutation: 'Dear Tanvitha,',
  body: [
    'I don\'t know exactly when it happened.',
    '',
    'Maybe it was during one of our endless conversations.',
    'Maybe it was one of those random moments that meant nothing at the time.',
    'Maybe it happened slowly, without either of us noticing.',
    '',
    'But somewhere along the way,',
    'you became the person I look forward to talking to,',
    'the person I want to share things with,',
    'the person whose happiness genuinely matters to me.',
    '',
    'You are my best friend.',
    '',
    'And I think that\'s what makes this feeling even more special.',
    '',
    'I don\'t want to change what we have.',
    'I just want to be honest about what my heart has been trying to tell me.',
    '',
    'I love you, Tanvitha.',
  ],
  signoff: 'Always,',
  signature: 'Manish',
};

export const aboutMe = {
  title: 'A little about me',
  subtitle: 'So you know exactly who\'s asking.',
  intro:
    'Before you read what comes next, I want you to know me — not just as your best friend, but as the person behind these words.',
  traits: [
    {
      icon: 'heart',
      title: 'I love deeply',
      text: 'When I care about someone, I care with everything I have. Quietly, but completely.',
    },
    {
      icon: 'ear',
      title: 'I listen',
      text: 'Not just to reply. I listen to understand — the words you say and the ones you don\'t.',
    },
    {
      icon: 'shield-check',
      title: 'I\'m loyal',
      text: 'The people I love never have to wonder where they stand with me. I\'m there. Always.',
    },
    {
      icon: 'coffee',
      title: 'Simple things make me happy',
      text: 'A good conversation, a quiet evening, a song on repeat. I don\'t need much.',
    },
    {
      icon: 'book-open',
      title: 'I think a lot',
      text: 'Sometimes too much. But it also means I don\'t say things I don\'t mean.',
    },
    {
      icon: 'sparkles',
      title: 'I believe in small gestures',
      text: 'Grand moments are nice, but it\'s the little everyday things that actually matter.',
    },
  ],
  closing:
    'I\'m not perfect. I\'m still growing, still learning, still becoming.\nBut if you\'re willing, I\'d love to become — with you.',
};

export const proposal = {
  opening: 'Tanvitha...',
  question: 'Will you let me turn our beautiful friendship into something more?',
  promise: [
    'I don\'t promise a perfect story.',
    '',
    'I promise that I\'ll always value,',
    'respect,',
    'listen to,',
    'and cherish you.',
  ],
  mainQuestion: 'Will you be mine?',
  options: {
    yes: 'Yes',
    think: 'Let me think about it',
    friends: 'I\'d rather stay best friends',
  },
  responses: {
    yes: 'Then this is the beginning of our next chapter.',
    think:
      'Take all the time you need.\nWhat matters most to me is that you are comfortable and honest with me.',
    friends:
      'Thank you for being honest with me.\nOur friendship still means so much to me.',
  },
};

export const herMessage = {
  title: 'Say something to me',
  subtitle: 'Anything at all. Your words, your way.',
  placeholder:
    'Write whatever you\'re feeling... a memory, a thought, a wish, or just a smile.',
  button: 'Send to Manish',
  sent: 'Your message reached me. Thank you for trusting me with your words.',
  lockedSent: 'Your message was sent.',
};

export const dateInvite = {
  title: 'One more question...',
  question: 'Would you go on a date with me?',
  namesLine: 'Manish + Tanvitha',
  promise: ['One evening.', 'Just us.', 'No expectations.', 'Just a beautiful memory.'],
  yourChoice: 'Your choice',
  accept: 'Accept Date Invitation',
  maybe: 'Maybe another day',
  confirmed: 'IT\'S A DATE.',
  coupleLine: 'Manish × Tanvitha',
  maybeResponse:
    'That\'s completely okay.\nWhenever you\'re ready — or if you never are — I\'m glad you read this far.',
};

export const finalMessage = {
  text: 'Whatever your answer is,\nthank you for being one of the most beautiful parts of my life.',
  telugu:
    'నీ సమాధానం ఏదైనా...\nనా జీవితంలో ఇంత ప్రత్యేకమైన వ్యక్తిగా ఉన్నందుకు\nధన్యవాదాలు.',
  signoff: 'From your best friend,',
  signature: 'Manish',
  closing: 'Maybe this is where our next chapter begins...',
};

export const activities = [
  { id: 'coffee', icon: 'coffee', label: 'Coffee' },
  { id: 'dinner', icon: 'utensils', label: 'Dinner' },
  { id: 'sunset', icon: 'sunset', label: 'Sunset walk' },
  { id: 'movie', icon: 'film', label: 'Movie' },
  { id: 'you-choose', icon: 'flower-2', label: 'Something you choose' },
];
