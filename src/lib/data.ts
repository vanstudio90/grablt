export interface Listing {
  id: string;
  title: string;
  price: number;
  images: string[];
  category: string;
  condition: string;
  description: string;
  location: string;
  distance: string;
  postedAt: string;
  seller: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    reviews: number;
    joined: string;
    responseTime: string;
  };
  saved: boolean;
  depositAmount: number;
  status: "available" | "reserved" | "sold";
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  listing: { id: string; title: string; image: string; price: number };
  otherUser: { id: string; name: string; avatar: string };
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  messages: Message[];
}

export const categories = [
  { name: "All", icon: "grid" },
  { name: "Vehicles", icon: "car" },
  { name: "Electronics", icon: "smartphone" },
  { name: "Furniture", icon: "sofa" },
  { name: "Clothing", icon: "shirt" },
  { name: "Sports", icon: "dumbbell" },
  { name: "Home & Garden", icon: "home" },
  { name: "Toys & Games", icon: "gamepad-2" },
  { name: "Music", icon: "music" },
  { name: "Books", icon: "book-open" },
  { name: "Tools", icon: "wrench" },
  { name: "Free Stuff", icon: "gift" },
];

export const listings: Listing[] = [
  {
    id: "1",
    title: "iPhone 15 Pro Max 256GB - Like New",
    price: 899,
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800",
      "https://images.unsplash.com/photo-1695048132832-bf7e4bd5a637?w=800",
    ],
    category: "Electronics",
    condition: "Like New",
    description: "iPhone 15 Pro Max in Natural Titanium. 256GB storage. Used for only 2 months, always had a case and screen protector. Comes with original box, cable, and AppleCare+ until Dec 2025. Battery health at 100%.",
    location: "Santa Monica, LA",
    distance: "3.2 mi",
    postedAt: "2 hours ago",
    seller: {
      id: "u1",
      name: "Marcus Johnson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
      rating: 4.9,
      reviews: 47,
      joined: "Mar 2024",
      responseTime: "Usually responds in 5 min",
    },
    saved: false,
    depositAmount: 90,
    status: "available",
  },
  {
    id: "2",
    title: "Mid-Century Modern Sofa - Walnut Frame",
    price: 650,
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
      "https://images.unsplash.com/photo-1550254478-ead40cc54513?w=800",
    ],
    category: "Furniture",
    condition: "Good",
    description: "Beautiful mid-century modern sofa with solid walnut frame. Green velvet upholstery in great condition. Very comfortable, no tears or stains. Selling because we're moving. You pick up — it's heavy!",
    location: "Silver Lake, LA",
    distance: "5.1 mi",
    postedAt: "4 hours ago",
    seller: {
      id: "u2",
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
      rating: 5.0,
      reviews: 23,
      joined: "Jan 2024",
      responseTime: "Usually responds in 15 min",
    },
    saved: true,
    depositAmount: 65,
    status: "available",
  },
  {
    id: "3",
    title: "2019 Toyota Camry SE - Low Miles",
    price: 18500,
    images: [
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800",
    ],
    category: "Vehicles",
    condition: "Good",
    description: "2019 Toyota Camry SE with only 32,000 miles. Single owner, clean title, no accidents. Regular maintenance done at Toyota dealer. New tires last month. Great on gas!",
    location: "Glendale, LA",
    distance: "8.4 mi",
    postedAt: "1 day ago",
    seller: {
      id: "u3",
      name: "David Park",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
      rating: 4.7,
      reviews: 12,
      joined: "Jun 2024",
      responseTime: "Usually responds in 1 hour",
    },
    saved: false,
    depositAmount: 500,
    status: "available",
  },
  {
    id: "4",
    title: 'Sony 65" 4K OLED TV - A80K',
    price: 780,
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800",
    ],
    category: "Electronics",
    condition: "Like New",
    description: "Sony A80K 65 inch 4K OLED TV. Incredible picture quality. Bought in 2023, barely used — upgrading to 77 inch. Comes with original remote, stand, and wall mount bracket. No dead pixels, no burn-in.",
    location: "Burbank, LA",
    distance: "11.2 mi",
    postedAt: "5 hours ago",
    seller: {
      id: "u4",
      name: "Alex Rivera",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
      rating: 4.8,
      reviews: 31,
      joined: "Feb 2024",
      responseTime: "Usually responds in 10 min",
    },
    saved: false,
    depositAmount: 78,
    status: "available",
  },
  {
    id: "5",
    title: "Mountain Bike - Trek Marlin 7",
    price: 520,
    images: [
      "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800",
    ],
    category: "Sports",
    condition: "Good",
    description: "Trek Marlin 7 mountain bike, size Large. Great trail bike, well maintained. New chain and brake pads. Minor cosmetic scratches but rides perfectly. Includes bottle cage and bike lock.",
    location: "Pasadena, LA",
    distance: "12.7 mi",
    postedAt: "6 hours ago",
    seller: {
      id: "u5",
      name: "Jordan Williams",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcabd9c?w=200",
      rating: 4.6,
      reviews: 8,
      joined: "Aug 2024",
      responseTime: "Usually responds in 30 min",
    },
    saved: false,
    depositAmount: 52,
    status: "available",
  },
  {
    id: "6",
    title: "PS5 Slim + 2 Controllers + 5 Games",
    price: 380,
    images: [
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800",
    ],
    category: "Electronics",
    condition: "Like New",
    description: "PS5 Slim disc edition bundle. Includes 2 DualSense controllers (white + midnight black), plus Spider-Man 2, God of War Ragnarok, Hogwarts Legacy, FC 24, and The Last of Us Part 1. All discs in perfect condition.",
    location: "Hollywood, LA",
    distance: "2.8 mi",
    postedAt: "30 min ago",
    seller: {
      id: "u6",
      name: "Chris Martinez",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200",
      rating: 4.9,
      reviews: 56,
      joined: "Nov 2023",
      responseTime: "Usually responds in 5 min",
    },
    saved: false,
    depositAmount: 38,
    status: "available",
  },
  {
    id: "7",
    title: "Vintage Leather Jacket - Size M",
    price: 120,
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800",
    ],
    category: "Clothing",
    condition: "Good",
    description: "Genuine leather motorcycle jacket, size Medium. Beautiful patina, broken in perfectly. Interior lining in good condition. Classic style that never goes out of fashion.",
    location: "Venice Beach, LA",
    distance: "4.5 mi",
    postedAt: "1 day ago",
    seller: {
      id: "u7",
      name: "Emma Thompson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
      rating: 4.8,
      reviews: 19,
      joined: "Apr 2024",
      responseTime: "Usually responds in 20 min",
    },
    saved: true,
    depositAmount: 12,
    status: "available",
  },
  {
    id: "8",
    title: "Standing Desk - Electric Adjustable",
    price: 280,
    images: [
      "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=800",
    ],
    category: "Furniture",
    condition: "Like New",
    description: "Electric standing desk with memory presets. 60x30 inch walnut top. Dual motor, very smooth and quiet. Goes from 28 to 48 inches. Bought 6 months ago for $550. Moving to a smaller apartment.",
    location: "Downtown LA",
    distance: "1.2 mi",
    postedAt: "3 hours ago",
    seller: {
      id: "u8",
      name: "Nina Patel",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
      rating: 5.0,
      reviews: 14,
      joined: "May 2024",
      responseTime: "Usually responds in 10 min",
    },
    saved: false,
    depositAmount: 28,
    status: "available",
  },
  {
    id: "9",
    title: "FREE - Moving Out Sale - Kitchen Items",
    price: 0,
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
    ],
    category: "Free Stuff",
    condition: "Fair",
    description: "Moving out and giving away kitchen items: pots, pans, utensils, plates, glasses, cutting boards. Everything must go by this weekend. Come take what you need!",
    location: "Koreatown, LA",
    distance: "2.0 mi",
    postedAt: "1 hour ago",
    seller: {
      id: "u9",
      name: "Lisa Kim",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200",
      rating: 4.5,
      reviews: 6,
      joined: "Sep 2024",
      responseTime: "Usually responds in 45 min",
    },
    saved: false,
    depositAmount: 0,
    status: "available",
  },
  {
    id: "10",
    title: "Gibson Les Paul Standard '50s - Gold Top",
    price: 2200,
    images: [
      "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800",
    ],
    category: "Music",
    condition: "Like New",
    description: "Gibson Les Paul Standard '50s in Gold Top finish. Bought new in 2023, played at home only. Comes with original hardshell case, all paperwork, and Gibson accessories. No dings or scratches.",
    location: "Echo Park, LA",
    distance: "3.8 mi",
    postedAt: "8 hours ago",
    seller: {
      id: "u10",
      name: "Ryan O'Brien",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200",
      rating: 4.9,
      reviews: 33,
      joined: "Dec 2023",
      responseTime: "Usually responds in 15 min",
    },
    saved: false,
    depositAmount: 220,
    status: "available",
  },
  {
    id: "11",
    title: "Nike Air Jordan 1 Retro High - Chicago",
    price: 250,
    images: [
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800",
    ],
    category: "Clothing",
    condition: "New",
    description: "Air Jordan 1 Retro High OG 'Chicago' colorway. Size 10.5 US. Brand new, never worn, with original box and tags. Got as a gift, not my size.",
    location: "Inglewood, LA",
    distance: "6.3 mi",
    postedAt: "12 hours ago",
    seller: {
      id: "u11",
      name: "Tyler Jackson",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200",
      rating: 4.7,
      reviews: 28,
      joined: "Jan 2025",
      responseTime: "Usually responds in 10 min",
    },
    saved: false,
    depositAmount: 25,
    status: "available",
  },
  {
    id: "12",
    title: "DJI Mini 3 Pro Drone + Fly More Kit",
    price: 550,
    images: [
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800",
    ],
    category: "Electronics",
    condition: "Like New",
    description: "DJI Mini 3 Pro with Fly More Kit. Includes 3 batteries, charging hub, carrying case, extra propellers. Under 250g so no registration needed. Flown only 5 times. 4K video is incredible.",
    location: "Long Beach, LA",
    distance: "14.1 mi",
    postedAt: "2 days ago",
    seller: {
      id: "u12",
      name: "Maria Santos",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200",
      rating: 4.6,
      reviews: 9,
      joined: "Jul 2024",
      responseTime: "Usually responds in 30 min",
    },
    saved: false,
    depositAmount: 55,
    status: "available",
  },
];

export const conversations: Conversation[] = [
  {
    id: "c1",
    listing: { id: "6", title: "PS5 Slim + 2 Controllers + 5 Games", image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=200", price: 380 },
    otherUser: { id: "u6", name: "Chris Martinez", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200" },
    lastMessage: "Yeah I can meet at the Starbucks on Sunset, does 3pm work?",
    lastMessageTime: "2 min ago",
    unread: 2,
    messages: [
      { id: "m1", senderId: "me", text: "Hey, is the PS5 bundle still available?", timestamp: "10:30 AM" },
      { id: "m2", senderId: "u6", text: "Yes it is! Everything works perfectly", timestamp: "10:32 AM" },
      { id: "m3", senderId: "me", text: "Great! Can we meet somewhere in Hollywood?", timestamp: "10:35 AM" },
      { id: "m4", senderId: "u6", text: "Yeah I can meet at the Starbucks on Sunset, does 3pm work?", timestamp: "10:38 AM" },
    ],
  },
  {
    id: "c2",
    listing: { id: "8", title: "Standing Desk - Electric Adjustable", image: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=200", price: 280 },
    otherUser: { id: "u8", name: "Nina Patel", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200" },
    lastMessage: "Deposit received! See you Saturday at 11am 🙌",
    lastMessageTime: "1 hour ago",
    unread: 0,
    messages: [
      { id: "m5", senderId: "me", text: "Hi, I'm interested in the standing desk. Is it still available?", timestamp: "Yesterday 2:00 PM" },
      { id: "m6", senderId: "u8", text: "Hi! Yes it is. Would you like to come see it?", timestamp: "Yesterday 2:15 PM" },
      { id: "m7", senderId: "me", text: "Absolutely. I placed the deposit. Can I pick up Saturday?", timestamp: "Yesterday 3:00 PM" },
      { id: "m8", senderId: "u8", text: "Deposit received! See you Saturday at 11am 🙌", timestamp: "Yesterday 3:05 PM" },
    ],
  },
];
