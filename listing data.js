/* ===========================================================
   listing-data.js — populates listing.html dynamically
   based on ?cat= and ?id= in the URL. Demo data only.
   =========================================================== */

const LISTINGS = {
  rooms: {
    unit: 'night', unitsLabel: 'month', icon: '🛏️',
    items: {
      r1: { title:'Single Room - Sharma Niwas', loc:'Behind College Road', rating:'4.1 (40 reviews)', price:3200, amenities:['WiFi','Attached Bathroom','Study Table','24x7 Water'], desc:'A quiet single room ideal for students, 5 min walk from college.' },
      r2: { title:'Shared Room - Verma House', loc:'Sector 12, Near Metro', rating:'4.4 (62 reviews)', price:4000, amenities:['WiFi','Shared Kitchen','Laundry','Parking'], desc:'Comfortable shared room close to the metro station, great for commuting students.' },
      r3: { title:'Private Room - Lakeview Residency', loc:'Opp. University Gate', rating:'4.6 (95 reviews)', price:5500, amenities:['WiFi','AC','Balcony','Housekeeping'], desc:'Premium private room with a lake view, right opposite the university gate.' },
      r4: { title:'Budget Room - Patel Stay', loc:'Station Road', rating:'3.9 (21 reviews)', price:2800, amenities:['WiFi','Fan','Common Bathroom'], desc:'Affordable room near the railway station, perfect for tight budgets.' },
      r5: { title:'Deluxe Room - Sunshine Stay', loc:'Main Market, City Center', rating:'4.8 (130 reviews)', price:6200, amenities:['WiFi','AC','Geyser','Daily Cleaning'], desc:'Top-rated deluxe room right in the city center market area.' },
      r6: { title:'Single Room - Campus View', loc:'Campus Road', rating:'4.2 (33 reviews)', price:3600, amenities:['WiFi','Study Table','Parking'], desc:'Cozy single room facing the campus, ideal for first-year students.' }
    }
  },
  hostels: {
    unit: 'night', unitsLabel: 'month', icon: '🏢',
    items: {
      h1: { title:'Sunrise Boys Hostel', loc:'Near City College', rating:'4.5 (120 reviews)', price:4500, amenities:['3 Meals/day','WiFi','Laundry','Warden 24x7'], desc:'A trusted boys hostel right next to City College with home-style food.' },
      h2: { title:'Greenview Girls PG', loc:'Sector 12, Near Metro', rating:'4.7 (98 reviews)', price:5200, amenities:['CCTV Security','WiFi','Meals','Common Room'], desc:'Safe and friendly girls PG with strong security and great community.' },
      h3: { title:'Campus Corner Hostel', loc:'Opp. University Gate', rating:'4.3 (76 reviews)', price:3900, amenities:['WiFi','Study Hall','Meals'], desc:'Budget-friendly hostel right opposite the university main gate.' },
      h4: { title:'Unity Co-living Hostel', loc:'Station Road', rating:'4.4 (54 reviews)', price:4800, amenities:['WiFi','Gym Access','Meals','Laundry'], desc:'Modern co-living hostel with gym access, near the railway station.' },
      h5: { title:'Scholars Den Hostel', loc:'College Road', rating:'4.0 (44 reviews)', price:3500, amenities:['WiFi','Study Table','Meals'], desc:'Simple and affordable hostel focused on a study-friendly environment.' },
      h6: { title:'Premier Girls Residency', loc:'City Center', rating:'4.6 (87 reviews)', price:5600, amenities:['AC Rooms','WiFi','Meals','Security'], desc:'Premium girls residency in the heart of the city with top amenities.' }
    }
  },
  hotels: {
    unit: 'night', unitsLabel: 'night', icon: '🏨',
    items: {
      ho1: { title:'Hotel Blue Orchid', loc:'Main Market Road', rating:'4.6 (210 reviews)', price:1800, amenities:['Free WiFi','AC','Room Service','Parking'], desc:'A popular mid-range hotel right in the main market with great service.' },
      ho2: { title:'The Wanderlust Inn', loc:'Near Railway Station', rating:'4.2 (88 reviews)', price:1200, amenities:['Free WiFi','AC','24x7 Reception'], desc:'Convenient stay right next to the railway station for quick check-ins.' },
      ho3: { title:'Hotel Grand Stay', loc:'City Center', rating:'4.8 (300 reviews)', price:2500, amenities:['Free WiFi','AC','Restaurant','Gym'], desc:'Top-rated hotel in the city center with full-service amenities.' },
      ho4: { title:'Budget Stay Lodge', loc:'Bus Stand Road', rating:'3.8 (54 reviews)', price:900, amenities:['Fan/AC','Parking'], desc:'No-frills budget lodge near the bus stand, ideal for short stays.' },
      ho5: { title:'Hotel Lake View', loc:'Lake Road', rating:'4.5 (140 reviews)', price:3200, amenities:['Free WiFi','AC','Lake View Rooms','Restaurant'], desc:'Scenic hotel overlooking the lake, popular with travellers.' },
      ho6: { title:'Hotel Comfort Nest', loc:'Airport Road', rating:'4.3 (76 reviews)', price:1500, amenities:['Free WiFi','AC','Airport Shuttle'], desc:'Comfortable stay close to the airport with shuttle service.' }
    }
  },
  bikes: {
    unit: 'day', unitsLabel: 'day', icon: '🏍️',
    items: {
      b1: { title:'Honda Activa - QuickRide', loc:'Near City College', rating:'4.5 (88 reviews)', price:250, amenities:['Helmet Included','Full Tank Option','Roadside Assist'], desc:'Reliable scooter, perfect for daily campus commute.' },
      b2: { title:'Bajaj Pulsar - CampusWheels', loc:'Station Road', rating:'4.6 (64 reviews)', price:350, amenities:['Helmet Included','Insurance Covered'], desc:'Sporty bike with good mileage, great for city rides.' },
      b3: { title:'TVS Jupiter - QuickRide', loc:'Sector 12', rating:'4.3 (47 reviews)', price:200, amenities:['Helmet Included','Easy Pickup'], desc:'Smooth and economical scooter for short trips.' },
      b4: { title:'Royal Enfield Classic - CityDrive', loc:'City Center', rating:'4.7 (102 reviews)', price:450, amenities:['Helmet Included','Insurance Covered','Roadside Assist'], desc:'Classic cruiser bike, ideal for weekend rides.' },
      b5: { title:'Hero Splendor - QuickRide', loc:'Opp. University Gate', rating:'4.1 (39 reviews)', price:180, amenities:['Helmet Included'], desc:'Budget-friendly commuter bike for students.' },
      b6: { title:'Yamaha FZ - CampusWheels', loc:'Market Road', rating:'4.4 (55 reviews)', price:300, amenities:['Helmet Included','Insurance Covered'], desc:'Stylish and powerful bike for city commuting.' }
    }
  },
  cycles: {
    unit: 'day', unitsLabel: 'hour', icon: '🚲',
    items: {
      c1: { title:'Hero Sprint - EcoCycle', loc:'Near City College', rating:'4.4 (52 reviews)', price:40, amenities:['Lock Included','Basket'], desc:'Light and easy cycle for short campus rides.' },
      c2: { title:'Mountain Bike - EcoCycle', loc:'Park Road', rating:'4.6 (41 reviews)', price:60, amenities:['Gear Cycle','Lock Included'], desc:'Sturdy mountain bike for longer or off-road rides.' },
      c3: { title:'City Cycle - CampusWheels', loc:'Opp. University Gate', rating:'4.2 (29 reviews)', price:30, amenities:['Lock Included'], desc:'Simple city cycle, the cheapest way to get around campus.' },
      c4: { title:'Electric Cycle - EcoCycle', loc:'Lake Road', rating:'4.7 (66 reviews)', price:80, amenities:['Electric Assist','Lock Included'], desc:'E-cycle with pedal assist, great for longer distances.' },
      c5: { title:'Standard Cycle - CampusWheels', loc:'Sector 12', rating:'4.0 (18 reviews)', price:35, amenities:['Basket','Lock Included'], desc:'Standard single-speed cycle, simple and reliable.' },
      c6: { title:'Geared Cycle - EcoCycle', loc:'Station Road', rating:'4.3 (34 reviews)', price:50, amenities:['Gear Cycle','Lock Included'], desc:'Multi-gear cycle, good for both flat and slope roads.' }
    }
  },
  cars: {
    unit: 'day', unitsLabel: 'day', icon: '🚗',
    items: {
      ca1: { title:'Maruti Swift - CityDrive', loc:'City Center', rating:'4.6 (96 reviews)', price:1200, amenities:['AC','Insurance Covered','GPS'], desc:'Compact hatchback, easy to drive and park in the city.' },
      ca2: { title:'Hyundai Creta - CityDrive', loc:'Airport Road', rating:'4.7 (73 reviews)', price:1800, amenities:['AC','Insurance Covered','GPS','Sunroof'], desc:'Comfortable SUV, great for family trips or airport pickup.' },
      ca3: { title:'Tata Tiago - QuickRide Cars', loc:'Station Road', rating:'4.2 (38 reviews)', price:900, amenities:['AC','Insurance Covered'], desc:'Budget hatchback, good mileage for daily use.' },
      ca4: { title:'Mahindra Thar - CityDrive', loc:'City Center', rating:'4.8 (110 reviews)', price:3000, amenities:['AC','4x4','Insurance Covered'], desc:'Rugged SUV perfect for off-road trips and adventures.' },
      ca5: { title:'Maruti WagonR - QuickRide Cars', loc:'College Road', rating:'4.1 (27 reviews)', price:1000, amenities:['AC','Insurance Covered'], desc:'Spacious hatchback, comfortable for city and highway drives.' },
      ca6: { title:'Honda City - CityDrive', loc:'Sector 12', rating:'4.5 (64 reviews)', price:1500, amenities:['AC','Insurance Covered','GPS'], desc:'Premium sedan, smooth ride for longer journeys.' }
    }
  }
};

const SAMPLE_REVIEWS = [
  { name:'Aarav S.', stars:'⭐⭐⭐⭐⭐', text:'Exactly as described, smooth booking and quick pickup. Would book again!' },
  { name:'Priya M.', stars:'⭐⭐⭐⭐', text:'Good experience overall, location was a bit hard to find but staff helped.' },
  { name:'Rohit K.', stars:'⭐⭐⭐⭐⭐', text:'Verified listing felt trustworthy, exactly matched the photos and price.' }
];

(function(){
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('cat') || 'rooms';
  const id = params.get('id');
  const catData = LISTINGS[cat];
  const item = catData && id ? catData.items[id] : null;

  // fallback to first item of category if id missing/invalid
  const finalItem = item || (catData ? Object.values(catData.items)[0] : null);
  if(!finalItem || !catData) return;

  document.title = finalItem.title + ' — RentMate';
  document.getElementById('listingTitle').textContent = finalItem.title;
  document.getElementById('listingThumb').textContent = catData.icon;
  document.getElementById('listingLocation').textContent = '📍 ' + finalItem.loc;
  document.getElementById('listingRating').textContent = '⭐ ' + finalItem.rating;
  document.getElementById('listingDesc').textContent = finalItem.desc;
  document.getElementById('crumbCat').textContent = cat.charAt(0).toUpperCase()+cat.slice(1);
  document.getElementById('crumbCat').href = cat + '.html';

  document.getElementById('listingAmenities').innerHTML =
    finalItem.amenities.map(a => `<span>${a}</span>`).join('');

  const licenseText = (cat === 'bikes' || cat === 'cars')
    ? 'Driving license verification is required at pickup for this vehicle.'
    : (cat === 'cycles')
      ? 'A basic ID is required at pickup (no driving license needed for cycles).'
      : 'Valid government ID verification is required at check-in.';
  document.getElementById('listingLicense').textContent = licenseText;

  // Booking form setup
  const isVehicle = (cat === 'bikes' || cat === 'cars' || cat === 'cycles');
  const unitWord = isVehicle ? 'day' : 'night';
  const priceSuffix = cat === 'cycles' ? 'hour' : unitWord;

  const form = document.getElementById('bookingForm');
  form.dataset.price = finalItem.price;
  form.dataset.unit = priceSuffix;
  form.dataset.title = finalItem.title;
  form.dataset.category = cat;

  document.getElementById('bookingHeading').textContent =
    '₹' + finalItem.price.toLocaleString('en-IN') + ' / ' + priceSuffix;
  document.getElementById('fromLabel').textContent = isVehicle ? 'Pickup date' : 'Check-in';
  document.getElementById('toLabel').textContent = isVehicle ? 'Return date' : 'Check-out';

  // Reviews
  document.getElementById('reviewsBlock').innerHTML = SAMPLE_REVIEWS.map(r => `
    <div class="review">
      <div class="who"><span>${r.name}</span><span>${r.stars}</span></div>
      <p>${r.text}</p>
    </div>`).join('');
})();