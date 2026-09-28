export const HERO_IMAGE =
  "https://eeeprmtermreavivzswn.supabase.co/storage/v1/object/public/STORAGE/images/8a25b7cc-e852-4e7b-a895-adfff22a453c.jpg";

export const DEMO_USER = {
  name: "Jordan",
  church: "Frisco, TX",
  city: "Frisco, TX",
  avatar:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
};

export const IMPACT_STATS = [
  { label: "Churches", value: "280" },
  { label: "Nations", value: "23" },
  { label: "Trained", value: "15,203" },
  { label: "Baptized", value: "6,259" },
  { label: "Gospel Reach", value: "223M+" },
] as const;

export const HOW_IT_WORKS = [
  {
    title: "SAVE",
    body: "Reach the lost with the gospel.",
  },
  {
    title: "TRAIN",
    body: "Equip believers through Scripture and practical discipleship.",
  },
  {
    title: "SEND",
    body: "Send ordinary people to start new Sending Churches.",
  },
] as const;

export const GATHERING_STEPS = [
  {
    time: "0–5 min",
    part: "WELCOME + MISSION",
    happens:
      "Welcome everyone, introduce new people, and repeat the mission: Save the Lost. Train the Saved. Send the Trained.",
  },
  {
    time: "5–10 min",
    part: "STORIES",
    happens:
      "Share 1–2 quick stories: Who did you reach? Who did you invite? What did God do this week?",
  },
  {
    time: "10–40 min",
    part: "THE WORD",
    happens:
      "Spend 30 minutes in Scripture. Read through a passage or chapter and teach it simply, book by book.",
  },
  {
    time: "40–50 min",
    part: "DISCUSS",
    happens:
      "Ask: What does this teach us about God? What does it teach us about us? What is God asking us to do?",
  },
  {
    time: "50–55 min",
    part: "OBEY + SEND",
    happens:
      "Ask: How will you obey what God showed you today? Who will you reach, invite, train, or encourage this week? Is God calling you to start another Sending Church?",
  },
  {
    time: "55–60 min",
    part: "PRAY + SEND OUT",
    happens:
      "Pray for one another, for people being reached, and for new Sending Churches to start.",
  },
] as const;

export const START_FLOW = [
  "2 PEOPLE",
  "GATHER",
  "SAVE",
  "TRAIN",
  "SEND",
  "START AGAIN",
] as const;

export const START_CHECKLIST = [
  "Find one other person",
  "Choose a weekly meeting place",
  "Use the 60-minute gathering format",
  "Invite people",
  "Save → Train → Send",
  "Multiply",
] as const;

export const PATH_CARDS = [
  {
    number: "1",
    title: "GET SAVED",
    body: "Know Jesus and begin a new life.",
    href: "/training",
    cta: "Learn More",
    image:
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=1400&q=80",
  },
  {
    number: "2",
    title: "GET TRAINED",
    body: "Grow in your faith and learn the Sending Church model.",
    href: "/training",
    cta: "Start Training",
    image:
      "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=1400&q=80",
  },
  {
    number: "3",
    title: "GET SENT",
    body: "Reach people, make disciples, and start a Sending Church.",
    href: "/start-a-church",
    cta: "Get Sent",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80",
  },
] as const;

export const DEMO_CHURCH = {
  city: "Frisco, TX",
  leader: "Jordan",
  meeting: "Sundays, 9:00 AM",
  team: 2,
  reached: 0,
  baptized: 0,
  trained: 0,
  sent: 0,
};

export const DEMO_EVENT = {
  title: "Sending Team Gathering",
  day: "Sunday",
  time: "9:00 AM",
  location: "Frisco, TX",
  dateLabel: "Sunday, September 28",
  image:
    "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80",
};

export const EVENTS = [
  DEMO_EVENT,
  {
    title: "Training Night",
    day: "Wednesday",
    time: "7:00 PM",
    location: "Frisco, TX",
    dateLabel: "Wednesday, October 1",
    image:
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1200&q=80",
  },
] as const;

export const TRAINING = {
  SAVE: [
    "How to Share the Gospel",
    "How to Invite Someone",
    "How to Lead Someone to Jesus",
  ],
  TRAIN: [
    "How to Lead the 60-Minute Gathering",
    "How to Teach the Bible Simply",
    "How to Disciple Someone",
  ],
  SEND: [
    "How to Start With Two",
    "How to Choose a Meeting Location",
    "How to Launch a New Sending Church",
    "How to Train the Next Leader",
  ],
} as const;

export const STORIES = [
  {
    name: "Maria",
    city: "Frisco, TX",
    quote:
      "We started with two people in a living room. Three months later, another Sending Church began across town.",
  },
  {
    name: "David",
    city: "Dallas, TX",
    quote:
      "The 60-minute format made it simple. I did not need a stage. I needed a Bible and one other person.",
  },
] as const;

export const STAR_IMAGE =
  "https://eeeprmtermreavivzswn.supabase.co/storage/v1/object/public/STORAGE/images/the-star_entertainment-district_00009.jpg";
