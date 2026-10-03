export const HERO_IMAGE =
  "https://eeeprmtermreavivzswn.supabase.co/storage/v1/object/public/STORAGE/images/8a25b7cc-e852-4e7b-a895-adfff22a453c.jpg";

export const HERO_VIDEO =
  "https://eeeprmtermreavivzswn.supabase.co/storage/v1/object/public/STORAGE/video/720.mov";

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

export const HOW_IMAGE =
  "https://eeeprmtermreavivzswn.supabase.co/storage/v1/object/public/STORAGE/images/How.png";

export const TWELVE_WEEKS = [
  {
    title: "SAVE",
    weeks: "Weeks 1–4",
    steps: ["Pray", "Invite", "Share", "Gather"],
  },
  {
    title: "TRAIN",
    weeks: "Weeks 5–8",
    steps: ["Read", "Discuss", "Obey", "Lead"],
  },
  {
    title: "SEND",
    weeks: "Weeks 9–12",
    steps: ["Identify", "Prepare", "Launch", "Multiply"],
  },
] as const;

export const GATHERING_STEPS = [
  {
    time: "0–5 min",
    part: "WELCOME",
    happens: "Welcome people and repeat the mission: Save. Train. Send.",
  },
  {
    time: "5–10 min",
    part: "STORIES",
    happens: "Share one or two quick stories of what God did this week.",
  },
  {
    time: "10–40 min",
    part: "WORD",
    happens: "Read and teach Scripture together.",
  },
  {
    time: "40–50 min",
    part: "DISCUSS",
    happens: "Talk about what the passage means and what God is saying.",
  },
  {
    time: "50–55 min",
    part: "SEND",
    happens:
      "Decide how you will obey, who you will reach, and where you may start next.",
  },
  {
    time: "55–60 min",
    part: "PRAY",
    happens: "Pray for one another and send everyone out on mission.",
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

export const PASTORS = {
  jordanImage:
    "https://eeeprmtermreavivzswn.supabase.co/storage/v1/object/public/STORAGE/images/Jordan/Jordan2.png",
  susieImage:
    "https://eeeprmtermreavivzswn.supabase.co/storage/v1/object/public/STORAGE/images/Jordan/Susie2.png",
  giveUrl: "https://give.tithe.ly/?formId=d5d258dc-6865-11ee-90fc-1260ab546d11",
  tithelyLogo:
    "https://eeeprmtermreavivzswn.supabase.co/storage/v1/object/public/STORAGE/images/61fbe41d8e639d18d7c516b7_be57441f903d5eb3a34d0c9563110b0d_Logomark.svg",
  address: "1 Cowboys Way, Frisco, TX 75034",
  phone: "949-331-6367",
  phoneHref: "tel:9493316367",
} as const;
