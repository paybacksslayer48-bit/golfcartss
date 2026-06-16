import { Product } from './types';

export const COMPATIBLE_MODELS = [
  'Club Car Onward HP Drive',
  'EZGO Express Elite Lithium',
  'Yamaha PowerTech AC EFI',
  'Garia Via Premium Cruiser',
  'Evolution D5 Forester Lifted'
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    oemNumber: 'GC-PRE-CARBON',
    name: 'Club Car Precedent Custom Carbon Roadster',
    nameRu: 'Электрокар Club Car Precedent Custom Carbon',
    category: 'resort',
    description: 'Handcrafted premium resort cruiser built on full rustproof aircraft-grade aluminum chassis. Styled with high-gloss deep carbon fiber dash panels, hand-stitched premium executive seats, 12" machined matte-black alloys, and dynamic daytime running LEDs.',
    descriptionRu: 'Элитный курортный электрокар на прочном алюминиевом шасси авиационного класса. Карбоновая фронтальная панель, премиальные сиденья ручной работы, 12-дюймовые диски радиального плетения и диодные ходовые огни.',
    priceEur: 14500,
    condition: 'new',
    conditionRu: 'Новый (Custom Build)',
    images: [
      'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?auto=format&fit=crop&q=80&w=800'
    ],
    specs: {
      Drivetrain: '4.7 HP High-Output AC Motor with regen braking',
      Battery: '48V Single battery system with on-board smart charger',
      Rims: '12" Athena Machined Black Custom Alloy wheels',
      Capacity: '2 Seats with luxury yacht upholstery backrest contour'
    },
    specsRu: {
      Drivetrain: 'Мощный AC-мотор 4.7 л.с. с рекуперацией при торможении',
      Battery: '48V Единая батарейная система с функцией умной экспресс-зарядки',
      Rims: '12" Диски Athena Machined Black Custom Alloy из прочного сплава',
      Capacity: '2 места повышенного комфорта из экокожи яхтенного класса'
    },
    compatibleModels: ['Club Car Onward HP Drive', 'Garia Via Premium Cruiser'],
    inStock: true,
    isPinned: true
  },
  {
    id: 'prod-2',
    oemNumber: 'GC-EZGO-BEAST',
    name: 'EZGO Express Terrain Lifted Offroad Beast 72V',
    nameRu: 'Внедорожный Лифтованный КАР EZGO Express Beast 72V',
    category: 'offroad',
    description: 'Powerful lifted offroad utility cart. Equipped with a custom 6" heavy-duty double A-Arm suspension lift kit, massive 23-inch rough-terrain tires, full powder-coated brushguard bumper, and high-capacity 72V 105Ah LiFePO4 Ultra Lithium pack for extreme hill-climbing torque.',
    descriptionRu: 'Экстремально высокая проходимость. Оснащен 6-дюймовым усиленным лифт-пакетом подвески A-Arm, агрессивными грязевыми 23-дюймовыми шинами, защитным бампером-кенгурятником и титановой батареей повышенной мощности 72V 105Ah.',
    priceEur: 18900,
    condition: 'new',
    conditionRu: 'Новый (Custom Build)',
    images: [
      'https://images.unsplash.com/photo-1549399542-7043b8e764d0?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&q=80&w=800'
    ],
    specs: {
      GroundClearance: '16 Inches ground clearance (reinforced premium leaf springs)',
      LithiumPack: '72V 105Ah Ultra LiFePO4 with active wireless smart BMS dashboard',
      Controller: 'Navitas TAC2 600A performance controller (45 km/h peak speed)',
      Seating: '4 Seats (Double facing forward, double facing utility rear)'
    },
    specsRu: {
      GroundClearance: 'Просвет 16 дюймов (усиленные титановые спортивные рессоры)',
      LithiumPack: '72V 105Ah Ultra LiFePO4 со встроенной микросхемой BMS',
      Controller: 'Спортивный контроллер Navitas TAC2 600A (до 45 км/ч пик)',
      Seating: '4 места (Два направлены вперед, два складывающихся назад)'
    },
    compatibleModels: ['EZGO Express Elite Lithium', 'Evolution D5 Forester Lifted'],
    inStock: true,
    isPinned: true
  },
  {
    id: 'prod-3',
    oemNumber: 'GC-YAMA-CRUISER',
    name: 'Yamaha Drive2 Bespoke 4-Seater Yacht Club Edition',
    nameRu: 'Гольфкар Yamaha Drive2 Bespoke Yacht Club (4 Места)',
    category: 'four_seater',
    description: 'The standard of luxury community cruising. Tailored with double-stitched cognac genuine marine upholstery resistant to UV fading. Incorporates rear-facing flip-flop seating converting instantly to flatbed cart cargo space, side rear view LED mirrors, and complete canopy overhead assembly.',
    descriptionRu: 'Признанный эталон люксовых загородных поездок. Коньячная кожа с двойным яхтенным швом, сиденья-трансформеры (задний ряд складывается в прочную грузовую платформу), зеркала со встроенными повторителями и панорамная крыша.',
    priceEur: 16200,
    condition: 'new',
    conditionRu: 'Новый (Custom Build)',
    images: [
      'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1594144400613-40a2333b2bf7?auto=format&fit=crop&q=80&w=800'
    ],
    specs: {
      BatteryType: '51V 105Ah Lithium maintenance-free active pack',
      SeatsStyle: 'Contour dual-density yacht luxury bucket cushioning',
      CargoSetup: 'Patented flip-seat with under-seat heavy duty watertight cooler',
      Infotainment: 'Dual Bluetooth audio system bars with remote phone control'
    },
    specsRu: {
      BatteryType: '51V 105Ah Литиевая полностью герметичная необслуживаемая батарея',
      SeatsStyle: 'Анатомическая эргономическая система сидений класса яхт',
      CargoSetup: 'Складная платформа со встроенным герметичным термобоксом на 15л',
      Infotainment: 'Двухканальная аудио-система по технологии Bluetooth'
    },
    compatibleModels: ['Yamaha PowerTech AC EFI', 'Club Car Onward HP Drive'],
    inStock: true,
    isPinned: true
  },
  {
    id: 'prod-4',
    oemNumber: 'GC-EV-SHUTTLE',
    name: 'Evolution D5 Grand Executive 6-Seater Resort Limo',
    nameRu: 'Resort Лимузин Evolution D5 Grand Executive (6 Мест)',
    category: 'six_seater',
    description: 'Bespoke grand carriage optimized for private island resorts, VIP transport, and major luxury estates. Offers 3 full rows of forward-facing ergonomic leather armchairs, integrated touch screen console showing real-time GPS tracking and speedometer, and dynamic adaptive front beam LED lighting.',
    descriptionRu: 'Большой премиальный шаттл для гольф-курортов, VIP-гостей и частных резиденций. Три ряда сидений расположены лицом вперед, сенсорная консоль управления, спутниковый трекер и адаптивный свет фар.',
    priceEur: 24500,
    condition: 'new',
    conditionRu: 'Новый (Custom Build)',
    images: [
      'https://images.unsplash.com/photo-1584281729155-3c1b3c5c5faf?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1622322482325-117565bc93c0?auto=format&fit=crop&q=80&w=800'
    ],
    specs: {
      Chassis: 'Extra-rigid fully reinforced steel structures with roll-bar support',
      Powertrain: '6.3 kW high efficiency brushless AC synchronous induction motor',
      Display: '9-inch smart LCD multi-touch dashboard with screen-mirroring',
      Suspension: '4-wheel hydraulic shock coil-overs with active rebound tuning'
    },
    specsRu: {
      Chassis: 'Сверхжесткая монококовая стальная рама с поперечной стабилизацией',
      Powertrain: 'Бесщеточный AC индукционный мотор постоянного тока мощностью 6.3 kW',
      Display: '9-дюймовый сенсорный мультимедийный дисплей с поддержкой Carplay',
      Suspension: 'Винтовые койловеры с регулировкой жесткости отбоя для максимальной плавности'
    },
    compatibleModels: ['Evolution D5 Forester Lifted', 'EZGO Express Elite Lithium'],
    inStock: true,
    isPinned: false
  },
  {
    id: 'prod-5',
    oemNumber: 'GC-VIN-HERITAGE',
    name: 'Vintage Speed Roadster Custom Heritage Edition',
    nameRu: 'Винтажный Электрокар Speed Roadster Heritage Edition',
    category: 'vintage',
    description: 'Stunning artistic retro recreation. Blends the gorgeous 1930s custom coupe aesthetic with modern 100% emission-free green technology. Beautifully details genuine polished chrome wire-spoke wheels, timber steering wheel finishes, rich hand-polished ivory moldings, and deep tufted leather bench.',
    descriptionRu: 'Безукоризненный ретро-дизайн в духе купе-родстеров 1930-х годов, объединенный с бесшумными технологиями 21 века. Хромированные спицованные диски, руль из массива дерева, лакированный кремовый капот и кожаная диванная обивка.',
    priceEur: 28900,
    condition: 'new',
    conditionRu: 'Новый (Custom Build)',
    images: [
      'https://images.unsplash.com/photo-1591453089201-3fcf7ca6f634?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&q=80&w=800'
    ],
    specs: {
      Aesthetic: 'Chrome wire spokes with Whitewall classic retro tire sidewalls',
      Cabin: 'Fine marine mahogany wooden dashboard inserts with brass buttons',
      Performance: 'Smooth whisper-quiet brushless drivetrain, 35 km/h top limit',
      Safety: 'Hydraulic drum-brake layout with integrated classic brake light bulbs'
    },
    specsRu: {
      Aesthetic: 'Спицованные колесные диски с окантовкой резины Whitewall',
      Cabin: 'Фронтальная панель из массива красного дерева с латунными приборами',
      Performance: 'Бесшумный привод прямого хода с максимальной скоростью 35 км/ч',
      Safety: 'Гидравлический тормозной контур с классическими круглыми стоп-сигналами'
    },
    compatibleModels: ['Garia Via Premium Cruiser', 'Yamaha PowerTech AC EFI'],
    inStock: true,
    isPinned: false
  },
  {
    id: 'prod-6',
    oemNumber: 'GC-GAR-STREET',
    name: 'Garia Via Street-Legal Luxury Town Car Custom',
    nameRu: 'Люксовый Кабриолет Garia Via Street-Legal Custom',
    category: 'resort',
    description: 'Certified street-legal luxury low-speed vehicle (LSV) built to the highest Nordic design and safety parameters. Includes registration plate holders, automatic electric parking brake system, integrated dashboard refrigerator, panoramic safety-glass windshield with wiper, and dynamic digital instrumentation.',
    descriptionRu: 'Официально сертифицированный для городских улиц (LSV) премиальный гольф-кар премиум сегмента. Полный пакет светотехники, электронный ручник, холодильник в бардачке, панорамное трехслойное стекло со стеклоочистителем и цифровая приборка.',
    priceEur: 32000,
    condition: 'new',
    conditionRu: 'Новый (Custom Build)',
    images: [
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=800'
    ],
    specs: {
      Approval: 'Fully DOT street-legal certified with multi-point safety seat belts',
      Comfort: 'Built-in active cooling thermoelectric glove box refrigeration unit',
      Drivetrain: 'Premium lithium performance 120Ah battery cells with fast plug system',
      Audio: 'State-of-the-art premium digital audio with handsfree car speakers'
    },
    specsRu: {
      Approval: 'Полная DOT-сертификация для дорог общего пользования с ремнями безопасности',
      Comfort: 'Встроенный активный охлаждаемый холодильный отсек на панели приборов',
      Drivetrain: 'Литий-ионные ячейки 120Ah с ускоренным зарядным циклом',
      Audio: 'Премиальная цифровая аудиосистема со встроенным модулем громкой связи'
    },
    compatibleModels: ['Garia Via Premium Cruiser', 'Club Car Onward HP Drive'],
    inStock: true,
    isPinned: false
  }
];
