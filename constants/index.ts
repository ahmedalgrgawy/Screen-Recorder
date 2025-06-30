export const MAX_VIDEO_SIZE = 500 * 1024 * 1024;
export const MAX_THUMBNAIL_SIZE = 10 * 1024 * 1024;

export const BUNNY = {
  STREAM_BASE_URL: "https://video.bunnycdn.com/library",
  STORAGE_BASE_URL: "https://sg.storage.bunnycdn.com/snapcast",
  CDN_URL: "https://snapcast.b-cdn.net",
  EMBED_URL: "https://iframe.mediadelivery.net/embed",
  TRANSCRIPT_URL: "https://vz-47a08e64-84d.b-cdn.net",
};

export const emojis = ["😂", "😍", "👍"];

export const filterOptions = [
  "Most Viewed",
  "Most Recent",
  "Oldest First",
  "Least Viewed",
];

export const visibilities: Visibility[] = ["public", "private"];

export const ICONS = {
  record: "/assets/icons/record.svg",
  close: "/assets/icons/close.svg",
  upload: "/assets/icons/upload.svg",
};

export const initialVideoState = {
  isLoaded: false,
  hasIncrementedView: false,
  isProcessing: true,
  processingProgress: 0,
};

export const infos = ["transcript", "metadata"];

export const DEFAULT_VIDEO_CONFIG = {
  width: { ideal: 1920 },
  height: { ideal: 1080 },
  frameRate: { ideal: 30 },
};

export const DEFAULT_RECORDING_CONFIG = {
  mimeType: "video/webm;codecs=vp9,opus",
  audioBitsPerSecond: 128000,
  videoBitsPerSecond: 2500000,
};

export const dummyCards = [
  {
    id: "1",
    title: "Sample Video",
    thumbnail: "/assets/samples/thumbnail (1).png",
    createdAt: new Date('2023-10-01'),
    userImg: "/assets/images/jason.png",
    username: "Jason",
    views: 100,
    visibility: "public",
    duration: 155
  },
  {
    id: "2",
    title: "Nature Walk",
    thumbnail: "/assets/samples/thumbnail (2).png",
    createdAt: new Date('2023-11-15'),
    userImg: "/assets/images/sarah.png",
    username: "Sarah",
    views: 250,
    visibility: "private",
    duration: 210
  },
  {
    id: "3",
    title: "Cooking 101",
    thumbnail: "/assets/samples/thumbnail (3).png",
    createdAt: new Date('2023-09-20'),
    userImg: "/assets/images/mike.png",
    username: "Mike",
    views: 75,
    visibility: "public",
    duration: 320
  },
  {
    id: "4",
    title: "Travel Vlog: Japan",
    thumbnail: "/assets/samples/thumbnail (4).png",
    createdAt: new Date('2023-08-05'),
    userImg: "/assets/images/emily.png",
    username: "Emily",
    views: 430,
    visibility: "public",
    duration: 480
  },
  {
    id: "5",
    title: "Tech Review",
    thumbnail: "/assets/samples/thumbnail (5).png",
    createdAt: new Date('2023-12-01'),
    userImg: "/assets/images/alex.png",
    username: "Alex",
    views: 190,
    visibility: "private",
    duration: 260
  },
  {
    id: "6",
    title: "Workout Routine",
    thumbnail: "/assets/samples/thumbnail (6).png",
    createdAt: new Date('2023-07-22'),
    userImg: "/assets/images/lisa.png",
    username: "Lisa",
    views: 320,
    visibility: "public",
    duration: 340
  },
  {
    id: "7",
    title: "Art Tutorial",
    thumbnail: "/assets/samples/thumbnail (7).png",
    createdAt: new Date('2023-10-18'),
    userImg: "/assets/images/ben.png",
    username: "Ben",
    views: 60,
    visibility: "private",
    duration: 180
  },
  {
    id: "8",
    title: "Gaming Highlights",
    thumbnail: "/assets/samples/thumbnail (8).png",
    createdAt: new Date('2023-11-28'),
    userImg: "/assets/images/zoe.png",
    username: "Zoe",
    views: 510,
    visibility: "public",
    duration: 600
  }
]