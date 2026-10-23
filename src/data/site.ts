// Shared site content for Mooilande AgriVet

export const CONTACT = {
  phone: '016 110 0861',
  phoneHref: 'tel:0161100861',
  cell: '063 592 7171',
  whatsappHref: 'https://wa.me/27635927171',
  channelHref: 'https://whatsapp.com/channel/0029Vb8FMqtHAdNQyvwQpx1C',
  facebookHref: 'https://www.facebook.com/profile.php?id=61565854067847',
  email: 'admin@mooilande.co.za',
  address: 'Plot 16, River Park AH, Mooilande, Meyerton, 1960',
  hours: [
    { day: 'Monday – Friday', time: '07h30 – 17h00' },
    { day: 'Saturdays', time: '07h30 – 13h00' },
    { day: 'Public holidays', time: 'TBA' },
  ],
};

export interface Brand {
  name: string;
  logo: string;
  /** Round or upright logos: shown a little taller so they match the wide ones visually */
  tall?: boolean;
}

/**
 * A product shown on its department's page. Add items to a department's
 * `products` list below and they appear there automatically.
 *
 *   { name: 'Multimin 500 ml', image: '/products/multimin.jpg', brand: 'Virbac', description: 'Trace mineral injection' }
 */
export interface Product {
  name: string;
  image: string;
  brand?: string;
  description?: string;
}

export interface Department {
  slug: string;
  title: string;
  description: string;
  image: string;
  brands?: Brand[];
  products: Product[];
}

const ANIMAL_HEALTH_BRANDS: Brand[] = [
  { name: 'Zoetis', logo: '/brands/zoetis.webp' },
  { name: 'MSD Animal Health', logo: '/brands/msd-animal-health.webp' },
  { name: 'Elanco', logo: '/brands/elanco.webp' },
  { name: 'Virbac', logo: '/brands/virbac.webp' },
  { name: 'Onderstepoort Biological Products', logo: '/brands/obp.webp', tall: true },
  { name: 'Afrivet', logo: '/brands/afrivet.webp' },
  { name: 'Coopers Animal Health', logo: '/brands/coopers.webp', tall: true },
  { name: 'Bupo Animal Health', logo: '/brands/bupo.webp', tall: true },
  { name: 'Kyron Agri', logo: '/brands/kyron-agri.webp', tall: true },
  { name: 'Revet', logo: '/brands/revet.webp' },
  { name: 'Antrovet', logo: '/brands/antrovet.webp' },
  { name: "Lionel's Veterinary Supplies", logo: '/brands/lionels.webp' },
  { name: 'Swavet', logo: '/brands/swavet.webp', tall: true },
  { name: 'Custom Moulders', logo: '/brands/custom-moulders.webp', tall: true },
];

const AUTOSHOP_BRANDS: Brand[] = [
  { name: 'Autolube', logo: '/brands/autolube.webp' },
  { name: 'Tork Craft', logo: '/brands/torkcraft.webp' },
  { name: 'Vipal', logo: '/brands/vipal.webp', tall: true },
  { name: 'Tagex', logo: '/brands/tagex.webp' },
  { name: 'TotalSource', logo: '/brands/totalsource.webp' },
];

const BRAAI_BRANDS: Brand[] = [
  { name: "LK's", logo: '/brands/lks.webp', tall: true },
  { name: 'Master BBQ', logo: '/brands/master-bbq.webp', tall: true },
];

const GARDENING_BRANDS: Brand[] = [
  { name: 'Rain-Jet', logo: '/brands/rain-jet.webp' },
  { name: 'Efekto', logo: '/brands/efekto.webp', tall: true },
  { name: 'Protek', logo: '/brands/protek.webp', tall: true },
  { name: 'Lasher', logo: '/brands/lasher.webp', tall: true },
  { name: 'Kaufmann Hardware', logo: '/brands/kaufmann.webp' },
  { name: 'Coopers Environmental Science', logo: '/brands/coopers-environmental-science.webp' },
  { name: 'Guano Boost', logo: '/brands/guanoboost.webp', tall: true },
  { name: 'Alnet', logo: '/brands/alnet.webp' },
  { name: 'Knittex', logo: '/brands/knittex.webp' },
  { name: 'Laeveld Agrochem', logo: '/brands/laeveld-agrochem.webp', tall: true },
  { name: 'Bark Unlimited Organics', logo: '/brands/bark-unlimited-organics.webp' },
  { name: 'BLU52', logo: '/brands/blu52.webp' },
  { name: 'MayFord', logo: '/brands/mayford.webp', tall: true },
  { name: 'EASI Seeds', logo: '/brands/easi-seeds.webp', tall: true },
];

const OUTDOOR_BRANDS: Brand[] = [
  { name: 'Würth', logo: '/brands/wurth.webp' },
  { name: 'Okapi', logo: '/brands/okapi.webp' },
  { name: 'Camp Master', logo: '/brands/camp-master.webp', tall: true },
  { name: 'Römer Cooler Boxes', logo: '/brands/romer.webp' },
  { name: 'Bison Adventure', logo: '/brands/bison-adventure.webp', tall: true },
  { name: 'Nduna', logo: '/brands/nduna.webp', tall: true },
  { name: 'Sniper Africa', logo: '/brands/sniper-africa.webp', tall: true },
  { name: 'Redback', logo: '/brands/redback.webp', tall: true },
  { name: 'Bourbon Eyewear', logo: '/brands/bourbon-eyewear.webp' },
  { name: 'Stevenson Hamilton', logo: '/brands/stevenson-hamilton.webp', tall: true },
  { name: 'Watamu', logo: '/brands/watamu.webp', tall: true },
];

const SAFETY_BRANDS: Brand[] = [
  { name: 'Dromex', logo: '/brands/dromex.webp', tall: true },
  { name: 'Matus', logo: '/brands/matus.webp' },
  { name: 'PlusTen', logo: '/brands/plusten.webp' },
  { name: 'Agrinet', logo: '/brands/agrinet.webp' },
];

export const DEPARTMENTS: Department[] = [
  { slug: 'animal-feeds', title: 'Animal Feeds', description: 'Feed for livestock, poultry, horses and general farm animals', image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1920&q=70', products: [] },
  { slug: 'animal-health', title: 'Animal Health', description: 'Vaccines, dewormers, wound care, supplements and health essentials', image: '/categories/animalhealth-lg.webp', brands: ANIMAL_HEALTH_BRANDS, products: [] },
  { slug: 'gardening-irrigation-pool', title: 'Gardening, Irrigation & Pool', description: 'Watering tools, irrigation parts and gardening essentials', image: '/categories/gardening-lg.webp', brands: GARDENING_BRANDS, products: [] },
  { slug: 'farm-supplies', title: 'Farm Supplies', description: 'Practical essentials for daily farm operations and maintenance', image: '/categories/farmsupplies-lg.webp', products: [] },
  { slug: 'hardware', title: 'Hardware', description: 'Tools, fittings, fasteners and workshop essentials', image: '/categories/hardware-lg.webp', products: [] },
  { slug: 'autoshop', title: 'Autoshop', description: 'Automotive products, accessories and maintenance basics', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1920&q=70', brands: AUTOSHOP_BRANDS, products: [] },
  { slug: 'household', title: 'Household', description: 'Everyday household goods and practical home-use products', image: '/categories/cleaning-lg.webp', products: [] },
  { slug: 'pastures', title: 'Pastures', description: 'Products and inputs to support healthy pasture growth and grazing', image: '/categories/pastures-lg.webp', products: [] },
  { slug: 'braai', title: 'Braai', description: 'Braai gear, fire starters, accessories and outdoor cooking basics', image: '/categories/braai-lg.webp', brands: BRAAI_BRANDS, products: [] },
  { slug: 'outdoor-clothing', title: 'Outdoor & Clothing', description: 'Useful products for outdoor living, farm use and general utility', image: '/categories/camp-lg.webp', brands: OUTDOOR_BRANDS, products: [] },
  { slug: 'pet-food-treats-accessories', title: 'Pet Food, Treats & Accessories', description: 'Pet nutrition, snacks, collars, bowls and everyday pet essentials', image: '/categories/pets-lg.webp', products: [] },
  { slug: 'plumbing', title: 'Plumbing', description: 'Pipes, fittings, repair parts and water system essentials', image: '/categories/plumbing-lg.webp', products: [] },
  { slug: 'pesticides-fertilizers', title: 'Pesticides & Fertilizers', description: 'Crop protection products, pest control and plant nutrition', image: '/categories/rats-lg.webp', products: [] },
  { slug: 'pumps', title: 'Centrifugal & Pressure Pumps', description: 'Reliable pumping solutions for water supply, irrigation and pressure systems', image: '/categories/pumps-lg.webp', products: [] },
  { slug: 'fencing-steel-wire', title: 'Fencing, Steel & Wire', description: 'Fencing materials, steel posts and wire for farm boundaries and livestock management', image: '/categories/fencing-lg.webp', products: [] },
  { slug: 'equine', title: 'Equine Supplements & Accessories', description: 'Health supplements, feeds and accessories to keep your horses performing at their best', image: '/categories/horses-lg.webp', products: [] },
  { slug: 'safety-ppe', title: 'Safety & PPE', description: 'Protective clothing, boots, gloves and safety gear for agricultural environments', image: '/categories/safety-lg.webp', brands: SAFETY_BRANDS, products: [] },
];

export const departmentHref = (d: Department) => `/products/${d.slug}`;

/** Smaller copies of a department photo: 'sm' for cards (~760px), 'xs' for menu thumbnails (160px). */
export const deptImage = (d: Department, size: 'sm' | 'xs') =>
  d.image.startsWith('http')
    ? d.image.replace(/w=\d+/, size === 'sm' ? 'w=760' : 'w=160&h=160')
    : d.image.replace('-lg.webp', `-${size}.webp`);

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export const TEAM: TeamMember[] = [
  { name: 'Adolph Barnard', role: 'Animal Nutritionist & Operations Manager', image: '/team/adolphbarnard.webp' },
  { name: 'Lydia Nrateng Mokoena', role: 'General Worker / House Keeping', image: '/team/nratengmokoena.webp' },
  { name: 'Carina Beukes', role: 'Manager', image: '/team/carinabeukes.webp' },
  { name: 'Wanda Viljoen', role: 'Store Manager', image: '/team/wandaviljoen.webp' },
  { name: 'Megan De Bruyn', role: 'Receiving Clerk', image: '/team/megandebruyn.webp' },
  { name: 'Andries Blignaut', role: 'Store & Machine Operator', image: '/team/andriesblignaut.webp' },
  { name: 'Hardus Botha', role: 'Delivery Driver', image: '/team/hardusbotha.webp' },
  { name: 'Mariska Smith', role: 'General Worker / Cashier', image: '/team/mariskasmith.webp' },
  { name: 'Dianke De Villiers', role: 'Animal Health / Social Media', image: '/team/diankedevilliers.webp' },
  { name: 'Charleen van Baalen', role: 'Bookkeeper', image: '/team/charleenvanbaalen.webp' },
  { name: 'Annatjie Coetsee', role: 'Protek Sales Assistant', image: '/team/annatjiecoetsee.webp' },
  { name: 'Johnny Marjorie', role: 'General Worker / Floor Assistant', image: '/team/johnnymarjorie.webp' },
  { name: 'Danike Perelaer', role: 'General Worker / Cashier', image: '/team/danikeperelaer.webp' },
  { name: 'Moses Zolidwa', role: 'General Worker / Store Assistant', image: '/team/moseszolidwa.webp' },
  { name: 'Simon Mokaloba', role: 'General Worker / Store Assistant', image: '/team/simonmokaloba.webp' },
  { name: 'Delina Senoamadi', role: 'Cashier', image: '/team/delinasenoamadi.webp' },
];

export interface Vacancy {
  title: string;
  description: string;
}

/**
 * Open positions shown in the footer. Add one like:
 *   { title: 'Cashier', description: "We're looking for… If interested please send your CV to admin@mooilande.co.za" }
 */
export const VACANCIES: Vacancy[] = [];
