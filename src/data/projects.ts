export type ProjectSection = {
  heading: string;
  body: string;
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  featured: boolean;
  year: string;
  role: string;
  status: "Live" | "In Development" | "Completed";
  tech: string[];
  githubUrl: string;
  demoUrl: string | null;
  color: "emerald" | "cyan" | "deepblue";
  features: string[];
  overview: string;
  problem: string;
  approach: ProjectSection[];
  outcome: string;
  screenshots: { label: string }[];
};

export const projects: Project[] = [
  {
    slug: "ecoswap",
    name: "EcoSwap",
    tagline: "An AI-powered sustainable marketplace",
    summary:
      "Donate, exchange, or sell reusable items — with AI writing the listing for you.",
    featured: true,
    year: "2025",
    role: "Solo Developer",
    status: "In Development",
    tech: ["Flutter", "Firebase", "Riverpod", "Cloud Firestore", "Gemini AI", "Cloudinary"],
    githubUrl: "https://github.com/akanksha5362/ecoswap",
    demoUrl: null,
    color: "emerald",
    features: [
      "User authentication",
      "AI-generated item descriptions",
      "AI category suggestions",
      "Nearby listings",
      "Wishlist",
      "Item requests",
      "Donation & exchange workflow",
      "Green impact dashboard",
      "Firebase backend",
      "Responsive Material 3 UI",
    ],
    overview:
      "EcoSwap is a marketplace built around one idea: the easiest way to keep something out of a landfill is to make giving it away as fast as selling it. Users list items to donate, exchange, or sell, and the app removes the friction that normally stops people from listing at all.",
    problem:
      "Writing a good listing takes time — a title, an honest description, the right category. Most reuse apps assume you'll do that work yourself, so a lot of usable items never get listed. EcoSwap needed to make listing an item almost as fast as taking a photo of it.",
    approach: [
      {
        heading: "AI as the first draft",
        body: "A photo and a couple of keywords go to Gemini AI, which returns a clean, honest item description and a suggested category. The user reviews and edits rather than writing from a blank page — this is the single change that made the listing flow fast enough to actually use.",
      },
      {
        heading: "State management with Riverpod",
        body: "Listings, wishlist state, and nearby-item queries are modeled as providers so the UI stays reactive without prop drilling across the donation/exchange/sell flows, which share most of their logic but diverge at the final step.",
      },
      {
        heading: "Firestore as the source of truth",
        body: "Item documents, requests, and a lightweight impact ledger (items diverted, estimated CO2 saved) live in Cloud Firestore, with Cloudinary handling image storage and delivery so the app stays fast on slower connections.",
      },
      {
        heading: "Material 3, responsively",
        body: "The UI follows Material 3 across phone and tablet breakpoints, with a dashboard view that turns the abstract idea of 'sustainability' into a number the user can watch grow.",
      },
    ],
    outcome:
      "EcoSwap is currently in active development, with the core listing, browsing, and request flows built and the impact dashboard in progress. It's the project I use to explore how far AI can go in removing friction from everyday tasks, not just in chat interfaces.",
    screenshots: [
      { label: "Home feed & nearby listings" },
      { label: "AI-assisted listing flow" },
      { label: "Item detail & request" },
      { label: "Green impact dashboard" },
    ],
  },
  {
    slug: "gesture-dr-driving",
    name: "Gesture-Controlled Dr. Driving",
    tagline: "Real-time computer vision game control using hand gestures",
    summary:
      "Controls the Dr. Driving Android game through webcam-based hand tracking instead of keyboard or touch input.",
    featured: false,
    year: "2025–2026",
    role: "Solo Developer",
    status: "In Development",
    tech: ["Python", "OpenCV", "MediaPipe", "Pynput", "Android Emulator", "ADB"],
    githubUrl: "https://github.com/akanksha5362/gesture-controlled-dr-driving",
    demoUrl: null,
    color: "cyan",
    features: [
      "Real-time webcam capture",
      "Hand landmark detection (MediaPipe Hands)",
      "Gesture-to-action mapping",
      "Keyboard automation via Pynput",
      "Android emulator integration",
      "ADB-based dev tooling",
    ],
    overview:
      "A hands-free controller for the Dr. Driving Android game: a webcam feed is processed in real time to track hand position and orientation, which is translated into driving commands and sent to the game as simulated keyboard input. The game itself runs unmodified, inside an Android emulator — every input it receives looks like an ordinary keypress.",
    problem:
      "Turning a video stream into a usable game controller means solving three separate problems in real time: detecting a hand reliably frame-to-frame, converting its position into a small, stable set of driving actions (not raw, noisy coordinates), and getting those actions into a game that only understands keyboard events. Each stage has to run fast enough that the delay between a gesture and the on-screen response doesn't break the interaction.",
    approach: [
      {
        heading: "Real-time capture with OpenCV",
        body: "OpenCV reads the webcam feed frame by frame and feeds each frame into the detection pipeline, keeping the system built around a live stream rather than static or prerecorded images.",
      },
      {
        heading: "Hand tracking with MediaPipe Hands",
        body: "MediaPipe's hand-landmark model detects and tracks the hand per frame, returning landmark coordinates used to determine hand position and orientation — no custom model was trained; this project applies MediaPipe's existing landmark detection to a new control problem.",
      },
      {
        heading: "Gesture-to-action mapping",
        body: "Landmark positions are interpreted into a small set of driving gestures (e.g. steering left/right, accelerate, brake), so the vision layer outputs discrete game actions instead of raw coordinates the game has no way to use.",
      },
      {
        heading: "Keyboard automation with Pynput",
        body: "Each recognized action is converted into a simulated key event through Pynput, which is what actually connects the computer-vision pipeline to Dr. Driving — the game only ever sees standard keyboard input.",
      },
      {
        heading: "Running the game via Android emulator",
        body: "Dr. Driving runs on an Android emulator on the same machine, with ADB used during development to install, launch, and debug the app so the Python control loop has a consistent target to send input to.",
      },
    ],
    outcome:
      "A working real-time pipeline — webcam to hand landmarks to game action to keypress — running end to end against an unmodified Android game. It's the project where I moved from writing standalone computer-vision scripts to building a full human-computer-interaction loop: capture, recognition, mapping, and automation, all live.",
    screenshots: [
      { label: "Webcam capture & preprocessing" },
      { label: "MediaPipe hand landmark detection" },
      { label: "Gesture-to-action mapping" },
      { label: "Pynput-driven control in Dr. Driving" },
    ],
  },
];

export const getProjectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);
