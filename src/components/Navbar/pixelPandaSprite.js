// src/components/Navbar/pixelPandaSprite.js
// ============================================================
// CUTE PIXEL PANDA - 16x18 pixel art with natural vertical bamboo
// ============================================================

export const GRID_COLS = 16;
export const GRID_ROWS = 18;

export const COLORS = {
  K: '#14120f', // near-black outline / ears / eye-patches / limbs
  W: '#ffffff', // cute white fur / head / tummy
  P: '#ff7b93', // vibrant cute pink blush
  G: '#38a169', // bright green bamboo stalk
  D: '#1b4332', // dark bamboo joint
};

// Standard Head & Ears (Rows 0-4) - 16 columns each
const BASE_HEAD_TOP = [
  '...KK......KK...', // 0 ear tips
  '..KKKK....KKKK..', // 1 ear base
  '.KKKKKK..KKKKKK.', // 2 ears meet head
  '.KWWWWWWWWWWWWK.', // 3 head top
  'KWWWWWWWWWWWWWWK', // 4 head upper
];

// Eye rows (Rows 5-7): Big cute eyes with white pupil highlights
const EYES_OPEN_R5 = 'KWWKKKKWWWWKKKKK';
const EYES_OPEN_R6 = 'KWKKWKKWWWWKKWKK'; // white pupil highlight W
const EYES_OPEN_R7 = 'KWKKKKKWWWWKKKKK';

const EYES_CLOSED_R5 = 'KWWKKKKWWWWKKKKK';
const EYES_CLOSED_R6 = 'KWKKKKKWWWWKKKKK'; // closed eyes
const EYES_CLOSED_R7 = 'KWWWWWWWWWWWWWWK';

// Face lower & blush (Rows 8-10)
const BASE_HEAD_BOTTOM = [
  'KWWPPWWKKWWPPWWK', // 8 pink blush PP + nose KK
  'KWWWWWWWWWWWWWWK', // 9 lower cheek
  '.KKKKKKKKKKKKKK.', // 10 chin outline
];

// Body & Arms (Rows 11-16)
const BASE_BODY = [
  '.KKWWWWWWWWWWKK.', // 11 chest black arms + white tummy
  'KKKWWWWWWWWWWKKK', // 12 arm nubs
  'KWKWWWWWWWWWWKWK', // 13 tummy
  'KWKWWWWWWWWWWKWK', // 14 tummy
  '.KKWWWWWWWWWWKK.', // 15 lower tummy
  '.KKKKKKKKKKKKKK.', // 16 bottom border
];

// Feet (Row 17)
const FEET_REST = '..KKKK....KKKK..'; // both feet planted
const FEET_STEP_LEFT = '..KKKK..........'; // left step
const FEET_STEP_RIGHT = '..........KKKK..'; // right step

function buildFrame(r5, r6, r7, feetRow) {
  return [
    ...BASE_HEAD_TOP,
    r5,
    r6,
    r7,
    ...BASE_HEAD_BOTTOM,
    ...BASE_BODY,
    feetRow,
  ];
}

// Bamboo Frame - Long vertical green bamboo shoot (Rows 3-16)
const BAMBOO_HEAD_TOP = [
  '...KK......KK...', // 0 ear tips
  '..KKKK....KKKK..', // 1 ear base
  '.KKKKKK..KKKKKK.', // 2 ears meet head
  '.KWWWWWWWWWWWWGK.', // 3 bamboo tip extending above ear
  'KWWWWWWWWWWWWGGK', // 4 bamboo stalk
];
const BAMBOO_R5 = 'KWWKKKKWWWWKKGKK';
const BAMBOO_R6 = 'KWKKWKKWWWWKKGKK';
const BAMBOO_R7 = 'KWKKKKKWWWWKKGKK';

const BAMBOO_HEAD_BOTTOM = [
  'KWWPPWWKKWWPPGGK', // 8 bamboo stalk held in paw
  'KWWWWWWWWWWWWGGK', // 9 bamboo stalk
  '.KKKKKKKKKKKKGDK.', // 10 bamboo joint
];

const BAMBOO_BODY = [
  '.KKWWWWWWWWWWGKK.', // 11 bamboo in right arm
  'KKKWWWWWWWWWWGKK', // 12 bamboo stalk
  'KWKWWWWWWWWWWGKK', // 13 bamboo stalk
  'KWKWWWWWWWWWWGKK', // 14 bamboo stalk
  '.KKWWWWWWWWWWGKK.', // 15 bamboo stalk
  '.KKKKKKKKKKKKGKK.', // 16 bamboo bottom
];

// Waving Arm Variants - Raised right paw waving high next to ear (Rows 0-4)
const WAVE_HEAD_TOP_A = [
  '...KK......KK.KK', // Raised paw right
  '..KKKK....KKKKKK',
  '.KKKKKK..KKKKKKK',
  '.KWWWWWWWWWWWWK.',
  'KWWWWWWWWWWWWWWK',
];

const WAVE_HEAD_TOP_B = [
  '...KK......KK...', // Paw tilted wave
  '..KKKK....KKKKKK',
  '.KKKKKK..KKKKKKK',
  '.KWWWWWWWWWWWWK.',
  'KWWWWWWWWWWWWWWK',
];

// Public frame set - every frame has exactly 18 rows of 16 columns
export const FRAMES = {
  idle: buildFrame(EYES_OPEN_R5, EYES_OPEN_R6, EYES_OPEN_R7, FEET_REST),
  blink: buildFrame(EYES_CLOSED_R5, EYES_CLOSED_R6, EYES_CLOSED_R7, FEET_REST),
  walkA: buildFrame(EYES_OPEN_R5, EYES_OPEN_R6, EYES_OPEN_R7, FEET_STEP_LEFT),
  walkB: buildFrame(EYES_OPEN_R5, EYES_OPEN_R6, EYES_OPEN_R7, FEET_STEP_RIGHT),
  sleep: buildFrame(EYES_CLOSED_R5, EYES_CLOSED_R6, EYES_CLOSED_R7, FEET_REST),
  bamboo: [
    ...BAMBOO_HEAD_TOP,
    BAMBOO_R5,
    BAMBOO_R6,
    BAMBOO_R7,
    ...BAMBOO_HEAD_BOTTOM,
    ...BAMBOO_BODY,
    FEET_REST,
  ],
  waveA: [
    ...WAVE_HEAD_TOP_A,
    EYES_OPEN_R5,
    EYES_OPEN_R6,
    EYES_OPEN_R7,
    ...BASE_HEAD_BOTTOM,
    ...BASE_BODY,
    FEET_REST,
  ],
  waveB: [
    ...WAVE_HEAD_TOP_B,
    EYES_OPEN_R5,
    EYES_OPEN_R6,
    EYES_OPEN_R7,
    ...BASE_HEAD_BOTTOM,
    ...BASE_BODY,
    FEET_REST,
  ],
};
