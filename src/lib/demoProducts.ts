import type { Listing } from "./data";

// ═══════════════════════════════════════
// CITIES: Major US cities (all 50 states) + Canadian cities
// ═══════════════════════════════════════
const cities = [
  // US - Major cities by state
  "Birmingham, AL","Anchorage, AK","Phoenix, AZ","Little Rock, AR","Los Angeles, CA","San Francisco, CA","San Diego, CA",
  "Denver, CO","Hartford, CT","Wilmington, DE","Miami, FL","Tampa, FL","Orlando, FL","Jacksonville, FL",
  "Atlanta, GA","Honolulu, HI","Boise, ID","Chicago, IL","Indianapolis, IN","Des Moines, IA",
  "Wichita, KS","Louisville, KY","New Orleans, LA","Portland, ME","Baltimore, MD",
  "Boston, MA","Detroit, MI","Minneapolis, MN","Jackson, MS","Kansas City, MO","St. Louis, MO",
  "Billings, MT","Omaha, NE","Las Vegas, NV","Manchester, NH","Newark, NJ",
  "Albuquerque, NM","New York, NY","Brooklyn, NY","Charlotte, NC","Raleigh, NC","Fargo, ND",
  "Columbus, OH","Cleveland, OH","Oklahoma City, OK","Portland, OR","Philadelphia, PA","Pittsburgh, PA",
  "Providence, RI","Charleston, SC","Sioux Falls, SD","Nashville, TN","Memphis, TN",
  "Houston, TX","Dallas, TX","Austin, TX","San Antonio, TX","Salt Lake City, UT",
  "Burlington, VT","Richmond, VA","Seattle, WA","Charleston, WV","Milwaukee, WI","Cheyenne, WY",
  "Washington, DC",
  // Canada
  "Toronto, ON","Vancouver, BC","Montreal, QC","Calgary, AB","Edmonton, AB","Ottawa, ON",
  "Winnipeg, MB","Halifax, NS","Victoria, BC","Saskatoon, SK","Regina, SK","St. John's, NL",
  "Fredericton, NB","Charlottetown, PE","Whitehorse, YT","Yellowknife, NT",
];

// ═══════════════════════════════════════
// CATEGORIES (FB Marketplace + extras)
// ═══════════════════════════════════════
export const allCategories = [
  "Vehicles","Property Rentals","Apparel","Electronics","Entertainment",
  "Family","Free Stuff","Garden & Outdoor","Hobbies","Home Goods",
  "Home Improvement Supplies","Home Sales","Musical Instruments","Office Supplies",
  "Pet Supplies","Sporting Goods","Toys & Games","Jewelry & Accessories",
  "Health & Beauty","Books & Movies","Collectibles","Furniture",
  "Classifieds","Buy and sell groups",
];

// ═══════════════════════════════════════
// PRODUCT TEMPLATES per category (with real Unsplash images)
// ═══════════════════════════════════════
interface ProductTemplate {
  titles: string[];
  images: string[];
  prices: number[];
  conditions: string[];
  descriptions: string[];
  shippable: boolean;
}

const templates: Record<string, ProductTemplate> = {
  Vehicles: {
    titles: [
      "2020 Toyota RAV4 XLE - Clean Title","2019 Honda Accord Sport - Low Miles","2018 Ford F-150 XLT - 4WD","2021 Tesla Model 3 SR+ - White",
      "2017 Jeep Wrangler Unlimited","2022 Hyundai Tucson SEL","Electric Scooter - Xiaomi Mi Pro 2","2019 BMW 3 Series 330i",
      "2020 Subaru Outback Premium","2016 Chevrolet Silverado 1500","Yamaha MT-07 Motorcycle 2020","2021 Mazda CX-5 Touring",
      "2018 Audi A4 Premium Plus","2020 Kia Telluride SX","2015 Toyota Tacoma TRD Off-Road",
    ],
    images: [
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800",
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800",
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=800",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
    ],
    prices: [24500,21000,28500,35000,26000,27500,450,32000,25000,22000,6500,28000,24000,38000,27000],
    conditions: ["Good","Like New","Good","Like New","Good"],
    descriptions: ["Clean title, single owner, well maintained. Regular service at dealer. All records available.","Low mileage, excellent condition. Garage kept, non-smoker. Includes winter tires.","4WD, towing package, bed liner. Ready for work or adventure. New brakes and tires."],
    shippable: false,
  },
  Electronics: {
    titles: [
      "iPhone 15 Pro 256GB - Natural Titanium","Samsung Galaxy S24 Ultra 512GB","MacBook Air M3 15\" - Midnight","iPad Pro 12.9\" M2 + Pencil",
      "Sony A7IV Mirrorless Camera Body","PS5 Slim Digital + 4 Games","Xbox Series X + 2 Controllers","Nintendo Switch OLED + Games",
      "Dell XPS 15 Laptop - i7/32GB","AirPods Pro 2nd Gen","Sony WH-1000XM5 Headphones","DJI Mini 4 Pro Drone",
      "Samsung 65\" 4K Smart TV","LG C3 55\" OLED TV","Bose QuietComfort Ultra Earbuds",
      "Canon EOS R6 II + 24-70mm","GoPro Hero 12 Black Bundle","Meta Quest 3 128GB","Apple Watch Ultra 2",
      "Sonos Beam Gen 2 Soundbar",
    ],
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800",
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800",
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800",
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800",
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800",
    ],
    prices: [899,950,1100,899,1800,380,420,320,1200,180,280,700,550,1100,220,2200,350,450,700,350],
    conditions: ["Like New","Like New","Good","Like New","Like New","Like New","Good"],
    descriptions: ["Excellent condition, always had case and screen protector. Original box and accessories included.","Barely used, works perfectly. Selling because I upgraded. Battery health excellent.","Comes with all original accessories. No scratches or dents. Like new condition."],
    shippable: true,
  },
  Apparel: {
    titles: [
      "Nike Air Jordan 1 High - Chicago Size 10","Vintage Levi's 501 Jeans - 32x32","Canada Goose Expedition Parka - M","Lululemon Align Leggings Bundle",
      "Ray-Ban Aviator Sunglasses - Gold","Dr. Martens 1460 Boots - Size 9","North Face Puffer Jacket - Women's L","Adidas Ultraboost 22 - Size 11",
      "Patagonia Better Sweater Fleece - XL","Designer Handbag - Coach Tabby","Vintage Band T-Shirt Collection (10)","Nike Dunk Low - Panda Size 9.5",
      "Carhartt WIP Hoodie - Black L","Supreme Box Logo Tee - Navy M","Birkenstock Arizona - Size 42",
    ],
    images: [
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800",
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
    ],
    prices: [250,85,650,90,120,140,180,130,110,220,75,160,95,280,90],
    conditions: ["New","Good","Like New","Like New","New","Good"],
    descriptions: ["Authentic, purchased from authorized retailer. Comes with original box and tags.","Excellent condition, barely worn. No stains, tears, or fading. Pet and smoke free home."],
    shippable: true,
  },
  Furniture: {
    titles: [
      "Mid-Century Modern Sofa - Walnut Frame","Standing Desk - Electric 60x30","IKEA KALLAX Shelf Unit 4x4","West Elm Dining Table + 4 Chairs",
      "Herman Miller Aeron Chair - Size B","King Bed Frame - Solid Wood Platform","Leather Recliner - La-Z-Boy","CB2 Acacia Coffee Table",
      "Pottery Barn Bookshelf - White","Floating TV Console - Walnut 72\"","Outdoor Patio Set - 6 Piece","Nursery Crib + Changing Table",
      "Sectional Couch - L-Shaped Grey","Bar Stools Set of 3 - Counter Height","Vintage Writing Desk - Restored",
    ],
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
      "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=800",
      "https://images.unsplash.com/photo-1589364231560-e0b3e75ab37a?w=800",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
    ],
    prices: [650,280,80,750,650,400,350,280,320,450,500,250,800,200,380],
    conditions: ["Good","Like New","Good","Like New","Good"],
    descriptions: ["Solid construction, no damage. Moving and need to sell. Pickup only due to size.","Excellent condition, barely used. No scratches or stains. Smoke-free home."],
    shippable: false,
  },
  "Property Rentals": {
    titles: [
      "1BR Apartment - Downtown - Modern","2BR Townhouse - Near Transit","Studio Loft - Arts District","Room for Rent - Shared House",
      "3BR House - Family Friendly","Furnished Studio - Month to Month","2BR Condo - Pool & Gym","Basement Suite - Private Entry",
    ],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800",
    ],
    prices: [1800,2200,1500,950,2800,1400,2100,1100],
    conditions: ["Like New","Good","Like New","Good"],
    descriptions: ["Modern finishes, in-unit laundry, great location near shops and transit. Available immediately.","Spacious layout, updated kitchen and bath. Pet friendly. Utilities included."],
    shippable: false,
  },
  "Garden & Outdoor": {
    titles: [
      "Weber Spirit Gas Grill - 3 Burner","Patio Furniture Set - 6 Piece","Raised Garden Bed Kit - Cedar","Electric Lawn Mower - EGO 21\"",
      "Fire Pit - Steel Wood Burning","Outdoor String Lights - 48ft","Garden Tool Set - 12 Piece","Pressure Washer - 3100 PSI",
      "Hammock with Stand","Outdoor Storage Shed 8x6","Adirondack Chairs Set of 2","Bird Bath - Concrete Pedestal",
    ],
    images: [
      "https://images.unsplash.com/photo-1529543544089-28ab4e3ad822?w=800",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800",
      "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800",
    ],
    prices: [280,450,65,350,120,35,45,200,90,400,180,55],
    conditions: ["Good","Good","New","Like New","Good"],
    descriptions: ["Well maintained, works great. Selling because we're moving. You pick up."],
    shippable: false,
  },
  "Sporting Goods": {
    titles: [
      "Mountain Bike - Trek Marlin 7","Surfboard - 6'2\" Shortboard","Home Gym Dumbbells + Bench","Golf Club Set - Callaway Complete",
      "Kayak - 10ft Sit-On-Top","Snowboard + Bindings + Boots","Tennis Racket - Wilson Pro Staff","Basketball Hoop - Adjustable Portable",
      "Camping Tent - 4 Person","Fishing Rod & Reel Combo","Yoga Mat + Block Set","Boxing Heavy Bag + Gloves",
      "Skateboard - Complete Custom","Road Bike - Carbon Frame 56cm","Peloton Bike+ with Accessories",
    ],
    images: [
      "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800",
      "https://images.unsplash.com/photo-1502680390548-bdbac40e4a9f?w=800",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
      "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800",
    ],
    prices: [520,350,300,450,380,280,120,200,150,85,40,120,90,1200,1500],
    conditions: ["Good","Good","Like New","Good","Like New"],
    descriptions: ["Great condition, well maintained. Some normal wear from use. Everything functions perfectly."],
    shippable: false,
  },
  "Musical Instruments": {
    titles: [
      "Gibson Les Paul Standard - Gold Top","Yamaha P-125 Digital Piano + Stand","Fender Player Stratocaster","Roland TD-17 Electronic Drum Kit",
      "Martin D-28 Acoustic Guitar","Violin 4/4 - Student Outfit","Ukulele - Kala Concert Mahogany","DJ Controller - Pioneer DDJ-400",
      "Bass Guitar - Fender Jazz Bass","PA Speaker System - 2x 15\"","Studio Microphone - Audio-Technica","Guitar Amp - Fender Blues Jr",
    ],
    images: [
      "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800",
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800",
      "https://images.unsplash.com/photo-1550985616-10810253b84d?w=800",
      "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800",
    ],
    prices: [2200,420,550,800,1800,180,80,200,650,450,150,500],
    conditions: ["Like New","Like New","Good","Like New","Good"],
    descriptions: ["Excellent condition, plays and sounds great. Includes original case and accessories."],
    shippable: true,
  },
  "Toys & Games": {
    titles: [
      "LEGO Star Wars Millennium Falcon","Nintendo Switch OLED + 8 Games","Power Wheels Jeep - Pink","PS5 Console + 5 Games Bundle",
      "Nerf Gun Collection - 8 Blasters","Board Game Collection - 15 Games","Hot Wheels Track Set - Mega","Kids Bike - 16\" with Training Wheels",
      "Barbie Dream House - Complete","LEGO Technic Bugatti Chiron","RC Car - Traxxas Slash 4x4","Playmobil Castle Set",
    ],
    images: [
      "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=800",
      "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=800",
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800",
      "https://images.unsplash.com/photo-1611891487122-207579d67d98?w=800",
    ],
    prices: [650,320,120,450,80,120,60,75,150,280,350,90],
    conditions: ["Like New","Like New","Good","Like New","Good"],
    descriptions: ["Complete with all pieces and instructions. Excellent condition. Great gift idea."],
    shippable: true,
  },
  "Home Goods": {
    titles: [
      "Dyson V15 Cordless Vacuum","KitchenAid Stand Mixer - Red","Instant Pot Duo 8 Qt","Nespresso Vertuo Coffee Machine",
      "iRobot Roomba i7+ Self-Emptying","Le Creuset Dutch Oven 5.5 Qt","Vitamix Blender A3500","King Size Duvet + Sheet Set",
      "Cast Iron Skillet Set - 3 Piece","Air Purifier - Dyson Pure Cool","Keurig K-Supreme Plus","Cuisinart Food Processor 14-Cup",
    ],
    images: [
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
      "https://images.unsplash.com/photo-1585515320310-259814833e62?w=800",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800",
    ],
    prices: [380,250,60,150,400,220,350,120,65,350,130,100],
    conditions: ["Like New","Good","New","Like New","Like New"],
    descriptions: ["Works perfectly, well maintained. Selling because we upgraded. All parts and manuals included."],
    shippable: true,
  },
  Family: {
    titles: [
      "UPPAbaby Vista V2 Stroller","Baby Clothes Bundle 0-12M - 50pc","Graco Pack N Play","Car Seat - Britax B-Safe 35",
      "High Chair - Stokke Tripp Trapp","Baby Monitor - Nanit Pro","Breast Pump - Spectra S1","Diaper Bag - Skip Hop Mainframe",
      "Kids Play Kitchen - KidKraft","Toddler Bed + Mattress","Baby Swing - 4moms MamaRoo","Crib Mattress - Newton Baby",
    ],
    images: [
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800",
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800",
      "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=800",
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800",
    ],
    prices: [450,60,75,120,200,180,150,80,100,130,200,160],
    conditions: ["Like New","Good","Like New","Good","Like New"],
    descriptions: ["Gently used, excellent condition. Pet and smoke free home. Baby outgrew it."],
    shippable: true,
  },
  "Pet Supplies": {
    titles: [
      "Large Dog Crate - 42\"","Cat Tree Tower - 72\"","Aquarium 55 Gallon + Full Setup","Dog Bed - Orthopedic XL",
      "Pet Carrier - Airline Approved","Automatic Pet Feeder","Dog Stroller - 3 Wheel","Fish Tank LED Light System",
      "Cat Litter Box - Self-Cleaning","Dog Agility Training Kit","Reptile Terrarium 40 Gallon","Pet GPS Tracker Collar",
    ],
    images: [
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800",
      "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=800",
      "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800",
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800",
    ],
    prices: [45,55,180,60,40,70,120,85,350,65,100,45],
    conditions: ["Good","Good","Good","Like New","New"],
    descriptions: ["Clean, well maintained. Pet outgrew it. Smoke-free home."],
    shippable: true,
  },
  "Office Supplies": {
    titles: [
      "Dual Monitor Setup - 2x Dell 27\"","Ergonomic Office Chair","Laser Printer - Brother Wireless","Standing Desk Converter",
      "Webcam - Logitech 4K Stream","Monitor Arm - Dual Mount","Desk Lamp - BenQ ScreenBar","Filing Cabinet - 3 Drawer Metal",
      "Whiteboard - 4x3 ft Magnetic","Desk Organizer Set","Ergonomic Keyboard - Logitech","USB-C Hub Dock Station",
    ],
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800",
      "https://images.unsplash.com/photo-1589364231560-e0b3e75ab37a?w=800",
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800",
      "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=800",
    ],
    prices: [380,280,60,180,100,80,90,75,50,30,120,65],
    conditions: ["Good","Good","Good","Like New","New"],
    descriptions: ["Great for work from home setup. Everything works perfectly. Clean, non-smoking office."],
    shippable: true,
  },
  "Home Improvement Supplies": {
    titles: [
      "DeWalt Drill/Driver Kit 20V","Interior Paint 5 Gal - White","Tile Lot - 200 sqft Subway","Table Saw - DeWalt 10\"",
      "Bathroom Vanity 36\" - White","Hardwood Flooring - Oak 100sqft","Chandelier - Modern Crystal","Tool Box - Craftsman Rolling",
      "Fence Panels - Cedar 6x8 (5)","Kitchen Faucet - Moen Touchless","Door Hardware Set - Matte Black","Garage Door Opener - Chamberlain",
    ],
    images: [
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800",
      "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=800",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800",
      "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800",
    ],
    prices: [85,120,150,350,280,300,180,200,250,160,45,220],
    conditions: ["Good","New","New","Good","New"],
    descriptions: ["Surplus from project. Brand new in box or lightly used. Great deal."],
    shippable: false,
  },
  Entertainment: {
    titles: [
      "Concert Tickets x2 - Floor Seats","Board Game Collection - 15 Games","Vinyl Record Collection - 50+ Classic","Home Projector - 4K Native",
      "Record Player - Audio-Technica LP120","Movie Poster Collection - Framed","Karaoke Machine - Professional","Poker Set - 500 Chip Case",
    ],
    images: [
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800",
      "https://images.unsplash.com/photo-1611891487122-207579d67d98?w=800",
      "https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?w=800",
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800",
    ],
    prices: [400,120,200,550,250,180,150,60],
    conditions: ["New","Good","Good","Like New","Like New"],
    descriptions: ["Great condition. See photos for details. Can meet locally or ship."],
    shippable: true,
  },
  "Free Stuff": {
    titles: [
      "FREE - Moving Out Kitchen Items","FREE - Queen Mattress","FREE - Moving Boxes & Supplies","FREE - Kids Toys & Books",
      "FREE - Office Chair - Needs Repair","FREE - Old TV - Still Works","FREE - Garden Pots & Soil","FREE - Firewood - You Haul",
    ],
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800",
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800",
    ],
    prices: [0,0,0,0,0,0,0,0],
    conditions: ["Fair","Good","Good","Fair","Fair"],
    descriptions: ["Free to a good home. Must pick up. Available this weekend. First come first served."],
    shippable: false,
  },
  Hobbies: {
    titles: [
      "Canon EOS R6 II + RF 24-105mm","Cricut Maker 3 + Materials","Oil Painting Supplies Complete","3D Printer - Bambu Lab A1 Mini",
      "Telescope - Celestron NexStar 8SE","Sewing Machine - Brother SE1900","Model Train Set - HO Scale","Drone - DJI Air 3",
      "Pottery Wheel - Electric","Stamp Collection - 500+ Vintage","Aquascape Kit - Complete","Metal Detector - Garrett Ace 400",
    ],
    images: [
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800",
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800",
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800",
      "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=800",
      "https://images.unsplash.com/photo-1532978379173-523e16f371f2?w=800",
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800",
      "https://images.unsplash.com/photo-1555505019-8c3cf5aa2a18?w=800",
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800",
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800",
      "https://images.unsplash.com/photo-1584727638236-fedb78e4489f?w=800",
      "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800",
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800",
    ],
    prices: [2100,320,90,250,1200,350,280,1100,400,150,120,280],
    conditions: ["Like New","Like New","Good","New","Like New"],
    descriptions: [
      "Canon EOS R6 II mirrorless body with RF 24-105mm f/4 L IS USM lens. Purchased 6 months ago, used on maybe 3 trips.\n\n• Shutter count under 2,000\n• Includes original box, charger, strap, and lens hood\n• Extra battery and 128GB SD card included\n• No scratches, dents, or sensor dust\n\nUpgrading to the R5 II so this needs a new home.",
      "Cricut Maker 3 with a bunch of materials to get you started right away.\n\n1. Cricut Maker 3 machine with blade housing\n2. 15+ sheets of premium vinyl (various colors)\n3. Transfer tape rolls\n4. StandardGrip and LightGrip mats\n5. Weeding tools and scraper\n\nUsed for a few projects, works perfectly. Great for anyone getting into crafting.",
      "Everything you need to start oil painting. Perfect beginner-to-intermediate setup.\n\nIncludes Winsor & Newton oil paint set (24 tubes), three canvas panels (16x20), a tabletop easel, palette, palette knives, brushes (12 assorted), linseed oil, and turpentine. Some tubes opened but most are 80%+ full. The brushes are clean and in good shape.",
      "Bambu Lab A1 Mini 3D printer, brand new in sealed box. Got it as a gift but I already have a Prusa.\n\n• Auto bed leveling\n• Multi-color printing capable\n• 180x180x180mm build volume\n• Includes starter PLA filament\n\nThis thing prints beautifully out of the box. No assembly headaches.",
      "Celestron NexStar 8SE computerized telescope. This is the 8-inch Schmidt-Cassegrain model with the fully automated GoTo mount.\n\nI've had it about a year and used it maybe 10 times. Optics are flawless. Comes with the original tripod, hand controller, star diagonal, and 25mm eyepiece.\n\nAlso throwing in a 2x Barlow lens and a phone adapter I bought separately. Amazing for planets and deep sky objects.",
      "Brother SE1900 sewing and embroidery machine. Has both regular sewing and a 5x7 embroidery area.\n\n1. 240 built-in stitches\n2. 138 embroidery designs\n3. Large color touchscreen\n4. Includes 3 extra embroidery hoops\n5. Thread set with 20 colors\n\nUsed for about a year of light hobby sewing. Everything works perfectly. Comes with dust cover and all original accessories.",
      "Complete HO scale model train set — layout ready to run. Includes Bachmann E-Z Track system, two locomotives, 15+ rolling stock cars, a power pack, and a bunch of buildings and scenery pieces.\n\nI spent about $600 building this up over two years. Mountains, trees, tunnel, bridges — it's all here. Would be great for someone who wants a ready-made setup or a parent looking for a holiday project with the kids.",
      "DJI Air 3 drone with Fly More Combo. Dual-camera system with 48MP wide and 3x medium tele.\n\n• 46 min max flight time\n• 3 batteries (Fly More combo)\n• Carrying case and ND filter set\n• Registered with FAA — will transfer\n• Only 12 flights total\n\nSelling because I got the Mavic 3 Pro. This is an incredible drone for the price.",
      "Electric pottery wheel, 350W motor with variable speed foot pedal. Includes a bat system and splash pan.\n\nAlso comes with a full set of pottery tools, a wire clay cutter, sponges, and about 25 lbs of unused stoneware clay. Used it for about 6 months — made some cool mugs and bowls. Moving to a smaller place so I can't keep it.\n\nPerfect for a beginner who wants a real wheel, not a toy.",
      "Huge stamp collection — over 500 individual stamps from around the world. Spans from the 1920s through the 1980s.\n\n• Organized in 3 Lighthouse stockbooks\n• US, UK, Canada, France, Germany, Japan, and more\n• Includes some first day covers\n• Several mint condition commemoratives\n\nInherited from my grandfather. I don't collect so it's time to pass these along to someone who appreciates them.",
      "Complete aquascaping kit for a planted freshwater tank. Everything you need except the tank itself.\n\n1. CO2 regulator + solenoid + diffuser\n2. ADA Aqua Soil Amazonia (9L bag)\n3. Driftwood pieces (3) and dragon stone (5 lbs)\n4. LED plant light (Chihiros WRGB II)\n5. Stainless steel tool set\n6. Liquid fertilizer kit\n\nUsed for one setup that I tore down. CO2 system works flawlessly.",
      "Garrett Ace 400 metal detector. The best entry-to-mid-level detector you can buy.\n\nComes with the standard 8.5x11\" DD coil, headphones, rechargeable battery pack, a finds pouch, and a pinpointer (Garrett Pro-Pointer AT). I also have a digging tool I'll throw in.\n\nFound some cool coins and relics with this. Moving to a Minelab Equinox so I'm letting this go. Great for beginners or anyone who wants a solid all-purpose machine.",
    ],
    shippable: true,
  },
  "Jewelry & Accessories": {
    titles: [
      "Diamond Engagement Ring 1ct - 14K","Apple Watch Ultra 2 - Titanium","Gold Chain Necklace 18\" - 10K","Designer Sunglasses - Gucci",
      "Pearl Earrings - Freshwater Set","Leather Watch - Fossil Chronograph","Silver Bracelet - Tiffany & Co","Vintage Brooch Collection",
    ],
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800",
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800",
      "https://images.unsplash.com/photo-1515562141589-67f0d569b6c4?w=800",
      "https://images.unsplash.com/photo-1509941943102-10c232535736?w=800",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800",
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800",
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800",
    ],
    prices: [3500,700,450,280,120,130,250,180],
    conditions: ["Like New","Like New","Good","New","Like New"],
    descriptions: [
      "Stunning 1 carat round brilliant diamond set in 14K white gold. VS2 clarity, G color, excellent cut.\n\n• GIA certified (certificate included)\n• Size 6.5, can be resized\n• Original ring box from jeweler\n• Appraised at $5,200\n\nSelling due to a change in plans. Happy to meet at a jeweler for in-person verification.",
      "Apple Watch Ultra 2 in natural titanium with the orange Alpine Loop band. Purchased in January, worn for about 3 months.\n\nBattery health is 100%. Screen is flawless — always had a screen protector on it. Comes with the original box, charger, and an extra Trail Loop band in black.\n\nSwitching back to a traditional watch. This thing is a beast for fitness and outdoor activities.",
      "10K solid gold rope chain, 18 inches, 3mm width. Not plated, not filled — real 10K gold.\n\n1. Weight: approximately 8 grams\n2. Lobster clasp closure\n3. Stamped 10K on clasp\n4. Comes in a velvet pouch\n\nBought at a jewelry store last year. Barely worn — I prefer silver. Price is firm, below what I paid.",
      "Authentic Gucci GG0396S sunglasses. Women's oversized square frame in black with grey gradient lenses.\n\nComes with the original Gucci case, cleaning cloth, and authenticity card. Purchased at Nordstrom. No scratches on lenses or frames.\n\nRetail was $420. Selling because I got a different pair as a gift.",
      "Beautiful freshwater pearl earring set — includes one pair of classic stud earrings (8mm) and one pair of drop earrings (10mm).\n\nBoth set in sterling silver with butterfly backs. Pearls have excellent luster and are nicely matched in color. Comes in a gift box. Perfect for everyday wear or a special occasion.\n\nOnly worn a few times. Selling because I developed a nickel sensitivity.",
      "Fossil Chronograph watch, men's, brown leather strap with blue dial. Model FS5151.\n\n• Quartz movement, running perfectly\n• 44mm case, stainless steel\n• Chronograph subdials work flawlessly\n• Some minor wear on strap (easily replaced)\n• Original tin and paperwork included\n\nGreat everyday watch. Looks sharp with both casual and business outfits.",
      "Tiffany & Co. sterling silver chain bracelet. The classic Tiffany link design — instantly recognizable.\n\nComes with the original blue box and pouch. Light patina that polishes right off. I have the receipt for authentication. Length is 7.5 inches.\n\nWas a gift. It's beautiful but I just don't wear bracelets enough to justify keeping it.",
      "Collection of 15 vintage brooches from the 1940s-1970s. Mix of rhinestone, enamel, and gold-tone pieces.\n\n1. 4 rhinestone floral brooches\n2. 3 enamel bird/butterfly pins\n3. 2 gold-tone abstract designs\n4. 3 pearl cluster brooches\n5. 2 Art Deco geometric pins\n6. 1 cameo brooch\n\nAll in good to excellent condition. These were my grandmother's. Would look amazing on a jacket or displayed in a shadow box.",
    ],
    shippable: true,
  },
  "Health & Beauty": {
    titles: [
      "Theragun Elite Massage Gun","NuFace Trinity Facial Device","Dyson Airwrap Complete","Peloton Guide + Accessories",
      "Vitamix Blender - Smoothie Maker","Essential Oil Diffuser + 12 Oils","Rowing Machine - Concept2","Red Light Therapy Panel",
    ],
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800",
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800",
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800",
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800",
      "https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?w=800",
      "https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=800",
    ],
    prices: [280,350,450,200,300,50,800,250],
    conditions: ["Like New","Like New","Like New","Good","New"],
    descriptions: [
      "Theragun Elite percussion massage gun. The professional-grade one, not the Mini or Prime.\n\n• 5 built-in speeds (up to 2400 PPM)\n• Includes all 5 attachment heads\n• OLED screen works perfectly\n• Battery holds a full charge (2+ hours)\n• Carrying case included\n\nBeen using it after workouts for about 6 months. Fully sanitized. Selling because my PT gave me a different model.",
      "NuFace Trinity facial toning device — the full kit with the ELE attachment for around the eyes.\n\nUsed consistently for about 2 months and honestly saw results. Comes with a full-size gel primer (unopened) and a partially used one. Everything is sanitized.\n\nI'm moving to a different skincare routine so I'm passing this along. Retails for $500+. All original packaging included.",
      "Dyson Airwrap Complete long barrel version. Includes every attachment Dyson makes for this model.\n\n1. 1.2\" and 1.6\" Coanda smoothing dryer\n2. Round volumizing brush\n3. Firm smoothing brush\n4. 30mm and 40mm barrels (both directions)\n5. Pre-styling dryer\n6. Storage case\n\nUsed maybe 20 times. My hair is too short for it now. Everything works like new.",
      "Peloton Guide camera system for strength training. Mounts on your TV and tracks your form with the camera.\n\nComes with the Guide unit, heart rate band, remote, and HDMI cable. Also including a set of adjustable dumbbells (5-25 lbs) and a workout mat.\n\nI had a 6-month subscription which has ended — you'll need your own Peloton membership. The hardware works perfectly.",
      "Vitamix Explorian E310 blender. This is the one everyone raves about for smoothies, soups, and sauces.\n\nVariable speed control with 10 settings and pulse. The 48-oz container is crack-free and clear. Motor is strong — blends ice and frozen fruit like nothing. Includes the tamper tool.\n\nUpgrading to the A3500 so this one has to go. It's been a workhorse for 2 years with zero issues.",
      "Ultrasonic essential oil diffuser (large 500ml tank) plus 12 bottles of pure essential oils. Brand new, never opened.\n\n• Lavender, Eucalyptus, Peppermint, Tea Tree\n• Lemon, Orange, Rosemary, Frankincense\n• Ylang Ylang, Cedarwood, Bergamot, Clary Sage\n• Diffuser runs 10+ hours, 7 LED colors\n• Auto shut-off when water runs out\n\nBought as a gift but the person already had one. Still in shrink wrap.",
      "Concept2 Model D rowing machine with PM5 monitor. The gold standard of indoor rowers.\n\n• Tracks distance, pace, watts, calories\n• Bluetooth and ANT+ for apps\n• Separates in two pieces for storage\n• Includes phone holder attachment\n\nUsed regularly for about a year. Works flawlessly. These things last forever. Selling because I joined a gym. Can help load into your vehicle.",
      "Red light therapy panel — full body size (36\" tall). Combines 660nm red and 850nm near-infrared LEDs.\n\nMounted mine on a door hook (included). Timer function and adjustable intensity. Used it daily for about 4 months for recovery after workouts.\n\nComes with the panel, power cord, door mount kit, and protective goggles. In perfect working condition. Would cost $400+ new online.",
    ],
    shippable: true,
  },
  "Books & Movies": {
    titles: [
      "Complete Harry Potter Box Set","Blu-Ray Collection - 50+ Movies","College Textbooks - Engineering","Kindle Paperwhite + 200 Books",
      "Manga Collection - One Piece 1-100","Cookbook Collection - 20 Books","Vinyl Records - Jazz Collection","Board Book Bundle - Baby/Toddler 30pc",
    ],
    images: [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800",
      "https://images.unsplash.com/photo-1460705929567-3543ee1d5640?w=800",
      "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=800",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800",
      "https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=800",
      "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800",
      "https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?w=800",
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800",
    ],
    prices: [45,80,150,100,350,60,200,25],
    conditions: ["Good","Like New","Good","Like New","Good"],
    descriptions: [
      "Complete Harry Potter box set — all 7 books, paperback special edition with the beautiful chest-style box.\n\nBooks are in great condition. Some minor spine creasing from reading but no torn pages, water damage, or writing inside. Smoke-free, pet-free home.\n\nPerfect gift for a young reader or a collector who wants the matching set.",
      "Over 50 Blu-Ray movies. Mix of action, sci-fi, comedy, and drama. All discs play perfectly.\n\n• Marvel/DC superhero titles (8)\n• Christopher Nolan collection (5)\n• Classic comedies (10+)\n• Horror/thriller (7)\n• Drama/Oscar winners (10+)\n• Misc favorites (10+)\n\nCan send full list if interested. Selling as a lot — not splitting up. All cases are in good shape.",
      "Engineering textbooks from my mechanical engineering degree. Covers most core courses for ME, CE, or EE programs.\n\n1. Fundamentals of Thermodynamics (Borgnakke)\n2. Shigley's Mechanical Engineering Design\n3. Engineering Mechanics: Statics & Dynamics\n4. Calculus (Stewart, 8th Ed)\n5. Linear Algebra (Lay)\n6. Fluid Mechanics (Cengel)\n7. Materials Science (Callister)\n\nSome highlighting but all pages intact. Saved me a fortune compared to buying new. Passing the savings along.",
      "Kindle Paperwhite (11th gen, 2021) with 6.8\" display and warm light. Loaded with over 200 purchased Kindle books across multiple genres.\n\nThe Kindle itself is in excellent shape — always kept in a case. Battery lasts weeks. Includes a fabric case and USB-C cable.\n\nLibrary is heavy on sci-fi, fantasy, thrillers, and business. Full book list available on request. Account will be transferred.",
      "One Piece manga volumes 1 through 100. This took me years to collect. All English language, Viz Media editions.\n\nMost volumes are in very good condition — read once and shelved. A few earlier volumes (1-20) show some yellowing on edges, which is normal for manga this age. No missing pages or major damage.\n\nWill not split the set. This is over $1,000 worth of manga at retail. An incredible deal for any One Piece fan.",
      "Collection of 20 cookbooks covering a wide range of cuisines and skill levels.\n\n• Salt Fat Acid Heat (Nosrat)\n• The Food Lab (Kenji Lopez-Alt)\n• Mastering the Art of French Cooking (Julia Child)\n• Plenty (Ottolenghi)\n• Tartine Bread\n• And 15 more quality titles\n\nAll in good condition, some with sticky notes I'll remove. Perfect for someone building a kitchen library.",
      "Jazz vinyl record collection — 30+ records from the golden era and beyond.\n\nHighlights include Miles Davis (Kind of Blue, Bitches Brew), John Coltrane (A Love Supreme), Thelonious Monk, Dave Brubeck, Bill Evans, and more. Mix of original pressings and quality reissues.\n\nAll play great with minimal surface noise. Sleeves range from good to excellent. Selling as a complete lot — not splitting.",
      "Bundle of 30 board books for baby and toddler (ages 0-3). All the classics your little one needs.\n\n1. Goodnight Moon\n2. Brown Bear Brown Bear\n3. The Very Hungry Caterpillar\n4. Pat the Bunny\n5. Dear Zoo\n6. Plus 25 more favorites\n\nSome have minor chewing marks on corners (they're board books, after all) but all pages are intact and readable. Smoke-free, pet-free home.",
    ],
    shippable: true,
  },
  Collectibles: {
    titles: [
      "Pokémon Card Collection - 500+ Cards","Funko Pop Lot - 25 Figures","Coin Collection - US Silver Dollars","Sports Memorabilia - Signed Jersey",
      "Vintage Comic Books - Marvel Lot","Hot Wheels Collection - 100 Cars","Star Wars Collectibles Lot","Antique Clock - Working Condition",
    ],
    images: [
      "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=800",
      "https://images.unsplash.com/photo-1608889175123-8ee362201f81?w=800",
      "https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?w=800",
      "https://images.unsplash.com/photo-1461896836934-bd45ba8fccc7?w=800",
      "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800",
      "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=800",
      "https://images.unsplash.com/photo-1608889476518-738c9b1dcb40?w=800",
      "https://images.unsplash.com/photo-1584208124888-2a2bc452a131?w=800",
    ],
    prices: [200,180,500,350,300,150,250,400],
    conditions: ["Like New","New","Good","Like New","Good"],
    descriptions: [
      "Pokémon card collection — over 500 cards spanning multiple generations. Base Set through Scarlet & Violet.\n\n• 20+ holographic/foil cards\n• Several V and VMAX cards\n• 3 complete common/uncommon sets\n• Comes in a binder and two tins\n• A few PSA-worthy cards in top loaders\n\nCollected over 5 years. Selling as one lot — not picking through. Great starter collection or addition to an existing one.",
      "Lot of 25 Funko Pop vinyl figures. Mix of Marvel, Star Wars, DC, anime, and TV shows. All are in their original boxes.\n\nMost boxes are in excellent shape — a couple have minor shelf wear. Figures were displayed in a smoke-free room behind glass. Happy to send photos of every individual box.\n\nRetail value is well over $350. Great for a collector or someone who wants instant shelf decor.",
      "US silver dollar collection — 15 coins total. Mix of Morgan and Peace dollars from the late 1800s to 1920s.\n\n1. 8 Morgan Silver Dollars (1879-1921)\n2. 5 Peace Silver Dollars (1922-1935)\n3. 2 Eisenhower Silver Dollars (1971-1972)\n\nConditions range from VG to AU. No cleaned coins. Stored in individual flips inside a coin folder. Will include a loupe for inspection at meetup.",
      "Framed and authenticated signed jersey. NBA player — signature verified by Beckett Authentication (BAS).\n\nThe jersey is professionally framed behind UV-protective glass with a nameplate. Measures about 34x42 inches overall. Comes with the Beckett COA card and sticker.\n\nHanging in my office for 2 years. Perfect condition. This is a statement piece for any sports fan's man cave or game room.",
      "Lot of vintage Marvel comic books — 25 issues from the 1970s and 1980s. Titles include Amazing Spider-Man, X-Men, Avengers, and Fantastic Four.\n\nConditions range from Fair to Very Good. Some have price sticker residue or minor spine wear, but all are complete with no missing pages. Stored in bags with boards.\n\nA few keys in the lot that are worth more individually. Priced to move as a set.",
      "Hot Wheels collection — 100 cars in excellent condition. Mix of mainline, premium, and treasure hunt models. Spanning about 15 years of collecting.\n\n• 20+ premium/Real Riders\n• 5 Super Treasure Hunts\n• 30+ JDM and muscle car models\n• Custom display case included (holds 50)\n• Remaining cars in organized bins\n\nMy kid aged out of these. They've been displayed and stored properly — no sun fade or broken wheels.",
      "Star Wars collectibles lot — a mix of figures, props, and memorabilia.\n\n1. 12 Black Series 6\" figures (in box)\n2. Lightsaber replica (Force FX, Luke Skywalker)\n3. Original trilogy poster set (framed)\n4. Vintage Kenner figure lot (8 loose figures, 1977-1983)\n5. Mandalorian helmet display piece\n\nThis stuff has been in my collection for years. All authentic, no knockoffs. Happy to verify anything in person.",
      "Antique mantel clock, circa 1920s. Beautiful dark wood case with brass accents and a glass front panel. Keeps accurate time and chimes on the hour.\n\nI had it serviced by a clockmaker about 6 months ago — runs smoothly. Key-wound movement (key included). The face has some age patina that adds character but no cracks.\n\nThis is a genuine antique, not a reproduction. Would look stunning on a fireplace mantel or bookshelf.",
    ],
    shippable: true,
  },
  "Home Sales": {
    titles: [
      "2BR Condo - Open House Sunday","3BR Townhouse - Just Listed","4BR Family Home - Renovated","Studio Condo - Investment Property",
    ],
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800",
    ],
    prices: [350000,485000,650000,225000],
    conditions: ["Good","Like New","Like New","Good"],
    descriptions: [
      "Bright and spacious 2-bedroom condo in a well-maintained building. Updated kitchen with granite counters and stainless appliances. In-unit washer/dryer.\n\n• 950 sq ft, open floor plan\n• One assigned parking spot\n• Building has gym, pool, and concierge\n• HOA covers water, trash, and common areas\n\nOpen house this Sunday 1-4 PM. Pre-approval letter required for offers. Contact for private showing.",
      "Just listed! 3-bedroom, 2.5-bath townhouse in a quiet neighborhood with excellent schools.\n\n1. Built in 2018, modern finishes throughout\n2. Primary suite with walk-in closet and en-suite bath\n3. Attached 2-car garage\n4. Private backyard with patio\n5. New HVAC system installed 2024\n\nMove-in ready. Sellers are motivated. Schedule a showing today — this one won't last.",
      "Beautifully renovated 4-bedroom, 3-bath family home on a large corner lot. Complete gut renovation done in 2023.\n\nNew everything: roof, windows, plumbing, electrical, HVAC, kitchen, baths, and hardwood floors. Open concept main floor with a chef's kitchen featuring quartz counters and a large island.\n\nFinished basement with rec room and full bath. Fenced yard, mature trees. Walking distance to parks and transit.",
      "Studio condo perfect for a first-time buyer or investor. Currently tenant-occupied with a lease through December (paying $1,200/mo).\n\n• 480 sq ft with efficient layout\n• Updated bathroom\n• Building has laundry and bike storage\n• Low HOA — $180/month\n\nCap rate is solid for the area. Tenant is reliable and happy to stay. Great passive income opportunity. Serious buyers only.",
    ],
    shippable: false,
  },
  Classifieds: {
    titles: [
      "Handyman Services - Licensed","Math & Science Tutor - All Levels","Moving Help - 2 Guys + Truck","Dog Walker / Pet Sitter Available",
      "House Cleaning Service - Weekly","Personal Trainer - Certified","Photography Services - Events","Lawn Care & Landscaping",
    ],
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800",
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800",
      "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800",
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800",
      "https://images.unsplash.com/photo-1527515637462-cee1cc710ab8?w=800",
      "https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?w=800",
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800",
      "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=800",
    ],
    prices: [50,40,80,25,100,60,150,45],
    conditions: ["New","New","New","New","New"],
    descriptions: [
      "Licensed and insured handyman with 10+ years of experience. No job too small.\n\n• Drywall repair and painting\n• Furniture assembly (IKEA, Wayfair, etc.)\n• TV mounting and shelf installation\n• Minor plumbing and electrical\n• Deck and fence repair\n\nRate shown is per hour. Free estimates. Same-week availability in most cases. References available. Text or call anytime.",
      "Experienced tutor offering math and science help for all levels — elementary through college.\n\nSubjects include algebra, geometry, calculus, physics, chemistry, and biology. I have a B.S. in Engineering and 5 years of tutoring experience. Can meet at a library or do sessions over Zoom.\n\nRate is $40/hour. First session is half price so you can see if we're a good fit. Flexible scheduling — evenings and weekends available.",
      "Need help moving? Two strong guys with a 16-foot box truck ready to go.\n\n1. Apartment and house moves\n2. Single-item moves (couch, fridge, etc.)\n3. Storage unit load/unload\n4. Junk removal\n5. $80/hour for both movers + truck\n\nWe bring blankets, dollies, and straps. You don't need to lift a finger. Available 7 days a week. Typically can book within 48 hours. Over 200 happy moves completed.",
      "Reliable dog walker and pet sitter available in the area. I genuinely love animals and treat every pet like my own.\n\nServices offered:\n• 30-minute walks — $25\n• 60-minute walks — $40\n• Drop-in visits (feeding/meds) — $20\n• Overnight pet sitting — $60/night\n\nI'm experienced with all breeds and sizes. Also comfortable with cats, birds, and small animals. References from current clients available. Insured through Pet Sitters International.",
      "Professional house cleaning service — weekly, biweekly, or one-time deep cleans.\n\nWhat's included in a standard clean:\n• All rooms vacuumed and mopped\n• Bathrooms scrubbed (tub, toilet, sinks)\n• Kitchen counters, sink, and appliances wiped\n• Dusting all surfaces and baseboards\n• Trash taken out\n\n$100 for a standard 2-3 bedroom home (weekly rate). Deep cleans start at $175. I bring all my own supplies and equipment. Licensed and insured. Over 50 regular clients.",
      "NASM Certified Personal Trainer offering 1-on-1 and small group training. I specialize in weight loss, muscle building, and general fitness for beginners.\n\nSessions are $60/hour. Discounted packages available (10 sessions for $500). I can train at your home, a local park, or at my partner gym.\n\nFirst consultation is free — we'll discuss your goals and build a plan together. Flexible schedule, early morning through evening. Let's get after it.",
      "Professional photographer available for events, portraits, and small business needs.\n\n1. Weddings and engagements — from $150/hr\n2. Family portraits — $150 flat (1 hour, 20 edited photos)\n3. Corporate headshots — $100 (30 min, 5 edited photos)\n4. Birthday parties / events — $150/hr\n5. Product photography — inquire for pricing\n\nI shoot with Sony mirrorless gear. Edited photos delivered within 5 business days via online gallery. Portfolio available on request.",
      "Full-service lawn care and landscaping for residential properties.\n\nWeekly mowing starts at $45 depending on yard size. Also offering:\n• Hedge and shrub trimming\n• Leaf cleanup and yard debris removal\n• Mulch installation\n• Garden bed design and planting\n• Spring and fall cleanups\n\nI've been doing this for 8 years. Licensed and insured. Free estimates — just send me your address and I'll give you a quote within 24 hours.",
    ],
    shippable: false,
  },
  "Buy and sell groups": {
    titles: [
      "Sneakerheads - Jordan 4 Military Black","Car Parts - OEM Headlights","Plant Swap - Monstera Cutting","Vintage Clothing - 80s Denim Jacket",
      "Tech Deals - Refurb iPad Air","Sneaker Trade - Yeezy Slides","DIY Materials - Reclaimed Wood","Local Produce - Farm Fresh Eggs",
    ],
    images: [
      "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=800",
      "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800",
      "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800",
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800",
      "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=800",
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800",
      "https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=800",
    ],
    prices: [220,150,15,85,350,120,60,8],
    conditions: ["New","Like New","New","Good","Like New"],
    descriptions: [
      "Jordan 4 Military Black, size 10.5. DS (deadstock) — never worn. Comes with original box, tissue paper, and hang tag.\n\n• Purchased from Nike SNKRS app\n• Receipt included for authentication\n• No trades on this one\n• Price is firm — these are going for $250+ on StockX\n\nCan meet at a sneaker shop for legit check if you want. Local pickup preferred but will ship with tracking.",
      "OEM headlight assemblies for 2016-2021 Honda Civic. Both driver and passenger side. Pulled from a low-mileage vehicle — no cracks, hazing, or moisture.\n\nThese are genuine Honda OEM parts, not aftermarket. Plug and play, no modifications needed.\n\nRetail is $350+ each at the dealer. Selling the pair for $150. Great for anyone with yellowed or damaged headlights who wants the factory look back.",
      "Healthy Monstera deliciosa cutting with 2 nodes and an established aerial root. Already showing new growth.\n\nI propagated this from my mature plant that has huge fenestrated leaves. Rooted in water for 3 weeks — ready to pot in soil or keep in water.\n\nHappy to swap for other cuttings (especially Philodendron, Pothos varieties, or Hoya). Or $15 cash. Can meet locally.",
      "Authentic vintage denim jacket from the 1980s. Perfectly faded medium blue wash with that lived-in look you can't fake.\n\n1. Brand: Levi's Type III trucker jacket\n2. Size: Medium (fits true to size)\n3. Era: Mid-1980s based on tag style\n4. Two chest pockets, button front\n5. Some natural distressing on cuffs and collar\n\nThis jacket has incredible character. Pairs with literally everything. No holes, stains, or repairs needed.",
      "Refurbished iPad Air (5th gen, M1 chip) 64GB Wi-Fi in Space Gray. Fully tested and reset to factory settings.\n\nScreen is flawless — was always in a case with screen protector. Battery health is excellent (96%). Comes with a third-party case, charger, and cable. No original box.\n\nSaving you $150+ vs buying new. Perfect for school, drawing, or streaming. Runs the latest iPadOS with zero issues.",
      "Yeezy Slides in Onyx, size 11. Worn twice — basically brand new. Just too big for me.\n\n• No box but I have the Confirmed app receipt\n• No scuffs or dirt\n• The foam is still fully bouncy\n\nLooking to sell or trade for a size 10. If trading, must be same colorway and similar condition. Will meet locally — not shipping these.",
      "Bundle of reclaimed wood planks — great for DIY projects, accent walls, shelving, or furniture builds.\n\nAbout 50 board feet total. Mix of barn wood and old-growth pine. Various widths (4-8 inches) and lengths (2-5 feet). Some still have the original patina and nail holes.\n\nI salvaged these from a barn demo project and have more than I need. Perfect for that rustic farmhouse look. You haul.",
      "Farm fresh eggs from our backyard flock of free-range hens. Mixed colors — brown, white, blue, and green.\n\n• $8 per dozen\n• Hens eat organic feed + forage\n• No antibiotics or hormones\n• Available weekly\n\nWe have about 15 hens producing more than our family can eat. Eggs are unwashed with the bloom intact (lasts longer). Can meet at our farm stand or at the Saturday market.",
    ],
    shippable: true,
  },
};

// ═══════════════════════════════════════
// SELLER AVATARS
// ═══════════════════════════════════════
const avatars = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
  "https://images.unsplash.com/photo-1599566150163-29194dcabd9c?w=200",
  "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200",
];

// ═══════════════════════════════════════
// CHEAP / POPULAR items people actually search for
// ═══════════════════════════════════════
const cheapTemplates: Record<string, ProductTemplate> = {
  Electronics: {
    titles: [
      "iPhone Charger Cable 3-Pack","Phone Case - Clear Protective","USB-C Hub Adapter","Bluetooth Speaker - Portable",
      "Wireless Mouse + Keyboard Combo","HDMI Cable 6ft","Ring Doorbell - Used","Power Bank 20000mAh",
      "AirPods Case - Silicone","Smart Plug 4-Pack","LED Strip Lights 50ft","Roku Streaming Stick",
      "Webcam HD 1080p","USB Flash Drive 128GB","Car Phone Mount","Dash Cam - Front Only",
      "Old iPad Air 2 - Works Great","Android Tablet 10\" - Budget","Portable Monitor 15.6\"","Smart Watch - Fitness Tracker",
    ],
    images: [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800",
      "https://images.unsplash.com/photo-1601593346740-925612772716?w=800",
      "https://images.unsplash.com/photo-1625723044792-44de16ccb4e8?w=800",
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800",
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800",
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800",
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=800",
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800",
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800",
      "https://images.unsplash.com/photo-1556740758-90de940e0603?w=800",
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800",
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800",
      "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=800",
      "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800",
      "https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?w=800",
      "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=800",
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800",
      "https://images.unsplash.com/photo-1632882765546-1ee75f53becb?w=800",
      "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=800",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800",
    ],
    prices: [8,12,20,25,30,5,60,18,8,25,15,25,20,10,12,45,80,70,95,35],
    conditions: ["New","Like New","New","Good","New"],
    descriptions: [
      "3-pack of iPhone charging cables — 3ft, 6ft, and 10ft lengths. MFi certified, braided nylon, and they actually last.\n\nBought a bulk pack and have extras. These work with iPhone 5 through 14 (Lightning). Brand new, never used.\n\nWay better than the cheap ones that fray after a month.",
      "Clear protective phone case, fits iPhone 15 / 15 Pro. Slim profile with raised edges for camera and screen protection.\n\nBrand new in packaging. Has a slight yellowish tint-resistance coating so it stays clear longer. Bought the wrong size for my phone.\n\nDoes the job without adding bulk.",
      "USB-C hub adapter — 7 ports total. Perfect for laptops with limited ports.\n\n• 2x USB-A 3.0 ports\n• 1x USB-C PD pass-through charging\n• 1x HDMI 4K output\n• 1x SD card reader\n• 1x MicroSD reader\n• 1x Ethernet port\n\nUsed it for a couple months with my MacBook. Works great, just got a docking station now.",
      "Portable Bluetooth speaker — small, loud, and waterproof (IPX7). Brand is Tribit, which punches way above its price.\n\nBattery lasts about 10 hours. Sound quality is surprisingly good for the size — decent bass too. Used it at the beach and pool all summer.\n\nSelling because I got a JBL for my birthday. Comes with USB-C charging cable.",
      "Wireless mouse and keyboard combo. Logitech MK270 — one tiny USB receiver for both. Full-size keyboard with number pad.\n\n1. Batteries included (already installed)\n2. Mouse is comfortable and responsive\n3. Keyboard has good key travel\n4. Range is about 30 feet\n5. Plug and play — no software needed\n\nUsed for about 3 months at a desk job. Switched to mechanical so these need a new home.",
      "HDMI cable, 6 feet, high speed. Supports 4K @ 60Hz. Standard HDMI to HDMI.\n\nBrand new, never used. Bought a 2-pack and only needed one. Gold-plated connectors.\n\nIt's an HDMI cable — it works. Five bucks.",
      "Ring Video Doorbell (2nd gen, 1080p). Used for about a year. Works perfectly — just switched to a different smart home system.\n\nIncludes the doorbell, mounting bracket, screws, and USB charging cable. You'll need to set up your own Ring account (and subscription if you want cloud recording).\n\nBattery holds a charge for about 2 months between charges. Great way to see who's at your door without getting up.",
      "20,000mAh portable power bank. Charges a phone 4-5 times on a single charge. Has two USB-A outputs and one USB-C input/output.\n\nLED indicator shows remaining battery. Charges fully in about 4 hours with a fast charger. I used it mainly for travel — works great.\n\nSelling because I got a smaller one that fits in my pocket better.",
      "Silicone case for AirPods Pro (2nd gen). Black with a matte finish and a carabiner clip.\n\nBrand new, never used. Ordered the wrong generation and can't return it. Fits the AirPods Pro 2 charging case with the speaker and lanyard hole cutouts.\n\nProtects against drops and scratches without adding bulk.",
      "4-pack of smart plugs — work with Alexa, Google Home, and Apple HomeKit. Wi-Fi connected, no hub needed.\n\nSet schedules, control from your phone, or use voice commands. Each plug has a physical button too. Super easy setup through the app.\n\nUsed these for 6 months (lamps and a coffee maker). Switching to a different smart home platform. All work perfectly.",
      "LED strip lights, 50 feet total (two 25ft rolls). RGB with remote control — pick from millions of colors and multiple effects.\n\nAdhesive backing sticks well. Can be cut at marked intervals. Includes the power adapter, IR remote, and controller.\n\nGreat for a bedroom, gaming setup, or behind a TV. Brand new in box — bought too many for my project.",
      "Roku Streaming Stick 4K. Plugs directly into your TV's HDMI port. Supports Netflix, Hulu, Disney+, and every other app.\n\n• 4K HDR streaming\n• Voice remote with TV controls\n• Fast and responsive interface\n• Wi-Fi connected\n\nUsed for about a year. Upgraded to a Roku Ultra. This still works perfectly. Includes the remote and power cable.",
      "HD webcam, 1080p with built-in microphone. USB plug and play — works with Zoom, Teams, Google Meet, and everything else.\n\nClips onto your monitor or laptop screen. Has a privacy shutter you can slide over the lens. Adjustable angle.\n\nUsed it for WFH meetings for about 6 months. Picture quality is clear and the mic is decent for calls. Upgrading to something fancier.",
      "USB flash drive, 128GB, USB 3.0. SanDisk Ultra — fast read speeds (up to 130 MB/s).\n\nBrand new, still in packaging. Bought a multipack and have extras. Great for file transfers, backups, or keeping in your bag for emergencies.\n\nSmall and lightweight with a retractable design. Ten bucks — less than Amazon.",
      "Car phone mount — suction cup type that sticks to your dashboard or windshield. 360-degree rotation with a telescoping arm.\n\nFits any phone up to 6.7 inches with or without a case. Strong suction — stayed put for 8 months of daily driving.\n\nSelling because I got a MagSafe mount instead. This one works great for any phone.",
      "Dash cam, front-facing only. Records in 1080p with a wide-angle lens. Loop recording with a 32GB MicroSD card included.\n\n1. G-sensor locks footage during impacts\n2. Night vision mode\n3. 2.5-inch screen for playback\n4. Parking mode\n5. Suction cup mount\n\nUsed for 4 months. Decided I wanted a dual-cam setup so I upgraded. This is a solid basic dashcam for the price.",
      "iPad Air 2 (2014 model) in Space Gray, 64GB Wi-Fi. Yes it's older, but it still works great for basic tasks.\n\nPerfect for kids, reading, streaming, or a kitchen recipe tablet. Screen is clean with no cracks. Battery lasts several hours. Runs iPadOS 15.\n\nComes with a charger and a case. Don't expect to run heavy apps, but for everyday use it's totally fine.",
      "Android tablet, 10.1-inch screen, 64GB storage. Budget brand (Samsung Galaxy Tab A8) but does everything most people need.\n\nGreat for streaming, web browsing, e-books, and light gaming. Battery lasts all day. Comes with a case and charger.\n\nUsed by my kid for about 6 months. Reset to factory, clean screen, no damage. Solid tablet for the price.",
      "Portable monitor 15.6 inches, 1080p IPS display. USB-C and mini-HDMI inputs. Comes with a magnetic cover that doubles as a stand.\n\nPerfect as a second screen for your laptop, gaming on the go, or extending your work setup. Weighs about 2 lbs.\n\nUsed it for travel work for 4 months. Looks great, no dead pixels. Selling because I got a bigger desk monitor at home.",
      "Smart watch / fitness tracker. Tracks steps, heart rate, sleep, and has basic notifications from your phone.\n\n• 1.7-inch color touchscreen\n• 7-day battery life\n• Water resistant (IP68)\n• Works with iPhone and Android\n• Multiple watch faces\n\nWore it for about 2 months. Upgraded to an Apple Watch. This is great for someone who wants basic fitness tracking without spending $300+.",
    ],
    shippable: true,
  },
  Apparel: {
    titles: [
      "T-Shirts Bundle - 5 Pack Size L","Jeans - Levi's 511 Slim 32x30","Winter Gloves - Touchscreen","Baseball Cap - Nike Dri-Fit",
      "Hoodie - Champion Reverse Weave","Dress Shirts Lot - Medium (4)","Sunglasses - Polarized UV400","Running Shoes Size 10 - Brooks",
      "Beanie - Carhartt Knit","Belt - Genuine Leather Brown","Socks Pack - 12 Pair Athletic","Tank Tops - 3 Pack Women's S",
      "Sandals - Birkenstock Size 8","Rain Jacket - Columbia","Scarf - Cashmere Blend","Work Boots - Timberland Size 11",
    ],
    images: [
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800",
      "https://images.unsplash.com/photo-1545170241-e1db78837e1c?w=800",
      "https://images.unsplash.com/photo-1588850561407-ed78c334e67a?w=800",
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
      "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800",
      "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?w=800",
      "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800",
      "https://images.unsplash.com/photo-1545594861-3bef43ff2fc8?w=800",
      "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800",
      "https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=800",
    ],
    prices: [20,25,10,15,30,35,12,40,15,18,10,12,45,35,20,60],
    conditions: ["Good","Good","New","Like New","Good"],
    descriptions: [
      "Bundle of 5 men's t-shirts, size Large. Mix of solid colors — black, white, grey, navy, and olive.\n\nAll are from Hanes or Fruit of the Loom. Washed and worn a few times each but no stains, holes, or fading. They just don't fit me anymore.\n\nGreat everyday basics. Smoke-free, pet-free home.",
      "Levi's 511 Slim fit jeans in dark wash, 32x30. Worn maybe 5 times — they just don't fit my body type right.\n\nNo fading, no wear on the knees or seat. Original tags are gone but these are basically new. Retails for $60+.\n\nPerfect if you know 511s are your fit and want to save some cash.",
      "Winter gloves with touchscreen-compatible fingertips. Black, unisex, one size fits most.\n\n• Fleece lined interior\n• Grippy palm texture\n• Works with all touchscreens\n• Elastic wrist for snug fit\n\nBrand new with tags. Ordered two pairs and only need one. These are surprisingly warm for how thin they are.",
      "Nike Dri-Fit baseball cap in black. Adjustable strap in back. The lightweight, breathable fabric that wicks sweat.\n\nWore it a handful of times for running. No sweat stains, no fading. The Nike swoosh is embroidered, not printed.\n\nJust have too many hats. Looks clean and sharp.",
      "Champion Reverse Weave hoodie in heather grey, size Large. The thick, heavyweight one — not the thin stuff.\n\nWorn through one winter. Still in great shape — no pilling, no stretched-out cuffs. The reverse weave construction means it doesn't shrink or warp.\n\nRetails for $60-70. This is the most comfortable hoodie I've owned.",
      "Lot of 4 men's dress shirts, size Medium. Brands include Calvin Klein, Van Heusen, and Kenneth Cole.\n\n1. White — Calvin Klein slim fit\n2. Light blue — Van Heusen regular fit\n3. Lavender — Kenneth Cole slim fit\n4. Grey pinstripe — Van Heusen flex collar\n\nAll freshly dry cleaned. Minor wear on some collars but nothing noticeable when worn. Great work wardrobe starter.",
      "Polarized sunglasses with UV400 protection. Classic wayfarrer style in matte black. Surprisingly good quality for the price.\n\nLenses are clean — no scratches. Comes with a microfiber pouch. These are great for driving or outdoor activities.\n\nBrand new, never worn outside the house. Just don't suit my face shape.",
      "Brooks Ghost 14 running shoes, men's size 10, in grey/blue colorway. Used for about 50 miles of running.\n\nStill plenty of life left in the soles. The cushioning is still bouncy. No tears or holes. Washed and ready to go.\n\nUpgrading to the Ghost 15. If you know Brooks, you know how comfortable these are. Great for daily training.",
      "Carhartt knit beanie in dark brown (the classic A18 Watch Hat). One size fits all.\n\nWorn a few times last winter. No pilling or stretching. The fold-up cuff style that everyone wears.\n\nRetails for $20-25 new. Simple, warm, and goes with everything.",
      "Men's belt, genuine leather, brown. 34-inch waist. Classic silver buckle with a single prong.\n\nBarely worn — I switched to a different color. No creasing, cracking, or scuffing. Genuine leather, not bonded or faux.\n\nLooks great with jeans or khakis. Simple and clean design.",
      "12-pair pack of athletic crew socks. White with grey toe and heel. Fit men's shoe size 6-12.\n\nBrand new in original packaging (Hanes X-Temp). Never opened — bought too many packs.\n\nMoisture-wicking and cushioned sole. Basically the standard gym/running sock everyone needs.",
      "3-pack of women's tank tops, size Small. Colors: black, white, and dusty rose.\n\nRibbed cotton fabric, slim fit. Worn once each and washed. No stretching or pilling. From Target's A New Day line.\n\nGreat layering basics or workout tops. Smoke-free home.",
      "Birkenstock Arizona sandals in taupe suede, size 8 (women's / EU 39). The classic two-strap style.\n\nWorn for about one summer season. Footbed is nicely molded — saves you the break-in period. Suede is clean, no stains. Buckles work fine.\n\nThese retail for $100+ new. Great deal if this is your size.",
      "Columbia rain jacket, women's size Medium, in navy blue. Packable and lightweight — folds into its own pocket.\n\nCompletely waterproof with taped seams. Adjustable hood, two zippered hand pockets. Worn through maybe 10 rainstorms.\n\nNo tears, stains, or delamination. Works exactly as it should. Just bought a new one in a different color.",
      "Cashmere blend scarf in camel/tan. Measures about 70 x 12 inches. Super soft — 80% cashmere, 20% wool.\n\nGently used for one season. No pulls, pilling, or stains. Has been dry cleaned and is ready to wear.\n\nThis scarf elevates any outfit. Warm without being bulky. Unisex style.",
      "Timberland 6-inch premium waterproof boots, men's size 11 in wheat nubuck. The classic Timbs.\n\n1. Waterproof construction\n2. Padded collar for comfort\n3. Rubber lug sole with good tread\n4. Steel shank for support\n5. Worn for about 4 months\n\nSome minor scuffing that's normal for nubuck — easily cleaned with a suede brush. Plenty of life left. Retail is $190+.",
    ],
    shippable: true,
  },
  "Home Goods": {
    titles: [
      "Plates Set - 8 Piece White","Coffee Maker - Mr. Coffee 12 Cup","Throw Blanket - Sherpa Fleece","Cutting Board Set - Bamboo 3pc",
      "Towel Set - 6 Piece Bath","Storage Bins - Set of 6","Picture Frames - 5 Pack","Candles - Yankee Candle Lot (4)",
      "Shower Curtain + Liner","Kitchen Knife Set - 6 Piece","Hangers - 50 Pack Velvet","Laundry Basket - Collapsible",
      "Wall Clock - Modern 12\"","Trash Can - Step Sensor 13 Gal","Dish Drying Rack","Bathroom Organizer Set",
    ],
    images: [
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
      "https://images.unsplash.com/photo-1580301762395-21ce6d5d4bc8?w=800",
      "https://images.unsplash.com/photo-1594226801341-41427b4e5c22?w=800",
      "https://images.unsplash.com/photo-1600369671854-4b0f11be744a?w=800",
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800",
      "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=800",
      "https://images.unsplash.com/photo-1602607688046-29739e7f42c9?w=800",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
      "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800",
      "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800",
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800",
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800",
      "https://images.unsplash.com/photo-1585515320310-259814833e62?w=800",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800",
    ],
    prices: [15,20,18,12,22,15,10,20,8,25,12,10,15,30,18,12],
    conditions: ["Good","Good","New","Like New","Good"],
    descriptions: [
      "Set of 8 white dinner plates — 10.5 inch diameter, basic round style. Perfect for everyday use or as replacements.\n\nNo chips, cracks, or staining. Microwave and dishwasher safe. Plain white that goes with everything.\n\nMoving sale — don't need two sets of dishes.",
      "Mr. Coffee 12-cup programmable coffee maker. Set it the night before and wake up to hot coffee.\n\nHas a brew strength selector, delay brew timer, and auto-off after 2 hours. Comes with the glass carafe and a reusable filter basket.\n\nUsed it for about a year. Works perfectly — just switched to a Keurig for convenience.",
      "Large throw blanket, sherpa fleece, in charcoal grey. About 60x80 inches — big enough for a couch or bed.\n\nSupersoft on one side, fuzzy sherpa on the other. Washed and ready to use. No pilling or thinning.\n\nBought two and only need one. These are the coziest blankets for movie nights.",
      "3-piece bamboo cutting board set — small, medium, and large. Each has a juice groove around the edge.\n\n• Large: 18x12 inches\n• Medium: 14x10 inches\n• Small: 10x7 inches\n\nBrand new, never used. Got these as a housewarming gift but I already have a nice set. Bamboo is naturally antimicrobial and easy on knife edges.",
      "6-piece bath towel set — 2 bath towels, 2 hand towels, 2 washcloths. All matching in light grey.\n\nGood quality cotton, still fluffy and absorbent. Used for about 6 months as guest towels so they didn't get heavy use. No stains or fraying.\n\nRedecorating the bathroom in a different color scheme. Smoke-free, pet-free home.",
      "Set of 6 fabric storage bins — the kind that fit in cube shelving units (IKEA Kallax, etc.). Each is about 13x13x13 inches.\n\nColors are a mix — 2 grey, 2 navy, 2 beige. Collapsible with handles. Good condition, minor wear.\n\nGreat for closets, playrooms, or office organization. Selling because we downsized our shelving.",
      "5-pack of picture frames. Mix of sizes: two 8x10, two 5x7, and one 4x6. All black with glass fronts.\n\n1. Modern thin profile\n2. Wall mount and easel back\n3. Real glass, not plastic\n4. New in box — never opened\n\nOrdered these for a gallery wall project that we decided not to do. Great basic frames.",
      "Lot of 4 Yankee Candle jar candles. Large size (22oz). Scents are: Vanilla Cupcake, Clean Cotton, Autumn Leaves, and Balsam & Cedar.\n\nAll have been burned once or twice — at least 90% wax remaining in each. Wicks are trimmed and ready to go.\n\nBought them all at full price ($30 each!). Great deal for candle lovers.",
      "Shower curtain with matching liner — both brand new. The curtain is a modern geometric pattern in grey and white. Liner is clear with magnets at the bottom.\n\nStandard 72x72 inch size. Comes with 12 chrome hooks. Everything is still in packaging.\n\nReturned to a different bathroom style before installing. Your gain.",
      "6-piece kitchen knife set in a wooden block. Includes chef's knife, bread knife, utility knife, paring knife, kitchen shears, and a sharpening steel.\n\nStainless steel blades — still sharp. The block has a nice dark wood finish. Used for about a year of regular cooking.\n\nUpgrading to a nicer set. These are great starter knives for a new kitchen.",
      "50 velvet hangers in black. Non-slip, space-saving slim profile. Swivel chrome hook.\n\nThese are the ones everyone buys on Amazon — I just have too many after downsizing my closet. All in excellent condition, no bent hooks or flattened velvet.\n\nKeeps clothes from slipping off and saves a ton of closet space.",
      "Collapsible laundry basket — folds flat for storage, pops open when you need it. About 15x11x26 inches. Charcoal grey fabric with handles.\n\nUsed for about 6 months in a dorm. No tears, stains, or broken supports. Folds down to about 2 inches thick.\n\nGreat for small spaces or apartments. Lightweight and easy to carry.",
      "Modern wall clock, 12-inch diameter. Black frame with white face and clean, minimalist numbering. Silent quartz movement — no ticking.\n\nRuns on one AA battery (not included). Hung in my office for about a year. Looks great, keeps perfect time.\n\nRedecorating so it has to go. Mounting hardware included.",
      "Step-on trash can with sensor lid, 13-gallon capacity. Stainless steel with fingerprint-resistant finish.\n\nThe foot pedal works perfectly. Also has a motion sensor lid that opens when you wave your hand over it. Uses standard tall kitchen bags.\n\nUsed for about a year. Some minor scuffs on the body but the mechanism works flawlessly. Retails for $60+.",
      "Dish drying rack — stainless steel, 2-tier with a utensil holder and a drainboard that channels water into the sink.\n\n• Holds plates, bowls, cups, and utensils\n• Rust-resistant stainless steel\n• Removable drain tray\n• Compact footprint\n\nUsed for 8 months. Switching to a built-in drying cabinet. Works great, no rust spots.",
      "Bathroom organizer set — includes a soap dispenser, toothbrush holder, soap dish, and small tray. All matching in white ceramic with a matte finish.\n\nNew in box, never used. Bought for a bathroom renovation that went in a different direction.\n\nClean, modern look that works with any bathroom decor. Makes a great housewarming gift too.",
    ],
    shippable: true,
  },
  Furniture: {
    titles: [
      "Folding Table - 6ft Plastic","Office Chair - Basic Mesh","Bookshelf - 5 Shelf Tall","End Table - Small Round",
      "Futon - Black Frame + Mattress","TV Stand - 55\" Wide","Shoe Rack - 4 Tier","Coat Rack - Freestanding",
      "Kids Desk + Chair Set","Plastic Storage Shelves","Folding Chairs Set of 4","Nightstand - 2 Drawer White",
    ],
    images: [
      "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=800",
      "https://images.unsplash.com/photo-1589364231560-e0b3e75ab37a?w=800",
      "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800",
      "https://images.unsplash.com/photo-1499933374294-4584851497cc?w=800",
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800",
      "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=800",
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
      "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=800",
      "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800",
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
    ],
    prices: [35,45,30,20,80,40,15,25,50,20,40,35],
    conditions: ["Good","Good","Fair","Good","Like New"],
    descriptions: [
      "6-foot folding table — the standard white plastic kind you see everywhere. Folds in half with a carrying handle.\n\nGreat for garage sales, parties, craft projects, or extra table space. Sturdy enough for heavy items. Seats 6-8.\n\nSome surface scratches from use but legs and locking mechanism work perfectly. You haul.",
      "Basic mesh-back office chair with adjustable height, tilt, and armrests. Black.\n\nNothing fancy — it's the standard office chair that does the job. Comfortable enough for a few hours of desk work. Rolls smoothly on hard floors or carpet.\n\nUsed for about a year working from home. Some normal wear on the seat cushion but fully functional.",
      "5-shelf bookshelf, about 72 inches tall, dark espresso finish. Particle board construction (the IKEA style).\n\nAll shelves are in good shape. Assembled and ready to go — I can disassemble for transport if needed. Has wall anchor brackets.\n\nMoving to a place with built-in shelving. This works great for books, plants, storage, or displays.",
      "Small round end table, about 18 inches diameter and 22 inches tall. White top with natural wood legs.\n\nPerfect next to a couch or bed. Fits a lamp, drink, and your phone. Minimal design that works anywhere.\n\nGood condition — one small ring mark on top from a mug (see photo). Could probably be sanded out.",
      "Futon with black metal frame and mattress. Converts from sofa to flat bed position — great for guests or dorm rooms.\n\n1. Full-size when flat (54 x 75 inches)\n2. Faux leather mattress cover\n3. 3-position reclining back\n4. 600 lb weight capacity\n5. Easy to fold up and down\n\nMattress is comfortable for sitting. Decent for occasional sleeping. Used in a spare room — not heavily used. You pick up.",
      "TV stand, fits TVs up to 55 inches. Dark wood grain laminate with two open shelves and a closed cabinet section.\n\nAbout 48 inches wide, 16 inches deep, 20 inches tall. Cable management holes in the back. Sturdy and level.\n\nUsed for about 2 years. Some minor scratches from electronics sliding around but nothing major. Pickup only.",
      "4-tier shoe rack — metal frame with fabric shelves. Holds about 12-16 pairs of shoes depending on size.\n\nAbout 36 inches wide, 12 inches deep, 24 inches tall. Easy to assemble (took 10 minutes). Lightweight but stable.\n\nUsed in an entryway for 6 months. Downsizing shoe collection so I don't need it. Clean and functional.",
      "Freestanding coat rack, dark wood finish with black metal hooks. About 6 feet tall with 8 hooks at the top plus 4 hooks midway down.\n\nStable base — doesn't tip over easily. Holds jackets, bags, hats, scarves. Looks nice in an entryway or bedroom.\n\nGood condition, some minor wear on the finish. Easy to disassemble for transport.",
      "Kids desk and chair set — the small-sized kind for ages 3-8. White desk with a light blue chair. Both are adjustable height.\n\nDesk has a small storage drawer and a cup holder. Chair has a foot rest. The set is sturdy and doesn't wobble.\n\nMy kid outgrew it. Some crayon marks on the desk surface but otherwise in good shape. Fun little workspace for a young one.",
      "5-tier plastic storage shelving unit. The heavy-duty kind from Home Depot. Each shelf holds up to 150 lbs.\n\nAbout 36 x 18 x 72 inches. Ventilated shelves. Snap-together assembly — no tools needed.\n\nUsed in the garage for a year. Clean and functional. Great for garage, basement, laundry room, or utility closet.",
      "Set of 4 folding chairs — black metal frame with padded seats. Standard party/event chair style.\n\nAll four fold flat for easy storage. Seat cushions are in good shape, no rips. Frames are sturdy with no wobble.\n\nGreat for extra seating at holidays, game nights, or parties. Selling because we got a bigger dining table.",
      "Nightstand with 2 drawers, white finish. About 20 inches tall, 16 inches wide, 14 inches deep.\n\nDrawers slide smoothly. Top is big enough for a lamp, phone, and a book. Clean, modern design that works with most bedroom decor.\n\nLike new — used in a guest room that barely got used. No scratches or damage. Pickup only.",
    ],
    shippable: false,
  },
  "Sporting Goods": {
    titles: [
      "Yoga Mat - Extra Thick","Jump Rope - Speed Cable","Resistance Bands Set - 5 Pack","Dumbbell Set - 2x 15lb",
      "Basketball - Wilson Official","Soccer Ball - Adidas Size 5","Hiking Backpack 40L","Water Bottle - Hydro Flask 32oz",
      "Roller Blades Size 9","Skateboard Deck - Blank","Tennis Balls - Can of 3","Camping Lantern - LED Rechargeable",
      "Bike Helmet - Adult","Pull-Up Bar - Doorframe","Ab Roller Wheel","Fishing Tackle Box + Lures",
    ],
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
      "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=800",
      "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800",
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800",
      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800",
      "https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?w=800",
      "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=800",
      "https://images.unsplash.com/photo-1547447134-cd3f5c716030?w=800",
      "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800",
      "https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=800",
      "https://images.unsplash.com/photo-1557803175-2f1a7b4db154?w=800",
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800",
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800",
      "https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?w=800",
    ],
    prices: [15,8,12,25,20,18,35,25,30,20,5,18,22,20,12,25],
    conditions: ["New","New","New","Good","Like New"],
    descriptions: [
      "Extra thick yoga mat — 1/2 inch foam, 72 x 24 inches. Purple with a carrying strap.\n\nThick enough for bad knees or hard floors. Non-slip surface on both sides. Used maybe 5 times — I ended up joining a studio that provides mats.\n\nRolls up tight and stays put with the strap. Clean and ready to use.",
      "Speed cable jump rope with ball bearings. Adjustable length, foam grip handles. Great for HIIT, boxing warmups, or double-unders.\n\nBrand new, still in packaging. Bought a two-pack and only using one. Lightweight, tangle-free cable.\n\nEight bucks — cheapest cardio equipment you'll ever buy.",
      "Set of 5 resistance bands in different strengths — extra light to extra heavy. Color coded with labeled resistance levels.\n\nCome with a mesh carry bag and a door anchor attachment. Natural latex, good snap. Brand new, unopened.\n\nGreat for home workouts, physical therapy, or warming up at the gym.",
      "Pair of 15-pound dumbbells — hex rubber coated. The kind that don't roll around on the floor.\n\nUsed for about 6 months of home workouts. Rubber coating is intact, no rust on the handles. These are the CAP brand ones.\n\nGood weight for general fitness, toning, or circuit training. Cash only, pickup.",
      "Wilson official-size basketball, indoor/outdoor. The Evolution model — good grip and consistent bounce.\n\nUsed for maybe 20 games of pickup. Still holds air well. Some normal outdoor court wear on the surface but the grip channels are fine.\n\nGreat ball for rec leagues or driveway hoops.",
      "Adidas Starlancer soccer ball, size 5 (adult/standard). White with black panels — the classic look.\n\nUsed for a season of casual play. Ball holds air, no punctures. Some grass stains that would probably wash off.\n\nMachine stitched, durable. Good for practice, pickup games, or just kicking around the park.",
      "40-liter hiking backpack with an internal frame. Lots of pockets, hydration bladder compatible, and a rain cover built into the bottom.\n\n1. Padded hip belt distributes weight well\n2. Adjustable torso length\n3. Side pockets fit water bottles\n4. Top lid and bottom sleeping bag compartment\n5. Compression straps on sides\n\nUsed on 3 day hikes. In great condition. Selling because I got a larger pack for multi-day trips.",
      "Hydro Flask 32oz wide mouth water bottle in Pacific (teal). Keeps drinks cold 24 hours, hot 12 hours.\n\nSome minor dents and paint chips from daily use (see photos) but no leaks and the lid seals perfectly. Includes the flex cap and a straw lid.\n\nThese things are tanks. Still works exactly as it should.",
      "Inline roller blades, men's size 9. Rollerblade brand Zetrablade model. Black and green.\n\nUsed about 10 times on paved trails. Wheels are in great shape, bearings spin smoothly, buckles and straps all work. Brake pad has normal wear.\n\nFun way to exercise. Selling because my feet grew (yes, apparently that happens as an adult).",
      "Blank skateboard deck, 8.25 inch width, maple construction. No graphics — just raw wood.\n\nBrand new, never gripped or drilled. Perfect for a custom build or if you need to replace a worn-out deck. Standard popsicle shape with a medium concave.\n\nTwenty bucks saves you from paying $50 for a branded deck that's the same wood.",
      "Can of 3 Penn tennis balls — Championship Extra Duty felt. Brand new, still sealed in the pressurized can.\n\nThese are the standard tennis balls used in most recreational play. Regular felt for hard courts. Good bounce.\n\nFive bucks. Pick up on my porch anytime.",
      "Rechargeable LED camping lantern with multiple brightness modes. USB-C rechargeable, lasts about 8 hours on high.\n\nAlso works as a power bank to charge your phone in a pinch. Has a hook on top for hanging in a tent. Compact and lightweight.\n\nUsed on two camping trips. Works great. Switched to a headlamp setup so this is extra now.",
      "Adult bike helmet, size medium (fits 54-58 cm head). White with adjustable dial fit system and removable visor.\n\nMeets CPSC safety standards. Good ventilation with 14 air vents. Only worn about a dozen times — no crashes or drops.\n\nIn great condition. Includes the original padding liners. Selling because I got a different style.",
      "Doorframe pull-up bar — no screws needed, uses leverage to stay in place. Fits standard door frames (24-36 inches wide).\n\nMultiple grip positions: wide, narrow, neutral, and chin-up. Also works for hanging leg raises. Supports up to 300 lbs.\n\nUsed it for a few months. Works great, no damage to my door frame. Foam grips are comfortable with no tearing.",
      "Ab roller wheel with knee pad. Dual wheels for stability. Foam grip handles.\n\nSimple but brutally effective core exercise tool. Used it for about 2 months before switching to a different ab routine.\n\nIn perfect condition. The wheels roll smoothly and the pad cushions your knees. Great for home gym basics.",
      "Fishing tackle box (Plano 3600 series) loaded with lures, hooks, weights, and terminal tackle.\n\n• 15+ soft plastic baits (worms, craws)\n• 10+ hard baits (crankbaits, spinnerbaits)\n• Assorted hooks sizes 1-4/0\n• Split shot and bullet weights\n• Swivels, snaps, and leaders\n\nEverything a beginner needs to start fishing. I consolidated into a bigger box. Great value for someone getting into the sport.",
    ],
    shippable: true,
  },
  "Toys & Games": {
    titles: [
      "LEGO Set - 500 Piece Mixed Lot","Stuffed Animals Bundle - 10 pc","Play-Doh Set - 24 Colors","Nerf Gun - Rival Blaster",
      "Puzzle - 1000 Piece Landscape","UNO Card Game - Brand New","Kids Scooter - 3 Wheel","Action Figures Lot - 15 Pieces",
      "Barbie Dolls + Clothes Bundle","Hot Wheels Cars - 20 Pack","Baby Toys Bundle - 0-12 Month","Remote Control Car - Off Road",
    ],
    images: [
      "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800",
      "https://images.unsplash.com/photo-1559715541-5daf8a0296d0?w=800",
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800",
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800",
      "https://images.unsplash.com/photo-1606503153255-59d8b2e4b1b4?w=800",
      "https://images.unsplash.com/photo-1611891487122-207579d67d98?w=800",
      "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=800",
      "https://images.unsplash.com/photo-1558507334-57300f59f0bd?w=800",
      "https://images.unsplash.com/photo-1613682988402-a12e1ebe1972?w=800",
      "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=800",
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800",
      "https://images.unsplash.com/photo-1581235707960-35f13de9d465?w=800",
    ],
    prices: [20,10,8,15,12,5,25,15,18,12,10,20],
    conditions: ["Good","Good","New","Like New","Good"],
    descriptions: [
      "Big bag of about 500 assorted LEGO bricks. Mix of standard bricks, plates, slopes, and specialty pieces. Multiple colors.\n\nAll genuine LEGO — no knockoff brands mixed in. Cleaned and sorted by my kid before losing interest. Some minifigure parts in there too.\n\nGreat for free building or supplementing an existing collection. Hours of creative play.",
      "Bundle of 10 stuffed animals — various sizes from 6 inches to about 18 inches. Mix of bears, dogs, cats, and other animals.\n\nAll machine washable (just ran them through). No rips, missing eyes, or stains. From a smoke-free, pet-free home.\n\nKids moved on to other toys. These still have plenty of cuddle life left in them.",
      "Play-Doh 24-pack — every color in the rainbow plus extras. The standard 3-ounce cans.\n\nBrand new, sealed packaging. All lids are still on tight. Bought it for a party that didn't happen.\n\nKids love this stuff. Eight bucks for 24 cans is basically nothing. First come, first served.",
      "Nerf Rival blaster — the Kronos XVIII-500. Fires the yellow high-impact rounds. Spring-action, no batteries needed.\n\n• Fires at up to 90 fps\n• Internal 5-round magazine\n• Comes with 10 Rival rounds\n• Trigger lock safety\n\nUsed a few times for indoor Nerf wars. Works perfectly. My kid wanted a different model. Great for ages 14+.",
      "1000-piece jigsaw puzzle — mountain landscape with a lake reflection. Gorgeous image by Ravensburger (premium quality pieces).\n\nCompleted once, verified all 1000 pieces are there, then carefully taken apart and put back in the box.\n\nPerfect for a rainy weekend or puzzle night. Pieces are thick and fit together satisfyingly.",
      "UNO card game — brand new, still in shrink wrap. The classic edition with the standard rules card.\n\nBought a few as stocking stuffers and had one left over. There's not much to say — it's UNO. Everybody knows how to play.\n\nFive bucks. Grab it for your next game night or road trip.",
      "Kids 3-wheel kick scooter with light-up wheels. Adjustable handlebar height for ages 3-8.\n\n1. Lean-to-steer design (easy for little ones)\n2. Wide rear brake pedal\n3. Supports up to 110 lbs\n4. Folds for easy storage and transport\n5. Pink and purple color scheme\n\nMy daughter used it for about a year and outgrew it. Wheels still light up. Some scuffs on the deck but fully functional. Great first scooter.",
      "Lot of 15 action figures — mix of Marvel, DC, and random characters. Sizes range from 3 to 6 inches.\n\nIncludes Spider-Man, Batman, a couple Transformers, some Star Wars figures, and others. All have working joints and limbs attached.\n\nMy son moved on to video games. These were well played with but still in good shape. Fun lot for any action figure fan.",
      "Barbie dolls and clothes bundle — 5 dolls with over 30 outfits and accessories. Includes shoes, purses, hangers, and a couple of furniture pieces.\n\nDolls are in good condition — hair has been brushed, all limbs work. Clothes range from dresses to casual outfits to career uniforms.\n\nHours of imaginative play here. My daughter is asking for LOL dolls now, so Barbie's gotta go.",
      "Pack of 20 Hot Wheels cars — mix of models and colors. No duplicates in the pack.\n\nIncludes muscle cars, trucks, sports cars, and some fantasy vehicles. All roll well with no broken axles. Paint is good on most — a few have normal play wear.\n\nGreat stocking stuffer or addition to a Hot Wheels collection. Sold as one lot.",
      "Baby toys bundle for ages 0-12 months. About 15 items total including rattles, teethers, soft blocks, crinkle toys, and a play mat.\n\nAll cleaned and sanitized. No broken pieces or choking hazards. Brands include Fisher-Price, Infantino, and Manhattan Toy.\n\nBaby is now a toddler and has zero interest in these. All in good, functional condition from a clean home.",
      "Remote control off-road car — 1:18 scale, 4WD, rubber tires. 2.4GHz remote with about 100-foot range.\n\nTop speed is around 15 mph. Rechargeable battery lasts about 20 minutes of full-speed driving. Includes USB charger and the controller (takes 2 AA batteries).\n\nKids had fun with it for a few months. Still runs strong. A couple cosmetic scratches on the body but everything works.",
    ],
    shippable: true,
  },
  "Garden & Outdoor": {
    titles: [
      "Garden Hose - 50ft Expandable","Plant Pots - Set of 5 Ceramic","Bird Feeder - Hanging Wood","Lawn Sprinkler - Oscillating",
      "Outdoor Solar Lights - 8 Pack","Garden Kneeling Pad","Rake + Shovel + Hoe Set","Compost Bin - Tumbler Style",
    ],
    images: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800",
      "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800",
      "https://images.unsplash.com/photo-1521747116042-5a810fda9664?w=800",
      "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800",
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800",
      "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=800",
      "https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?w=800",
      "https://images.unsplash.com/photo-1581578017093-cd30fce4eeb7?w=800",
    ],
    prices: [18,20,12,10,22,8,25,35],
    conditions: ["New","Good","New","Good","Like New"],
    descriptions: [
      "50-foot expandable garden hose — the kind that stretches when you turn on the water and shrinks back for storage. Comes with a spray nozzle with 8 patterns.\n\nUsed for one summer season. No leaks, kinks, or weak spots. The brass fittings connect securely to any standard spigot.\n\nSelling because we got a reel-mounted hose instead. Lightweight and easy to store.",
      "Set of 5 ceramic plant pots in different sizes — 4, 5, 6, 7, and 8 inch diameter. Matte white finish with drainage holes and matching saucers.\n\nUsed for about 6 months on a windowsill. No chips or cracks. Clean — just need a quick rinse.\n\nPerfect for succulents, herbs, or small houseplants. Look great grouped together on a shelf.",
      "Handmade wooden bird feeder — cedar construction with a metal roof. Holds about 2 lbs of seed. Hanging chain included.\n\nBrand new, made by a local woodworker. Never hung outside. About 10 x 8 x 8 inches.\n\nAttracts cardinals, chickadees, finches, and more. The cedar will weather beautifully over time. Great gift for a nature lover.",
      "Oscillating lawn sprinkler — the long metal kind that sweeps back and forth. Covers about 3,000 square feet.\n\nConnects to a standard garden hose. The range and width dials work to adjust coverage. Used for two summers — a little surface rust but fully functional.\n\nUpgraded to an in-ground sprinkler system. This one does the job for any normal yard.",
      "8-pack of solar-powered LED path lights. Stainless steel top, plastic stake. Charges during the day, lights up automatically at dusk.\n\n• Warm white LED\n• About 12 inches tall each\n• No wiring needed — just stick them in the ground\n• Auto on/off with light sensor\n\nUsed for one season along our walkway. All 8 still work. Some minor dirt on the solar panels that wipes right off. Easy curb appeal upgrade.",
      "Garden kneeling pad — thick foam cushion about 18 x 8 x 1.5 inches. Waterproof outer cover in green.\n\nSaves your knees when weeding, planting, or doing ground-level garden work. Also handy for working on cars or household projects.\n\nUsed a handful of times. No compression or damage. Eight bucks for happy knees.",
      "3-piece garden tool set — rake, shovel, and hoe. Full-size with wooden handles and steel heads.\n\nAll in working condition. Handles are solid with no cracks. Steel heads have some normal patina but no bending or damage.\n\nThese are basic but good quality tools. Perfect for a new homeowner getting their first garden started. The set covers most of what you need.",
      "Compost tumbler bin — dual chamber, about 43-gallon total capacity. Sits on a steel frame about 3 feet off the ground.\n\nCrank handle to rotate. Two doors for loading. Internal mixing fins help break things down. Assembled and ready to use.\n\nUsed for 2 seasons. Makes great compost. Selling because we moved to a community garden that has shared composting. You haul — it's bulky but not heavy.",
    ],
    shippable: false,
  },
  "Pet Supplies": {
    titles: [
      "Dog Leash + Collar Set","Cat Food Bowls - Ceramic 2pk","Pet Bed - Medium Round","Dog Toys Bundle - 10 Pack",
      "Fish Tank 10 Gallon + Filter","Cat Scratching Post","Dog Crate - Small 24\"","Pet Grooming Kit",
    ],
    images: [
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800",
      "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=800",
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800",
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800",
      "https://images.unsplash.com/photo-1520301255226-bf5f144451c1?w=800",
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800",
      "https://images.unsplash.com/photo-1541599468348-e96984315921?w=800",
      "https://images.unsplash.com/photo-1581888227599-779811939961?w=800",
    ],
    prices: [12,8,20,15,30,18,25,15],
    conditions: ["New","Good","Like New","New","Good"],
    descriptions: [
      "Dog leash and collar set — both in red nylon with chrome hardware. Collar is adjustable (14-20 inch neck), leash is 6 feet long.\n\nBrand new with tags. Bought the wrong size for our dog and can't return it. Standard clip closure on both.\n\nGood quality nylon — thick webbing that won't fray easily. Perfect for a medium-sized dog.",
      "Pair of ceramic cat food bowls — white with a slight elevation to reduce neck strain. Each bowl holds about 1 cup of food or water.\n\nUsed for about 3 months. No chips or cracks. Dishwasher safe. The elevated design is better for cat digestion.\n\nSwitched to an automatic feeder so these are extra. Clean and ready for a new kitty.",
      "Round pet bed, medium size (about 24 inch diameter). Plush grey fabric with a bolster edge for head support.\n\nMachine washable — just ran it through. Fluffy and supportive. Fits dogs up to about 30 lbs or any size cat.\n\nOur dog decided he prefers the couch. This bed has barely been used. Like new condition from a clean home.",
      "Bundle of 10 dog toys — mix of rope toys, squeaky toys, a tennis ball, a frisbee, and some chew toys.\n\n• 3 rope tug toys (various sizes)\n• 2 squeaky plush toys\n• 2 rubber chew toys\n• 1 tennis ball\n• 1 flying disc\n• 1 treat puzzle ball\n\nAll brand new, never used. Bought a variety pack and our dog only likes one type. Great starter set for a new puppy.",
      "10-gallon glass fish tank with a hang-on-back filter (Aqua Clear 20). Clean, no scratches on the glass.\n\nAlso includes a heater, thermometer, LED hood light, and some gravel. Everything you need to set up a tropical freshwater tank.\n\nRan this tank for about 8 months. Upgrading to a 29-gallon so this needs to go. Great beginner setup. Pickup only — glass is fragile.",
      "Cat scratching post — about 30 inches tall with a sisal-wrapped post and a carpeted base and top platform.\n\nUsed by our cat for about a year. The sisal is worn in spots (which means cats love it) but still has plenty of scratching surface left. Base is stable.\n\nWe got a bigger cat tree so this one is available. Still does the job of saving your furniture.",
      "Small dog crate, 24 x 18 x 20 inches. Black metal wire with a plastic tray on the bottom. Single door with a secure latch.\n\nFolds flat for storage or transport. Includes a divider panel that's useful for crate training puppies.\n\nUsed for our puppy during house training. Now he free roams. Some chew marks on the tray edge but the crate itself is solid. Clean and ready to go.",
      "Pet grooming kit with everything you need for at-home grooming sessions.\n\n1. Slicker brush\n2. Deshedding comb\n3. Nail clippers with guard\n4. Nail file\n5. Flea comb\n6. Grooming scissors (rounded tip)\n7. Zippered storage case\n\nUsed a few times on our dog. All tools are clean and in good shape. Saves you $50+ per grooming visit. Works on dogs and cats.",
    ],
    shippable: true,
  },
  Family: {
    titles: [
      "Baby Bottles Set - 6 Pack","Sippy Cups - 4 Pack","Baby Gate - Pressure Mount","Kids Backpack - School Size",
      "Maternity Clothes Bundle - M","Diaper Bag - Simple Style","Baby Blankets - 3 Pack Muslin","Kids Rain Boots Size 10",
    ],
    images: [
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800",
      "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=800",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800",
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800",
      "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=800",
      "https://images.unsplash.com/photo-1590502593747-42a996133562?w=800",
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800",
      "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=800",
    ],
    prices: [10,8,20,15,30,18,12,10],
    conditions: ["Good","Good","Like New","Good","New"],
    descriptions: [
      "Set of 6 baby bottles — Dr. Brown's anti-colic wide-neck, 8oz size. Includes bottles, nipples (level 2), and travel caps.\n\nUsed for about 4 months. All bottles are scratch-free and clear — no clouding. Cleaned and sterilized. The anti-colic vent system works great.\n\nBaby switched to sippy cups. Smoke-free, pet-free home.",
      "4-pack of sippy cups with handles — the Munchkin Miracle 360 style. Colors are blue, green, pink, and orange.\n\nThese are the spill-proof ones where kids drink from any edge. All seals work perfectly. Some minor teeth marks on the rims (typical toddler use).\n\nOur toddler graduated to regular cups. These are awesome — saved our carpets many times.",
      "Baby gate, pressure-mounted — fits openings 29 to 38.5 inches wide. White metal with a walk-through door and one-hand release.\n\nNo drilling required — pressure cups hold it firmly in the door frame. Used at the top of our hallway for about a year.\n\nIn great condition — no dents or broken parts. The latch mechanism works smoothly. Essential baby-proofing item.",
      "Kids backpack, standard school size. Dinosaur print in blue and green. Two main compartments, a front pocket, and mesh side pockets for water bottles.\n\nPadded adjustable straps. About 16 x 12 x 5 inches — right size for elementary school.\n\nUsed for one school year. Washed and clean. Zippers all work. No tears or stains. My kid wanted a different character this year.",
      "Bundle of maternity clothes, size Medium. About 15 pieces total.\n\n1. 4 maternity tops (mix of casual and dressy)\n2. 3 pairs maternity jeans/pants\n3. 2 nursing-friendly tops\n4. 2 maternity tank tops\n5. 2 pairs leggings\n6. 1 maternity dress\n7. 1 belly band\n\nBrands include Motherhood, H&M Mama, and Target's Isabel line. All in good condition — no stains or holes. Smoke-free home.",
      "Diaper bag — simple messenger-style in grey. Multiple pockets inside and out. Comes with a changing pad.\n\nNot a fancy designer bag — just a functional, well-organized one. Wipeable interior lining. Adjustable shoulder strap plus stroller clips.\n\nUsed through one baby. Clean, no stains or tears. Does exactly what you need without the $100+ price tag.",
      "3-pack of muslin baby blankets — large 47 x 47 inch size. Prints are elephant, star, and stripe patterns in neutral grey/white.\n\n100% cotton muslin — gets softer with every wash. These are the kind you use for swaddling, nursing cover, stroller shade, burp cloth — basically everything.\n\nBrand new in original packaging. Received as duplicates at the baby shower.",
      "Kids rain boots, size 10 (toddler). Bright yellow with a fun frog design. Pull-on style with pull tabs.\n\nRubber construction — fully waterproof. Removable insoles. Worn through one rainy season. Some minor scuffing on the toes but no cracks or leaks.\n\nKids grow so fast. These have plenty of life left for the next little one who loves puddle jumping.",
    ],
    shippable: true,
  },
};

const firstNames = ["James","Maria","David","Sarah","Chris","Emma","Alex","Nina","Jordan","Tyler","Lisa","Ryan","Mike","Ashley","Jake","Sophia","Carlos","Priya","Wei","Omar"];
const lastNames = ["Smith","Johnson","Park","Chen","Martinez","Thompson","Williams","Patel","Rivera","Brown","Kim","O'Brien","Wilson","Santos","Lee","Garcia","Nguyen","Singh","Miller","Davis"];
const timeOptions = ["2 min ago","15 min ago","1 hour ago","3 hours ago","6 hours ago","12 hours ago","1 day ago","2 days ago","3 days ago"];

// ═══════════════════════════════════════
// GENERATOR
// ═══════════════════════════════════════
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

export function generateDemoListings(): Listing[] {
  const result: Listing[] = [];
  let id = 1000;

  // Merge both template sets
  const allTemplates: Record<string, ProductTemplate[]> = {};
  for (const [cat, t] of Object.entries(templates)) {
    allTemplates[cat] = [t];
  }
  for (const [cat, t] of Object.entries(cheapTemplates)) {
    if (allTemplates[cat]) allTemplates[cat].push(t);
    else allTemplates[cat] = [t];
  }

  for (const city of cities) {
    const rand = seededRandom(city.length * 31 + city.charCodeAt(0));
    const categoryKeys = Object.keys(allTemplates);

    // Pick ~10-16 categories per city (more coverage)
    const numCategories = Math.floor(rand() * 7) + 10;
    const shuffled = [...categoryKeys].sort(() => rand() - 0.5);
    const selectedCategories = shuffled.slice(0, Math.min(numCategories, categoryKeys.length));

    for (const cat of selectedCategories) {
      const templateSets = allTemplates[cat];

      for (const t of templateSets) {
        // 2-4 products per template set per city
        const numProducts = Math.floor(rand() * 3) + 2;

        for (let p = 0; p < numProducts && p < t.titles.length; p++) {
          const titleIdx = Math.floor(rand() * t.titles.length);
          const priceIdx = titleIdx % t.prices.length;
          const imgIdx = titleIdx % t.images.length;
          const condIdx = titleIdx % t.conditions.length;
          const descIdx = titleIdx % t.descriptions.length;
          const avatarIdx = (id + titleIdx) % avatars.length;
          const fnIdx = (id * 3) % firstNames.length;
          const lnIdx = (id * 7) % lastNames.length;
          const timeIdx = (id * 2) % timeOptions.length;

          const price = t.prices[priceIdx];
          const deposit = price > 0 ? Math.max(5, Math.round(price * 0.1)) : 0;

        result.push({
          id: `demo-${id}`,
          title: t.titles[titleIdx],
          price,
          images: [t.images[imgIdx]],
          category: cat,
          condition: t.conditions[condIdx],
          description: t.descriptions[descIdx],
          location: city,
          distance: `${Math.floor(rand() * 20) + 1} mi`,
          postedAt: timeOptions[timeIdx],
          seller: {
            id: `seller-${id}`,
            name: `${firstNames[fnIdx]} ${lastNames[lnIdx]}`,
            avatar: avatars[avatarIdx],
            rating: Number((4 + rand()).toFixed(1)),
            reviews: Math.floor(rand() * 50) + 1,
            joined: "2024",
            responseTime: "Usually responds quickly",
          },
          saved: false,
          depositAmount: deposit,
          status: "available",
          shippingAvailable: t.shippable,
          shippingPrice: t.shippable ? 15 : 0,
          deliveryOptions: t.shippable ? ["pickup", "shipping"] : ["pickup"],
        });

          id++;
        }
      }
    }
  }

  return result;
}
