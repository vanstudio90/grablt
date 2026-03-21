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
  shippingAvailable: boolean;
  shippingPrice: number;
  deliveryOptions: ("pickup" | "shipping")[];
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

export interface CartItem {
  listing: Listing;
  quantity: number;
  depositOnly: boolean;
}

export const sidebarCategories = [
  "Vehicles",
  "Property Rentals",
  "Apparel",
  "Classifieds",
  "Electronics",
  "Entertainment",
  "Family",
  "Free Stuff",
  "Garden & Outdoor",
  "Hobbies",
  "Home Goods",
  "Home Improvement Supplies",
  "Home Sales",
  "Musical Instruments",
  "Office Supplies",
  "Pet Supplies",
  "Sporting Goods",
  "Toys & Games",
  "Buy and sell groups",
];

// Sellers pool — reused across listings
const sellers = {
  marcus: { id: "u1", name: "Marcus Johnson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200", rating: 4.9, reviews: 47, joined: "Mar 2024", responseTime: "Usually responds in 5 min" },
  sarah: { id: "u2", name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200", rating: 5.0, reviews: 23, joined: "Jan 2024", responseTime: "Usually responds in 15 min" },
  david: { id: "u3", name: "David Park", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200", rating: 4.7, reviews: 12, joined: "Jun 2024", responseTime: "Usually responds in 1 hour" },
  alex: { id: "u4", name: "Alex Rivera", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200", rating: 4.8, reviews: 31, joined: "Feb 2024", responseTime: "Usually responds in 10 min" },
  jordan: { id: "u5", name: "Jordan Williams", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcabd9c?w=200", rating: 4.6, reviews: 8, joined: "Aug 2024", responseTime: "Usually responds in 30 min" },
  chris: { id: "u6", name: "Chris Martinez", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200", rating: 4.9, reviews: 56, joined: "Nov 2023", responseTime: "Usually responds in 5 min" },
  emma: { id: "u7", name: "Emma Thompson", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200", rating: 4.8, reviews: 19, joined: "Apr 2024", responseTime: "Usually responds in 20 min" },
  nina: { id: "u8", name: "Nina Patel", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200", rating: 5.0, reviews: 14, joined: "May 2024", responseTime: "Usually responds in 10 min" },
  lisa: { id: "u9", name: "Lisa Kim", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200", rating: 4.5, reviews: 6, joined: "Sep 2024", responseTime: "Usually responds in 45 min" },
  ryan: { id: "u10", name: "Ryan O'Brien", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200", rating: 4.9, reviews: 33, joined: "Dec 2023", responseTime: "Usually responds in 15 min" },
  tyler: { id: "u11", name: "Tyler Jackson", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200", rating: 4.7, reviews: 28, joined: "Jan 2025", responseTime: "Usually responds in 10 min" },
  maria: { id: "u12", name: "Maria Santos", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200", rating: 4.6, reviews: 9, joined: "Jul 2024", responseTime: "Usually responds in 30 min" },
  james: { id: "u13", name: "James Wilson", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200", rating: 4.8, reviews: 41, joined: "Oct 2023", responseTime: "Usually responds in 8 min" },
  ashley: { id: "u14", name: "Ashley Brown", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200", rating: 4.4, reviews: 15, joined: "Mar 2025", responseTime: "Usually responds in 20 min" },
  mike: { id: "u15", name: "Mike Torres", avatar: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=200", rating: 4.7, reviews: 22, joined: "May 2024", responseTime: "Usually responds in 12 min" },
};

export const listings: Listing[] = [
  // ═══════════════ VEHICLES ═══════════════
  { id: "1", title: "2019 Toyota Camry SE - Low Miles", price: 18500, images: ["https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800"], category: "Vehicles", condition: "Good", description: "2019 Toyota Camry SE with only 32,000 miles. Single owner, clean title, no accidents. Regular maintenance at Toyota dealer. New tires last month.", location: "Glendale, LA", distance: "8.4 mi", postedAt: "1 day ago", seller: sellers.david, saved: false, depositAmount: 500, status: "available", shippingAvailable: false, shippingPrice: 0, deliveryOptions: ["pickup"] },
  { id: "2", title: "2021 Honda Civic Sport - Sonic Gray", price: 22000, images: ["https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800"], category: "Vehicles", condition: "Like New", description: "2021 Honda Civic Sport in Sonic Gray Pearl. 18k miles, 6-speed manual, clean title. Comes with winter tires on rims. Dealer maintained.", location: "Burbank, LA", distance: "10.1 mi", postedAt: "3 hours ago", seller: sellers.james, saved: false, depositAmount: 600, status: "available", shippingAvailable: false, shippingPrice: 0, deliveryOptions: ["pickup"] },
  { id: "3", title: "Electric Scooter - Segway Ninebot Max", price: 450, images: ["https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800"], category: "Vehicles", condition: "Good", description: "Segway Ninebot Max electric scooter. 40 mile range, 18.6 mph top speed. 800 miles on it. New tire, great commuter.", location: "Santa Monica, LA", distance: "5.2 mi", postedAt: "6 hours ago", seller: sellers.alex, saved: false, depositAmount: 45, status: "available", shippingAvailable: false, shippingPrice: 0, deliveryOptions: ["pickup"] },

  // ═══════════════ PROPERTY RENTALS ═══════════════
  { id: "4", title: "1BR Apartment - Arts District Downtown", price: 1800, images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"], category: "Property Rentals", condition: "Like New", description: "Bright 1-bedroom apartment in the Arts District. 650 sqft, hardwood floors, in-unit washer/dryer, rooftop pool. Available April 1st. No pets.", location: "Downtown LA", distance: "1.5 mi", postedAt: "2 hours ago", seller: sellers.nina, saved: false, depositAmount: 180, status: "available", shippingAvailable: false, shippingPrice: 0, deliveryOptions: ["pickup"] },
  { id: "5", title: "Room for Rent - Shared House in Echo Park", price: 950, images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"], category: "Property Rentals", condition: "Good", description: "Private room in a shared 3BR house. Shared bathroom, kitchen, backyard. Utilities included. Close to Echo Park Lake. Available now.", location: "Echo Park, LA", distance: "3.8 mi", postedAt: "5 hours ago", seller: sellers.ryan, saved: false, depositAmount: 95, status: "available", shippingAvailable: false, shippingPrice: 0, deliveryOptions: ["pickup"] },
  { id: "6", title: "Studio Loft - Silver Lake with View", price: 1500, images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"], category: "Property Rentals", condition: "Like New", description: "Charming studio loft in Silver Lake. Open floor plan, large windows with city view, modern kitchen. Parking included. 12-month lease.", location: "Silver Lake, LA", distance: "5.1 mi", postedAt: "1 day ago", seller: sellers.sarah, saved: true, depositAmount: 150, status: "available", shippingAvailable: false, shippingPrice: 0, deliveryOptions: ["pickup"] },

  // ═══════════════ APPAREL ═══════════════
  { id: "7", title: "Vintage Leather Jacket - Size M", price: 120, images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800"], category: "Apparel", condition: "Good", description: "Genuine leather motorcycle jacket, size Medium. Beautiful patina, broken in perfectly. Interior lining in good condition.", location: "Venice Beach, LA", distance: "4.5 mi", postedAt: "1 day ago", seller: sellers.emma, saved: true, depositAmount: 12, status: "available", shippingAvailable: true, shippingPrice: 15, deliveryOptions: ["pickup", "shipping"] },
  { id: "8", title: "Nike Air Jordan 1 Retro High - Chicago", price: 250, images: ["https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800"], category: "Apparel", condition: "New", description: "Air Jordan 1 Retro High OG 'Chicago' colorway. Size 10.5 US. Brand new, never worn, with original box and tags.", location: "Inglewood, LA", distance: "6.3 mi", postedAt: "12 hours ago", seller: sellers.tyler, saved: false, depositAmount: 25, status: "available", shippingAvailable: true, shippingPrice: 15, deliveryOptions: ["pickup", "shipping"] },
  { id: "9", title: "Lululemon Leggings Bundle - Size 6", price: 85, images: ["https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800"], category: "Apparel", condition: "Like New", description: "3 pairs of Lululemon Align leggings, size 6. Black, navy, and dark olive. Worn a few times each, no pilling. Selling as a bundle.", location: "West Hollywood, LA", distance: "3.0 mi", postedAt: "4 hours ago", seller: sellers.ashley, saved: false, depositAmount: 9, status: "available", shippingAvailable: true, shippingPrice: 15, deliveryOptions: ["pickup", "shipping"] },

  // ═══════════════ CLASSIFIEDS ═══════════════
  { id: "10", title: "Moving Sale - Everything Must Go!", price: 0, images: ["https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800"], category: "Classifieds", condition: "Fair", description: "Moving out of state next week. Furniture, kitchen items, books, decor — come see and make an offer on anything. Saturday 9am-3pm.", location: "Koreatown, LA", distance: "2.0 mi", postedAt: "1 hour ago", seller: sellers.lisa, saved: false, depositAmount: 0, status: "available", shippingAvailable: false, shippingPrice: 0, deliveryOptions: ["pickup"] },
  { id: "11", title: "Handyman Services - Licensed & Insured", price: 50, images: ["https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800"], category: "Classifieds", condition: "New", description: "Licensed handyman offering: plumbing, electrical, drywall, painting, furniture assembly, TV mounting. $50/hr. Free estimates. 15 years experience.", location: "LA County", distance: "Varies", postedAt: "3 days ago", seller: sellers.mike, saved: false, depositAmount: 5, status: "available", shippingAvailable: false, shippingPrice: 0, deliveryOptions: ["pickup"] },
  { id: "12", title: "Math & Science Tutor - All Levels", price: 40, images: ["https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800"], category: "Classifieds", condition: "New", description: "UCLA grad offering math and science tutoring. K-12 and college level. SAT/ACT prep available. In-person or online. $40/hr.", location: "Westwood, LA", distance: "7.2 mi", postedAt: "2 days ago", seller: sellers.sarah, saved: false, depositAmount: 0, status: "available", shippingAvailable: false, shippingPrice: 0, deliveryOptions: ["pickup"] },

  // ═══════════════ ELECTRONICS ═══════════════
  { id: "13", title: "iPhone 15 Pro Max 256GB - Like New", price: 899, images: ["https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800"], category: "Electronics", condition: "Like New", description: "iPhone 15 Pro Max in Natural Titanium. 256GB. Used 2 months, always had case and screen protector. Original box, cable, AppleCare+ until Dec 2025. Battery 100%.", location: "Santa Monica, LA", distance: "3.2 mi", postedAt: "2 hours ago", seller: sellers.marcus, saved: false, depositAmount: 90, status: "available", shippingAvailable: true, shippingPrice: 15, deliveryOptions: ["pickup", "shipping"] },
  { id: "14", title: 'Sony 65" 4K OLED TV - A80K', price: 780, images: ["https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800"], category: "Electronics", condition: "Like New", description: "Sony A80K 65 inch 4K OLED TV. Incredible picture. Bought 2023, barely used — upgrading to 77 inch. Remote, stand, wall mount bracket included.", location: "Burbank, LA", distance: "11.2 mi", postedAt: "5 hours ago", seller: sellers.alex, saved: false, depositAmount: 78, status: "available", shippingAvailable: true, shippingPrice: 15, deliveryOptions: ["pickup", "shipping"] },
  { id: "15", title: "PS5 Slim + 2 Controllers + 5 Games", price: 380, images: ["https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800"], category: "Electronics", condition: "Like New", description: "PS5 Slim disc edition bundle. 2 DualSense controllers, Spider-Man 2, God of War Ragnarok, Hogwarts Legacy, FC 24, The Last of Us Part 1.", location: "Hollywood, LA", distance: "2.8 mi", postedAt: "30 min ago", seller: sellers.chris, saved: false, depositAmount: 38, status: "available", shippingAvailable: true, shippingPrice: 15, deliveryOptions: ["pickup", "shipping"] },
  { id: "16", title: "DJI Mini 3 Pro Drone + Fly More Kit", price: 550, images: ["https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800"], category: "Electronics", condition: "Like New", description: "DJI Mini 3 Pro with Fly More Kit. 3 batteries, charging hub, carrying case, extra propellers. Under 250g. Flown 5 times. 4K video.", location: "Long Beach, LA", distance: "14.1 mi", postedAt: "2 days ago", seller: sellers.maria, saved: false, depositAmount: 55, status: "available", shippingAvailable: true, shippingPrice: 15, deliveryOptions: ["pickup", "shipping"] },
  { id: "17", title: "MacBook Pro 14\" M3 Pro - 18GB/512GB", price: 1650, images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800"], category: "Electronics", condition: "Like New", description: "MacBook Pro 14 inch with M3 Pro chip. Space Black, 18GB RAM, 512GB SSD. AppleCare until 2026. 42 battery cycles. Perfect condition.", location: "Pasadena, LA", distance: "12.7 mi", postedAt: "8 hours ago", seller: sellers.james, saved: false, depositAmount: 165, status: "available", shippingAvailable: true, shippingPrice: 15, deliveryOptions: ["pickup", "shipping"] },

  // ═══════════════ ENTERTAINMENT ═══════════════
  { id: "18", title: "Concert Tickets - Taylor Swift Eras Tour x2", price: 400, images: ["https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800"], category: "Entertainment", condition: "New", description: "2 tickets to Taylor Swift Eras Tour at SoFi Stadium. Section 234, Row 12. Can't make it anymore. Will transfer via Ticketmaster.", location: "Inglewood, LA", distance: "6.3 mi", postedAt: "1 hour ago", seller: sellers.ashley, saved: false, depositAmount: 40, status: "available", shippingAvailable: true, shippingPrice: 15, deliveryOptions: ["pickup", "shipping"] },
  { id: "19", title: "Board Game Collection - 15 Games", price: 120, images: ["https://images.unsplash.com/photo-1611891487122-207579d67d98?w=800"], category: "Entertainment", condition: "Good", description: "Collection of 15 board games: Catan, Ticket to Ride, Pandemic, Azul, Wingspan, Codenames, and more. All complete with all pieces.", location: "Pasadena, LA", distance: "12.7 mi", postedAt: "1 day ago", seller: sellers.jordan, saved: false, depositAmount: 12, status: "available", shippingAvailable: true, shippingPrice: 15, deliveryOptions: ["pickup", "shipping"] },
  { id: "20", title: "Vinyl Record Collection - 50+ Classic Rock", price: 200, images: ["https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?w=800"], category: "Entertainment", condition: "Good", description: "50+ vinyl records. Led Zeppelin, Pink Floyd, Beatles, Fleetwood Mac, Eagles, and more. Most in VG+ condition. Will sell individually too.", location: "Silver Lake, LA", distance: "5.1 mi", postedAt: "6 hours ago", seller: sellers.ryan, saved: false, depositAmount: 20, status: "available", shippingAvailable: true, shippingPrice: 15, deliveryOptions: ["pickup", "shipping"] },

  // ═══════════════ FAMILY ═══════════════
  { id: "21", title: "UPPAbaby Vista V2 Stroller - Like New", price: 450, images: ["https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800"], category: "Family", condition: "Like New", description: "UPPAbaby Vista V2 double stroller in Gregory Blue. Includes bassinet, toddler seat, rain cover, bug shield. Used 6 months. Retails for $1000+.", location: "Pasadena, LA", distance: "12.7 mi", postedAt: "3 hours ago", seller: sellers.nina, saved: false, depositAmount: 45, status: "available", shippingAvailable: true, shippingPrice: 15, deliveryOptions: ["pickup", "shipping"] },
  { id: "22", title: "Baby Clothes Bundle 0-12 Months - 50 Pieces", price: 60, images: ["https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800"], category: "Family", condition: "Good", description: "Huge bundle of baby clothes. Mix of onesies, pants, sleepers, jackets. Carter's, H&M, Gap. Gender neutral colors. All washed and clean.", location: "Glendale, LA", distance: "8.4 mi", postedAt: "1 day ago", seller: sellers.emma, saved: false, depositAmount: 6, status: "available", shippingAvailable: true, shippingPrice: 15, deliveryOptions: ["pickup", "shipping"] },
  { id: "23", title: "Graco Pack N Play - Barely Used", price: 75, images: ["https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=800"], category: "Family", condition: "Like New", description: "Graco Pack N Play with bassinet insert and changing table attachment. Used at grandma's house maybe 5 times. Like brand new.", location: "Culver City, LA", distance: "4.8 mi", postedAt: "5 hours ago", seller: sellers.lisa, saved: false, depositAmount: 8, status: "available", shippingAvailable: true, shippingPrice: 15, deliveryOptions: ["pickup", "shipping"] },

  // ═══════════════ FREE STUFF ═══════════════
  { id: "24", title: "FREE - Moving Out Kitchen Items", price: 0, images: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800"], category: "Free Stuff", condition: "Fair", description: "Moving out and giving away kitchen items: pots, pans, utensils, plates, glasses, cutting boards. Everything must go by this weekend!", location: "Koreatown, LA", distance: "2.0 mi", postedAt: "1 hour ago", seller: sellers.lisa, saved: false, depositAmount: 0, status: "available", shippingAvailable: false, shippingPrice: 0, deliveryOptions: ["pickup"] },
  { id: "25", title: "FREE - Queen Mattress - Good Condition", price: 0, images: ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800"], category: "Free Stuff", condition: "Good", description: "Queen size mattress, Sealy brand. No stains, no tears. We upgraded to a king. You pick up — bring help, it's heavy. Available Saturday.", location: "Glendale, LA", distance: "8.4 mi", postedAt: "4 hours ago", seller: sellers.david, saved: false, depositAmount: 0, status: "available", shippingAvailable: false, shippingPrice: 0, deliveryOptions: ["pickup"] },
  { id: "26", title: "FREE - Moving Boxes & Packing Supplies", price: 0, images: ["https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800"], category: "Free Stuff", condition: "Good", description: "About 30 moving boxes (various sizes), bubble wrap, packing paper, and tape. Just moved in and don't need them anymore. Porch pickup.", location: "Eagle Rock, LA", distance: "9.5 mi", postedAt: "2 hours ago", seller: sellers.ashley, saved: false, depositAmount: 0, status: "available", shippingAvailable: false, shippingPrice: 0, deliveryOptions: ["pickup"] },

  // ═══════════════ GARDEN & OUTDOOR ═══════════════
  { id: "27", title: "Weber Spirit II Gas Grill - 3 Burner", price: 280, images: ["https://images.unsplash.com/photo-1529543544089-28ab4e3ad822?w=800"], category: "Garden & Outdoor", condition: "Good", description: "Weber Spirit II E-310 gas grill. 3 burners, side tables, built-in thermometer. Used 2 seasons. Includes cover and full propane tank.", location: "Sherman Oaks, LA", distance: "11.8 mi", postedAt: "6 hours ago", seller: sellers.mike, saved: false, depositAmount: 28, status: "available", shippingAvailable: true, shippingPrice: 15, deliveryOptions: ["pickup", "shipping"] },
  { id: "28", title: "Patio Furniture Set - 4 Chairs + Table", price: 350, images: ["https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800"], category: "Garden & Outdoor", condition: "Good", description: "Outdoor patio dining set. Metal frame with cushions. Table seats 4-6. Cushions in good condition, no tears. Great for balcony or patio.", location: "Manhattan Beach, LA", distance: "13.2 mi", postedAt: "1 day ago", seller: sellers.sarah, saved: false, depositAmount: 35, status: "available", shippingAvailable: true, shippingPrice: 15, deliveryOptions: ["pickup", "shipping"] },
  { id: "29", title: "Raised Garden Bed Kit - Cedar Wood", price: 65, images: ["https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800"], category: "Garden & Outdoor", condition: "New", description: "Cedar raised garden bed kit, 4ft x 8ft x 12in. Unassembled, all hardware included. Bought two, only need one. Great for veggies.", location: "Pasadena, LA", distance: "12.7 mi", postedAt: "8 hours ago", seller: sellers.emma, saved: false, depositAmount: 7, status: "available", shippingAvailable: true, shippingPrice: 15, deliveryOptions: ["pickup", "shipping"] },

  // ═══════════════ HOBBIES ═══════════════
  { id: "30", title: "Canon EOS R6 Mark II + RF 24-105mm", price: 2100, images: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800"], category: "Hobbies", condition: "Like New", description: "Canon EOS R6 Mark II mirrorless camera with RF 24-105mm f/4L IS USM lens. 8,200 shutter count. Includes extra battery, SD cards, camera bag.", location: "West Hollywood, LA", distance: "3.0 mi", postedAt: "4 hours ago", seller: sellers.ryan, saved: false, depositAmount: 210, status: "available", shippingAvailable: true, shippingPrice: 15, deliveryOptions: ["pickup", "shipping"] },
  { id: "31", title: "Cricut Maker 3 + Materials Bundle", price: 320, images: ["https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800"], category: "Hobbies", condition: "Like New", description: "Cricut Maker 3 with lots of extra materials: vinyl, iron-on, cardstock, blades, mats. Used for a few projects. Everything works perfectly.", location: "Burbank, LA", distance: "10.1 mi", postedAt: "2 days ago", seller: sellers.ashley, saved: false, depositAmount: 32, status: "available", shippingAvailable: true, shippingPrice: 15, deliveryOptions: ["pickup", "shipping"] },
  { id: "32", title: "Oil Painting Supplies - Complete Set", price: 90, images: ["https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800"], category: "Hobbies", condition: "Good", description: "Complete oil painting set: 24 Winsor & Newton paints, brushes, palette, easel, canvases (various sizes), turpentine, linseed oil.", location: "Echo Park, LA", distance: "3.8 mi", postedAt: "1 day ago", seller: sellers.maria, saved: false, depositAmount: 9, status: "available", shippingAvailable: true, shippingPrice: 15, deliveryOptions: ["pickup", "shipping"] },

  // ═══════════════ HOME GOODS ═══════════════
  { id: "33", title: "Mid-Century Modern Sofa - Walnut Frame", price: 650, images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800"], category: "Home Goods", condition: "Good", description: "Beautiful mid-century modern sofa with solid walnut frame. Green velvet upholstery. No tears or stains. Selling because we're moving.", location: "Silver Lake, LA", distance: "5.1 mi", postedAt: "4 hours ago", seller: sellers.sarah, saved: true, depositAmount: 65, status: "available", shippingAvailable: false, shippingPrice: 0, deliveryOptions: ["pickup"] },
  { id: "34", title: "Standing Desk - Electric Adjustable", price: 280, images: ["https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=800"], category: "Home Goods", condition: "Like New", description: "Electric standing desk with memory presets. 60x30 walnut top. Dual motor, smooth and quiet. 28 to 48 inches. Bought for $550.", location: "Downtown LA", distance: "1.2 mi", postedAt: "3 hours ago", seller: sellers.nina, saved: false, depositAmount: 28, status: "available", shippingAvailable: false, shippingPrice: 0, deliveryOptions: ["pickup"] },
  { id: "35", title: "Dyson V15 Detect Cordless Vacuum", price: 380, images: ["https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800"], category: "Home Goods", condition: "Like New", description: "Dyson V15 Detect cordless vacuum with laser dust detection. All attachments included, wall mount dock. 6 months old. Works perfectly.", location: "Culver City, LA", distance: "4.8 mi", postedAt: "7 hours ago", seller: sellers.marcus, saved: false, depositAmount: 38, status: "available", shippingAvailable: false, shippingPrice: 0, deliveryOptions: ["pickup"] },

  // ═══════════════ HOME IMPROVEMENT SUPPLIES ═══════════════
  { id: "36", title: "DeWalt 20V Max Drill/Driver Kit", price: 85, images: ["https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800"], category: "Home Improvement Supplies", condition: "Good", description: "DeWalt 20V Max cordless drill/driver with 2 batteries, charger, and carrying case. Great condition, tons of power left in the batteries.", location: "Van Nuys, LA", distance: "14.5 mi", postedAt: "1 day ago", seller: sellers.mike, saved: false, depositAmount: 9, status: "available", shippingAvailable: true, shippingPrice: 15, deliveryOptions: ["pickup", "shipping"] },
  { id: "37", title: "Interior Paint - 5 Gallons Benjamin Moore", price: 120, images: ["https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=800"], category: "Home Improvement Supplies", condition: "New", description: "5 gallons of Benjamin Moore Regal Select interior paint in Simply White. Sealed, never opened. Bought too much for our project.", location: "Burbank, LA", distance: "10.1 mi", postedAt: "3 hours ago", seller: sellers.david, saved: false, depositAmount: 12, status: "available", shippingAvailable: true, shippingPrice: 15, deliveryOptions: ["pickup", "shipping"] },
  { id: "38", title: "Tile Lot - 200 sqft Subway White", price: 150, images: ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800"], category: "Home Improvement Supplies", condition: "New", description: "200 sqft of classic white subway tile 3x6. Still in boxes. Leftover from bathroom remodel. Enough for a kitchen backsplash or small bathroom.", location: "Glendale, LA", distance: "8.4 mi", postedAt: "2 days ago", seller: sellers.james, saved: false, depositAmount: 15, status: "available", shippingAvailable: true, shippingPrice: 15, deliveryOptions: ["pickup", "shipping"] },

  // ═══════════════ HOME SALES ═══════════════
  { id: "39", title: "2BR Condo - Eagle Rock - Open House Sun", price: 485000, images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800"], category: "Home Sales", condition: "Good", description: "2 bed / 1 bath condo in Eagle Rock. 920 sqft, updated kitchen, hardwood floors, 1 car garage. HOA $280/mo. Open house this Sunday 1-4pm.", location: "Eagle Rock, LA", distance: "9.5 mi", postedAt: "1 day ago", seller: sellers.james, saved: false, depositAmount: 1000, status: "available", shippingAvailable: false, shippingPrice: 0, deliveryOptions: ["pickup"] },
  { id: "40", title: "Townhouse 3BR - Pasadena - Just Listed", price: 650000, images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"], category: "Home Sales", condition: "Like New", description: "Beautiful 3BR/2.5BA townhouse in Old Pasadena. 1,400 sqft, attached 2-car garage, private patio. Walking distance to shops and restaurants.", location: "Pasadena, LA", distance: "12.7 mi", postedAt: "2 days ago", seller: sellers.nina, saved: false, depositAmount: 1000, status: "available", shippingAvailable: false, shippingPrice: 0, deliveryOptions: ["pickup"] },

  // ═══════════════ MUSICAL INSTRUMENTS ═══════════════
  { id: "41", title: "Gibson Les Paul Standard '50s - Gold Top", price: 2200, images: ["https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800"], category: "Musical Instruments", condition: "Like New", description: "Gibson Les Paul Standard '50s in Gold Top finish. Bought new 2023, played at home only. Original hardshell case, all paperwork.", location: "Echo Park, LA", distance: "3.8 mi", postedAt: "8 hours ago", seller: sellers.ryan, saved: false, depositAmount: 220, status: "available", shippingAvailable: true, shippingPrice: 15, deliveryOptions: ["pickup", "shipping"] },
  { id: "42", title: "Yamaha P-125 Digital Piano + Stand", price: 420, images: ["https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800"], category: "Musical Instruments", condition: "Like New", description: "Yamaha P-125 88-key weighted digital piano with stand, sustain pedal, and bench. Great touch and sound. Perfect for learning or practice.", location: "Culver City, LA", distance: "4.8 mi", postedAt: "5 hours ago", seller: sellers.sarah, saved: false, depositAmount: 42, status: "available", shippingAvailable: true, shippingPrice: 15, deliveryOptions: ["pickup", "shipping"] },
  { id: "43", title: "Fender Player Stratocaster - Sunburst", price: 550, images: ["https://images.unsplash.com/photo-1550985616-10810253b84d?w=800"], category: "Musical Instruments", condition: "Good", description: "Fender Player Series Stratocaster in 3-Color Sunburst. Maple neck. Plays and sounds great. A few small dings but nothing major. Includes gig bag.", location: "Hollywood, LA", distance: "2.8 mi", postedAt: "1 day ago", seller: sellers.chris, saved: false, depositAmount: 55, status: "available", shippingAvailable: true, shippingPrice: 15, deliveryOptions: ["pickup", "shipping"] },

  // ═══════════════ OFFICE SUPPLIES ═══════════════
  { id: "44", title: "Herman Miller Aeron Chair - Size B", price: 650, images: ["https://images.unsplash.com/photo-1589364231560-e0b3e75ab37a?w=800"], category: "Office Supplies", condition: "Good", description: "Herman Miller Aeron office chair, Size B (medium). Fully loaded with all adjustments. Slight wear on armrests but everything works perfectly.", location: "Downtown LA", distance: "1.2 mi", postedAt: "3 hours ago", seller: sellers.marcus, saved: false, depositAmount: 65, status: "available", shippingAvailable: true, shippingPrice: 15, deliveryOptions: ["pickup", "shipping"] },
  { id: "45", title: "Dual Monitor Stand + 2x Dell 27\" Monitors", price: 380, images: ["https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800"], category: "Office Supplies", condition: "Good", description: "Two Dell 27 inch QHD monitors (S2722QC) with dual monitor arm stand. USB-C connectivity. Perfect WFH setup. Selling as a bundle only.", location: "Santa Monica, LA", distance: "3.2 mi", postedAt: "1 day ago", seller: sellers.alex, saved: false, depositAmount: 38, status: "available", shippingAvailable: true, shippingPrice: 15, deliveryOptions: ["pickup", "shipping"] },
  { id: "46", title: "Laser Printer - Brother HL-L2350DW", price: 60, images: ["https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800"], category: "Office Supplies", condition: "Good", description: "Brother wireless laser printer. Duplex printing, WiFi. Includes a brand new toner cartridge. Print quality is excellent. Moving to paperless.", location: "Burbank, LA", distance: "10.1 mi", postedAt: "2 days ago", seller: sellers.nina, saved: false, depositAmount: 6, status: "available", shippingAvailable: true, shippingPrice: 15, deliveryOptions: ["pickup", "shipping"] },

  // ═══════════════ PET SUPPLIES ═══════════════
  { id: "47", title: "Large Dog Crate - MidWest iCrate 42\"", price: 45, images: ["https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800"], category: "Pet Supplies", condition: "Good", description: "MidWest iCrate 42 inch dog crate with divider panel. Fits dogs 71-90 lbs. Folds flat for storage. Includes tray. Dog outgrew it.", location: "Glendale, LA", distance: "8.4 mi", postedAt: "6 hours ago", seller: sellers.jordan, saved: false, depositAmount: 5, status: "available", shippingAvailable: true, shippingPrice: 15, deliveryOptions: ["pickup", "shipping"] },
  { id: "48", title: "Cat Tree - 72\" Multi-Level Tower", price: 55, images: ["https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=800"], category: "Pet Supplies", condition: "Good", description: "Large cat tree, 72 inches tall. Multiple platforms, scratching posts, hammock, condo. Cats loved it but we're downsizing. Some wear on sisal.", location: "West Hollywood, LA", distance: "3.0 mi", postedAt: "1 day ago", seller: sellers.emma, saved: false, depositAmount: 6, status: "available", shippingAvailable: true, shippingPrice: 15, deliveryOptions: ["pickup", "shipping"] },
  { id: "49", title: "Aquarium 55 Gallon + Full Setup", price: 180, images: ["https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800"], category: "Pet Supplies", condition: "Good", description: "55 gallon aquarium with stand, LED light, canister filter, heater, air pump, and decorations. Just add water and fish! Draining this weekend.", location: "Torrance, LA", distance: "15.3 mi", postedAt: "4 hours ago", seller: sellers.alex, saved: false, depositAmount: 18, status: "available", shippingAvailable: true, shippingPrice: 15, deliveryOptions: ["pickup", "shipping"] },

  // ═══════════════ SPORTING GOODS ═══════════════
  { id: "50", title: "Mountain Bike - Trek Marlin 7", price: 520, images: ["https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800"], category: "Sporting Goods", condition: "Good", description: "Trek Marlin 7, size Large. Great trail bike. New chain and brake pads. Minor cosmetic scratches. Includes bottle cage and bike lock.", location: "Pasadena, LA", distance: "12.7 mi", postedAt: "6 hours ago", seller: sellers.jordan, saved: false, depositAmount: 52, status: "available", shippingAvailable: true, shippingPrice: 15, deliveryOptions: ["pickup", "shipping"] },
  { id: "51", title: "Surfboard - 6'2\" Channel Islands", price: 350, images: ["https://images.unsplash.com/photo-1502680390548-bdbac40e4a9f?w=800"], category: "Sporting Goods", condition: "Good", description: "Channel Islands Fishbeard 6'2\". Great for intermediate to advanced surfers. Some minor pressure dings. Includes FCS II fins and board bag.", location: "Venice Beach, LA", distance: "4.5 mi", postedAt: "2 hours ago", seller: sellers.tyler, saved: false, depositAmount: 35, status: "available", shippingAvailable: true, shippingPrice: 15, deliveryOptions: ["pickup", "shipping"] },
  { id: "52", title: "Home Gym - Adjustable Dumbbells + Bench", price: 300, images: ["https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800"], category: "Sporting Goods", condition: "Like New", description: "Bowflex SelectTech 552 adjustable dumbbells (5-52.5 lbs each) with adjustable bench. Barely used — New Year's resolution didn't stick.", location: "Sherman Oaks, LA", distance: "11.8 mi", postedAt: "1 day ago", seller: sellers.chris, saved: false, depositAmount: 30, status: "available", shippingAvailable: true, shippingPrice: 15, deliveryOptions: ["pickup", "shipping"] },

  // ═══════════════ TOYS & GAMES ═══════════════
  { id: "53", title: "LEGO Star Wars Millennium Falcon 75192", price: 650, images: ["https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=800"], category: "Toys & Games", condition: "Like New", description: "LEGO Star Wars UCS Millennium Falcon #75192. Built once, displayed in glass case. Complete with all minifigures. Original box and instructions.", location: "Burbank, LA", distance: "10.1 mi", postedAt: "3 hours ago", seller: sellers.marcus, saved: false, depositAmount: 65, status: "available", shippingAvailable: true, shippingPrice: 15, deliveryOptions: ["pickup", "shipping"] },
  { id: "54", title: "Nintendo Switch OLED + 8 Games", price: 320, images: ["https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=800"], category: "Toys & Games", condition: "Like New", description: "Nintendo Switch OLED white model. 8 games: Zelda TOTK, Mario Odyssey, Animal Crossing, Smash Bros, Mario Kart 8, Pokémon Violet, Splatoon 3, Kirby.", location: "Hollywood, LA", distance: "2.8 mi", postedAt: "5 hours ago", seller: sellers.chris, saved: false, depositAmount: 32, status: "available", shippingAvailable: true, shippingPrice: 15, deliveryOptions: ["pickup", "shipping"] },
  { id: "55", title: "Kids Power Wheels Jeep - Pink", price: 120, images: ["https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800"], category: "Toys & Games", condition: "Good", description: "Power Wheels Jeep Wrangler in pink. 12V, 2 speeds + reverse. Battery and charger included. Some scratches from normal use. Kids outgrew it.", location: "Pasadena, LA", distance: "12.7 mi", postedAt: "1 day ago", seller: sellers.ashley, saved: false, depositAmount: 12, status: "available", shippingAvailable: true, shippingPrice: 15, deliveryOptions: ["pickup", "shipping"] },

  // ═══════════════ BUY AND SELL GROUPS ═══════════════
  { id: "56", title: "LA Sneakerheads - Jordan 4 Military Black", price: 220, images: ["https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800"], category: "Buy and sell groups", condition: "New", description: "Jordan 4 Retro Military Black. Size 11. DS (deadstock), never tried on. Have receipt from Nike. Meet at Fairfax or DTLA.", location: "Fairfax, LA", distance: "2.5 mi", postedAt: "1 hour ago", seller: sellers.tyler, saved: false, depositAmount: 22, status: "available", shippingAvailable: true, shippingPrice: 15, deliveryOptions: ["pickup", "shipping"] },
  { id: "57", title: "LA Car Parts - OEM Honda Civic Headlights", price: 150, images: ["https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800"], category: "Buy and sell groups", condition: "Like New", description: "OEM Honda Civic 2016-2021 headlight assemblies, left and right. Pulled from low-mileage car. Crystal clear, no hazing or cracks.", location: "Gardena, LA", distance: "12.0 mi", postedAt: "4 hours ago", seller: sellers.mike, saved: false, depositAmount: 15, status: "available", shippingAvailable: true, shippingPrice: 15, deliveryOptions: ["pickup", "shipping"] },
  { id: "58", title: "LA Plant Swap - Monstera Deliciosa Cutting", price: 15, images: ["https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800"], category: "Buy and sell groups", condition: "New", description: "Monstera Deliciosa cutting with 2 nodes and aerial root. Already rooted in water. Ready to pot. Can also trade for other rare plants.", location: "Echo Park, LA", distance: "3.8 mi", postedAt: "2 hours ago", seller: sellers.maria, saved: false, depositAmount: 0, status: "available", shippingAvailable: true, shippingPrice: 15, deliveryOptions: ["pickup", "shipping"] },
];

export const conversations: Conversation[] = [
  {
    id: "c1",
    listing: { id: "15", title: "PS5 Slim + 2 Controllers + 5 Games", image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=200", price: 380 },
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
    listing: { id: "34", title: "Standing Desk - Electric Adjustable", image: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=200", price: 280 },
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

// Helper to get listings by seller
export function getListingsBySeller(sellerId: string): Listing[] {
  return listings.filter((l) => l.seller.id === sellerId);
}

// Helper to get listings by category
export function getListingsByCategory(category: string): Listing[] {
  return listings.filter((l) => l.category === category);
}

// Smart search — matches title, description, category, location, and related terms
const synonyms: Record<string, string[]> = {
  car: ["vehicle", "auto", "sedan", "suv", "truck", "honda", "toyota", "civic", "camry"],
  phone: ["iphone", "samsung", "pixel", "mobile", "cell", "smartphone"],
  laptop: ["macbook", "computer", "notebook", "pc", "mac"],
  tv: ["television", "oled", "monitor", "screen", "display"],
  couch: ["sofa", "loveseat", "sectional", "futon"],
  bike: ["bicycle", "cycling", "mountain bike", "road bike", "trek"],
  guitar: ["fender", "gibson", "stratocaster", "les paul", "bass"],
  piano: ["keyboard", "yamaha", "digital piano"],
  game: ["playstation", "ps5", "xbox", "nintendo", "switch", "gaming", "console"],
  drone: ["dji", "quadcopter", "aerial"],
  camera: ["canon", "nikon", "sony", "mirrorless", "dslr", "photography"],
  apartment: ["rental", "room", "studio", "loft", "housing", "lease"],
  shoes: ["sneakers", "jordan", "nike", "adidas", "boots"],
  desk: ["standing desk", "office", "workspace", "table"],
  chair: ["office chair", "herman miller", "aeron", "ergonomic"],
  baby: ["stroller", "infant", "toddler", "kids", "children", "crib"],
  pet: ["dog", "cat", "fish", "aquarium", "crate", "animal"],
  grill: ["bbq", "barbecue", "weber", "smoker", "outdoor cooking"],
  free: ["free stuff", "giveaway", "moving sale"],
  music: ["instrument", "guitar", "piano", "drums", "vinyl", "record"],
  art: ["painting", "canvas", "craft", "cricut"],
  tools: ["drill", "dewalt", "power tools", "hardware"],
  workout: ["gym", "fitness", "dumbbells", "exercise", "weights", "bench"],
  surf: ["surfboard", "surfing", "beach", "wave"],
  house: ["home", "condo", "townhouse", "property", "real estate"],
};

export function smartSearch(query: string): Listing[] {
  if (!query.trim()) return listings;

  const q = query.toLowerCase().trim();
  const queryWords = q.split(/\s+/);

  // Expand query with synonyms
  const expandedTerms = new Set(queryWords);
  for (const word of queryWords) {
    // Check if word matches a synonym key
    for (const [key, syns] of Object.entries(synonyms)) {
      if (key.includes(word) || word.includes(key) || syns.some((s) => s.includes(word) || word.includes(s))) {
        expandedTerms.add(key);
        syns.forEach((s) => expandedTerms.add(s));
      }
    }
  }

  const terms = Array.from(expandedTerms);

  // Score each listing
  const scored = listings.map((listing) => {
    const searchText = `${listing.title} ${listing.description} ${listing.category} ${listing.location} ${listing.condition}`.toLowerCase();
    let score = 0;

    for (const term of terms) {
      if (listing.title.toLowerCase().includes(term)) score += 10;
      if (listing.category.toLowerCase().includes(term)) score += 5;
      if (listing.description.toLowerCase().includes(term)) score += 3;
      if (listing.location.toLowerCase().includes(term)) score += 2;
    }

    // Exact query match in title gets big bonus
    if (listing.title.toLowerCase().includes(q)) score += 20;

    return { listing, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.listing);
}
