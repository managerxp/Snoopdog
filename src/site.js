// Single source of truth for every business fact shown on the site.
export const site = {
  name: 'SnoopDog',
  tagline: "The pet's side of town.",
  // Confirmed by the owner (9933214383, same as the grand-opening poster). Digits only, with country code.
  phone: '919933214383',
  phoneDisplay: '+91 99332 14383',
  // From the printed business card.
  email: 'snoopdog.pets99@gmail.com',
  address: {
    lines: ['Shop No. 03, First Floor', 'Near Medical Bus Stop, Garacharama', 'Sri Vijaya Puram, Andaman and Nicobar Islands 744105'],
    street: 'Shop No. 03, First Floor, near Medical Bus Stop, Garacharama',
    city: 'Sri Vijaya Puram',
    region: 'Andaman and Nicobar Islands',
    postalCode: '744105',
  },
  geo: { lat: 11.61633, lng: 92.7066039 },
  mapsUrl: 'https://maps.app.goo.gl/izPf9ugWQmbmEwhB9',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=11.61633,92.7066039',
  instagram: { handle: '@snoopdog_andamans', url: 'https://www.instagram.com/snoopdog_andamans/' },
  hours: { open: [8, 30], close: [21, 0], label: 'Daily, 8:30 AM – 9:00 PM' },
  google: { rating: '5.0', count: 6 },
};

export const whatsappUrl = (text) =>
  `https://wa.me/${site.phone}?text=${encodeURIComponent(text)}`;

export const telUrl = `tel:+${site.phone}`;

export const generalEnquiry = 'Hi SnoopDog, I have a question about your products. Could you please help?';

export const productEnquiry = (item) =>
  `Hi SnoopDog, I'm enquiring about ${item} for my pet. Could you please confirm availability and price?`;
