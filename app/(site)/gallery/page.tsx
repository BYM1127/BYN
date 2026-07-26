'use client'

import { useState } from 'react'
import { ImageIcon, Scissors, Camera, Monitor } from 'lucide-react'

type Filter = 'all' | 'crochet' | 'photography' | 'webdesign'

const ITEMS = [
  {
    "id": 1,
    "title": "Crochet Masterpiece 1",
    "src": "/crochet/IMG_20240311_082604_436.jpg",
    "category": "Crochet"
  },
  {
    "id": 2,
    "title": "Crochet Masterpiece 2",
    "src": "/crochet/IMG_20240311_082604_490.jpg",
    "category": "Crochet"
  },
  {
    "id": 3,
    "title": "Crochet Masterpiece 3",
    "src": "/crochet/IMG_20240322_203625_217.webp",
    "category": "Crochet"
  },
  {
    "id": 4,
    "title": "Crochet Masterpiece 4",
    "src": "/crochet/IMG_20240327_184936_893.jpg",
    "category": "Crochet"
  },
  {
    "id": 5,
    "title": "Crochet Masterpiece 5",
    "src": "/crochet/IMG_20240327_184936_929.jpg",
    "category": "Crochet"
  },
  {
    "id": 6,
    "title": "Crochet Masterpiece 6",
    "src": "/crochet/IMG_20240331_140012_639.jpg",
    "category": "Crochet"
  },
  {
    "id": 7,
    "title": "Crochet Masterpiece 7",
    "src": "/crochet/IMG_20240331_140012_664.jpg",
    "category": "Crochet"
  },
  {
    "id": 8,
    "title": "Crochet Masterpiece 8",
    "src": "/crochet/IMG_20260715_182215_1.jpg",
    "category": "Crochet"
  },
  {
    "id": 9,
    "title": "Crochet Masterpiece 9",
    "src": "/crochet/IMG_20260715_182218_1.jpg",
    "category": "Crochet"
  },
  {
    "id": 10,
    "title": "Crochet Masterpiece 10",
    "src": "/crochet/IMG_20260715_182220_1.jpg",
    "category": "Crochet"
  },
  {
    "id": 11,
    "title": "Crochet Masterpiece 11",
    "src": "/crochet/IMG_20260715_182222.jpg",
    "category": "Crochet"
  },
  {
    "id": 12,
    "title": "Crochet Masterpiece 12",
    "src": "/crochet/IMG_20260715_182224_1.jpg",
    "category": "Crochet"
  },
  {
    "id": 13,
    "title": "Crochet Masterpiece 13",
    "src": "/crochet/IMG_3932.JPG",
    "category": "Crochet"
  },
  {
    "id": 14,
    "title": "Crochet Masterpiece 14",
    "src": "/crochet/IMG_3933.JPG",
    "category": "Crochet"
  },
  {
    "id": 15,
    "title": "Crochet Masterpiece 15",
    "src": "/crochet/IMG_3934.JPG",
    "category": "Crochet"
  },
  {
    "id": 16,
    "title": "Crochet Masterpiece 16",
    "src": "/crochet/IMG_3935.JPG",
    "category": "Crochet"
  },
  {
    "id": 17,
    "title": "Crochet Masterpiece 17",
    "src": "/BYM content/20240130_124740.jpg",
    "category": "Crochet"
  },
  {
    "id": 18,
    "title": "Crochet Masterpiece 18",
    "src": "/BYM content/20240204_082848.jpg",
    "category": "Crochet"
  },
  {
    "id": 19,
    "title": "Crochet Masterpiece 19",
    "src": "/BYM content/20240207_122207.jpg",
    "category": "Crochet"
  },
  {
    "id": 20,
    "title": "Crochet Masterpiece 20",
    "src": "/BYM content/20240207_122213.jpg",
    "category": "Crochet"
  },
  {
    "id": 21,
    "title": "Crochet Masterpiece 21",
    "src": "/BYM content/20240329_164759.jpg",
    "category": "Crochet"
  },
  {
    "id": 22,
    "title": "Crochet Masterpiece 22",
    "src": "/BYM content/20240425_112209.jpg",
    "category": "Crochet"
  },
  {
    "id": 23,
    "title": "Crochet Masterpiece 23",
    "src": "/BYM content/20240620_162638.jpg",
    "category": "Crochet"
  },
  {
    "id": 24,
    "title": "Crochet Masterpiece 24",
    "src": "/BYM content/20240707_154813.jpg",
    "category": "Crochet"
  },
  {
    "id": 25,
    "title": "Crochet Masterpiece 25",
    "src": "/BYM content/20240707_154814.jpg",
    "category": "Crochet"
  },
  {
    "id": 26,
    "title": "Crochet Masterpiece 26",
    "src": "/BYM content/20240711_113003.jpg",
    "category": "Crochet"
  },
  {
    "id": 27,
    "title": "Crochet Masterpiece 27",
    "src": "/BYM content/3906c42e3a47baf22149bff731d88c5c.png",
    "category": "Crochet"
  },
  {
    "id": 28,
    "title": "Crochet Masterpiece 28",
    "src": "/BYM content/548f6bd92599075ce4869a941612e70c.png",
    "category": "Crochet"
  },
  {
    "id": 29,
    "title": "Crochet Masterpiece 29",
    "src": "/BYM content/6ffb35a68b11e44f09b7353ec826109c.png",
    "category": "Crochet"
  },
  {
    "id": 30,
    "title": "Crochet Masterpiece 30",
    "src": "/BYM content/9664b872917171adcd4fc777081b039d.png",
    "category": "Crochet"
  },
  {
    "id": 31,
    "title": "Crochet Masterpiece 31",
    "src": "/BYM content/9addcbb7e046d4f304b790add241b3a3.png",
    "category": "Crochet"
  },
  {
    "id": 32,
    "title": "Crochet Masterpiece 32",
    "src": "/BYM content/a8c37333b9eaf0f8485c6e5666fc724b.png",
    "category": "Crochet"
  },
  {
    "id": 33,
    "title": "Crochet Masterpiece 33",
    "src": "/BYM content/b60124ccc8990c0f65e28c7573a38995.png",
    "category": "Crochet"
  },
  {
    "id": 34,
    "title": "Crochet Masterpiece 34",
    "src": "/BYM content/bf1ff3906674939ed325d327092337ae.png",
    "category": "Crochet"
  },
  {
    "id": 35,
    "title": "Crochet Masterpiece 35",
    "src": "/BYM content/c95b5b8e76fd497c4fff7d9bea694ba5.png",
    "category": "Crochet"
  },
  {
    "id": 36,
    "title": "Crochet Masterpiece 36",
    "src": "/BYM content/ebd6a3c7aab6dcd1a55db32931c131da.png",
    "category": "Crochet"
  },
  {
    "id": 37,
    "title": "Crochet Masterpiece 37",
    "src": "/BYM content/fc42727fb101895454d210147a7a8679.png",
    "category": "Crochet"
  },
  {
    "id": 38,
    "title": "Crochet Masterpiece 38",
    "src": "/BYM content/IMG-20231211-WA0007.jpg",
    "category": "Crochet"
  },
  {
    "id": 39,
    "title": "Crochet Masterpiece 39",
    "src": "/BYM content/IMG-20260608-WA0031.jpg",
    "category": "Crochet"
  },
  {
    "id": 40,
    "title": "Crochet Masterpiece 40",
    "src": "/BYM content/IMG-20260608-WA0034.jpg",
    "category": "Crochet"
  },
  {
    "id": 41,
    "title": "Crochet Masterpiece 41",
    "src": "/BYM content/IMG-20260608-WA0036.jpg",
    "category": "Crochet"
  },
  {
    "id": 42,
    "title": "Crochet Masterpiece 42",
    "src": "/BYM content/IMG-20260608-WA0038.jpg",
    "category": "Crochet"
  },
  {
    "id": 43,
    "title": "Crochet Masterpiece 43",
    "src": "/BYM content/IMG-20260608-WA0040.jpg",
    "category": "Crochet"
  },
  {
    "id": 44,
    "title": "Crochet Masterpiece 44",
    "src": "/BYM content/IMG-20260608-WA0046.jpg",
    "category": "Crochet"
  },
  {
    "id": 45,
    "title": "Crochet Masterpiece 45",
    "src": "/BYM content/IMG-20260608-WA0047.jpg",
    "category": "Crochet"
  },
  {
    "id": 46,
    "title": "Crochet Masterpiece 46",
    "src": "/BYM content/IMG_0002.JPG",
    "category": "Crochet"
  },
  {
    "id": 47,
    "title": "Crochet Masterpiece 47",
    "src": "/BYM content/IMG_0003.JPG",
    "category": "Crochet"
  },
  {
    "id": 48,
    "title": "Crochet Masterpiece 48",
    "src": "/BYM content/IMG_0005.JPG",
    "category": "Crochet"
  },
  {
    "id": 49,
    "title": "Crochet Masterpiece 49",
    "src": "/BYM content/IMG_0007.JPG",
    "category": "Crochet"
  },
  {
    "id": 50,
    "title": "Crochet Masterpiece 50",
    "src": "/BYM content/IMG_0009.JPG",
    "category": "Crochet"
  },
  {
    "id": 51,
    "title": "Crochet Masterpiece 51",
    "src": "/BYM content/IMG_0010.JPG",
    "category": "Crochet"
  },
  {
    "id": 52,
    "title": "Crochet Masterpiece 52",
    "src": "/BYM content/IMG_0011.JPG",
    "category": "Crochet"
  },
  {
    "id": 53,
    "title": "Crochet Masterpiece 53",
    "src": "/BYM content/IMG_0015.JPG",
    "category": "Crochet"
  },
  {
    "id": 54,
    "title": "Crochet Masterpiece 54",
    "src": "/BYM content/IMG_0016.JPG",
    "category": "Crochet"
  },
  {
    "id": 55,
    "title": "Crochet Masterpiece 55",
    "src": "/BYM content/IMG_0023.JPG",
    "category": "Crochet"
  },
  {
    "id": 56,
    "title": "Crochet Masterpiece 56",
    "src": "/BYM content/IMG_0024.JPG",
    "category": "Crochet"
  },
  {
    "id": 57,
    "title": "Crochet Masterpiece 57",
    "src": "/BYM content/IMG_0026.JPG",
    "category": "Crochet"
  },
  {
    "id": 58,
    "title": "Crochet Masterpiece 58",
    "src": "/BYM content/IMG_0054 (1).JPG",
    "category": "Crochet"
  },
  {
    "id": 59,
    "title": "Crochet Masterpiece 59",
    "src": "/BYM content/IMG_0055 (1).JPG",
    "category": "Crochet"
  },
  {
    "id": 60,
    "title": "Crochet Masterpiece 60",
    "src": "/BYM content/IMG_0057 (1).JPG",
    "category": "Crochet"
  },
  {
    "id": 61,
    "title": "Crochet Masterpiece 61",
    "src": "/BYM content/IMG_0099 (1).JPG",
    "category": "Crochet"
  },
  {
    "id": 62,
    "title": "Crochet Masterpiece 62",
    "src": "/BYM content/IMG_0099 (2).JPG",
    "category": "Crochet"
  },
  {
    "id": 63,
    "title": "Crochet Masterpiece 63",
    "src": "/BYM content/IMG_0100 (1).JPG",
    "category": "Crochet"
  },
  {
    "id": 64,
    "title": "Crochet Masterpiece 64",
    "src": "/BYM content/IMG_0100 (2).JPG",
    "category": "Crochet"
  },
  {
    "id": 65,
    "title": "Crochet Masterpiece 65",
    "src": "/BYM content/IMG_0101 (1).JPG",
    "category": "Crochet"
  },
  {
    "id": 66,
    "title": "Crochet Masterpiece 66",
    "src": "/BYM content/IMG_0101 (2).JPG",
    "category": "Crochet"
  },
  {
    "id": 67,
    "title": "Crochet Masterpiece 67",
    "src": "/BYM content/IMG_0102 (1).JPG",
    "category": "Crochet"
  },
  {
    "id": 68,
    "title": "Crochet Masterpiece 68",
    "src": "/BYM content/IMG_0102 (2).JPG",
    "category": "Crochet"
  },
  {
    "id": 69,
    "title": "Crochet Masterpiece 69",
    "src": "/BYM content/IMG_0103 (2).JPG",
    "category": "Crochet"
  },
  {
    "id": 70,
    "title": "Crochet Masterpiece 70",
    "src": "/BYM content/IMG_0104 (2).JPG",
    "category": "Crochet"
  },
  {
    "id": 71,
    "title": "Crochet Masterpiece 71",
    "src": "/BYM content/IMG_0105 (1).JPG",
    "category": "Crochet"
  },
  {
    "id": 72,
    "title": "Crochet Masterpiece 72",
    "src": "/BYM content/IMG_0106 (1).JPG",
    "category": "Crochet"
  },
  {
    "id": 73,
    "title": "Crochet Masterpiece 73",
    "src": "/BYM content/IMG_0107 (1).JPG",
    "category": "Crochet"
  },
  {
    "id": 74,
    "title": "Crochet Masterpiece 74",
    "src": "/BYM content/IMG_0108 (1).JPG",
    "category": "Crochet"
  },
  {
    "id": 75,
    "title": "Crochet Masterpiece 75",
    "src": "/BYM content/IMG_0109.JPG",
    "category": "Crochet"
  },
  {
    "id": 76,
    "title": "Crochet Masterpiece 76",
    "src": "/BYM content/IMG_0110.JPG",
    "category": "Crochet"
  },
  {
    "id": 77,
    "title": "Crochet Masterpiece 77",
    "src": "/BYM content/IMG_0111.JPG",
    "category": "Crochet"
  },
  {
    "id": 78,
    "title": "Crochet Masterpiece 78",
    "src": "/BYM content/IMG_0112.JPG",
    "category": "Crochet"
  },
  {
    "id": 79,
    "title": "Crochet Masterpiece 79",
    "src": "/BYM content/IMG_0113.JPG",
    "category": "Crochet"
  },
  {
    "id": 80,
    "title": "Crochet Masterpiece 80",
    "src": "/BYM content/IMG_0114.JPG",
    "category": "Crochet"
  },
  {
    "id": 81,
    "title": "Crochet Masterpiece 81",
    "src": "/BYM content/IMG_0115.JPG",
    "category": "Crochet"
  },
  {
    "id": 82,
    "title": "Crochet Masterpiece 82",
    "src": "/BYM content/IMG_0116.JPG",
    "category": "Crochet"
  },
  {
    "id": 83,
    "title": "Crochet Masterpiece 83",
    "src": "/BYM content/IMG_0117.JPG",
    "category": "Crochet"
  },
  {
    "id": 84,
    "title": "Crochet Masterpiece 84",
    "src": "/BYM content/IMG_0118.JPG",
    "category": "Crochet"
  },
  {
    "id": 85,
    "title": "Crochet Masterpiece 85",
    "src": "/BYM content/IMG_0119.JPG",
    "category": "Crochet"
  },
  {
    "id": 86,
    "title": "Crochet Masterpiece 86",
    "src": "/BYM content/IMG_0120.JPG",
    "category": "Crochet"
  },
  {
    "id": 87,
    "title": "Crochet Masterpiece 87",
    "src": "/BYM content/IMG_0121.JPG",
    "category": "Crochet"
  },
  {
    "id": 88,
    "title": "Crochet Masterpiece 88",
    "src": "/BYM content/IMG_0122 (1).JPG",
    "category": "Crochet"
  },
  {
    "id": 89,
    "title": "Crochet Masterpiece 89",
    "src": "/BYM content/IMG_0123 (1).JPG",
    "category": "Crochet"
  },
  {
    "id": 90,
    "title": "Crochet Masterpiece 90",
    "src": "/BYM content/IMG_0124 (1).JPG",
    "category": "Crochet"
  },
  {
    "id": 91,
    "title": "Crochet Masterpiece 91",
    "src": "/BYM content/IMG_0125 (1).JPG",
    "category": "Crochet"
  },
  {
    "id": 92,
    "title": "Crochet Masterpiece 92",
    "src": "/BYM content/IMG_0126 (1).JPG",
    "category": "Crochet"
  },
  {
    "id": 93,
    "title": "Crochet Masterpiece 93",
    "src": "/BYM content/IMG_0127.JPG",
    "category": "Crochet"
  },
  {
    "id": 94,
    "title": "Crochet Masterpiece 94",
    "src": "/BYM content/IMG_0128 (1).JPG",
    "category": "Crochet"
  },
  {
    "id": 95,
    "title": "Crochet Masterpiece 95",
    "src": "/BYM content/IMG_0129.JPG",
    "category": "Crochet"
  },
  {
    "id": 96,
    "title": "Crochet Masterpiece 96",
    "src": "/BYM content/IMG_0130.JPG",
    "category": "Crochet"
  },
  {
    "id": 97,
    "title": "Crochet Masterpiece 97",
    "src": "/BYM content/IMG_0131 (1).JPG",
    "category": "Crochet"
  },
  {
    "id": 98,
    "title": "Crochet Masterpiece 98",
    "src": "/BYM content/IMG_0132 (1).JPG",
    "category": "Crochet"
  },
  {
    "id": 99,
    "title": "Crochet Masterpiece 99",
    "src": "/BYM content/IMG_0133 (1).JPG",
    "category": "Crochet"
  },
  {
    "id": 100,
    "title": "Crochet Masterpiece 100",
    "src": "/BYM content/IMG_0134 (1).JPG",
    "category": "Crochet"
  },
  {
    "id": 101,
    "title": "Crochet Masterpiece 101",
    "src": "/BYM content/IMG_0135 (1).JPG",
    "category": "Crochet"
  },
  {
    "id": 102,
    "title": "Crochet Masterpiece 102",
    "src": "/BYM content/IMG_0136 (1).JPG",
    "category": "Crochet"
  },
  {
    "id": 103,
    "title": "Crochet Masterpiece 103",
    "src": "/BYM content/IMG_0137 (1).JPG",
    "category": "Crochet"
  },
  {
    "id": 104,
    "title": "Crochet Masterpiece 104",
    "src": "/BYM content/IMG_0138 (1).JPG",
    "category": "Crochet"
  },
  {
    "id": 105,
    "title": "Crochet Masterpiece 105",
    "src": "/BYM content/IMG_0139.JPG",
    "category": "Crochet"
  },
  {
    "id": 106,
    "title": "Crochet Masterpiece 106",
    "src": "/BYM content/IMG_0140 (1).JPG",
    "category": "Crochet"
  },
  {
    "id": 107,
    "title": "Crochet Masterpiece 107",
    "src": "/BYM content/IMG_0141 (1).JPG",
    "category": "Crochet"
  },
  {
    "id": 108,
    "title": "Crochet Masterpiece 108",
    "src": "/BYM content/IMG_0142 (1).JPG",
    "category": "Crochet"
  },
  {
    "id": 109,
    "title": "Crochet Masterpiece 109",
    "src": "/BYM content/IMG_0143.JPG",
    "category": "Crochet"
  },
  {
    "id": 110,
    "title": "Crochet Masterpiece 110",
    "src": "/BYM content/IMG_0144 (1).JPG",
    "category": "Crochet"
  },
  {
    "id": 111,
    "title": "Crochet Masterpiece 111",
    "src": "/BYM content/IMG_0145.JPG",
    "category": "Crochet"
  },
  {
    "id": 112,
    "title": "Crochet Masterpiece 112",
    "src": "/BYM content/IMG_0146.JPG",
    "category": "Crochet"
  },
  {
    "id": 113,
    "title": "Crochet Masterpiece 113",
    "src": "/BYM content/IMG_0147.JPG",
    "category": "Crochet"
  },
  {
    "id": 114,
    "title": "Crochet Masterpiece 114",
    "src": "/BYM content/IMG_0148.JPG",
    "category": "Crochet"
  },
  {
    "id": 115,
    "title": "Crochet Masterpiece 115",
    "src": "/BYM content/IMG_0149.JPG",
    "category": "Crochet"
  },
  {
    "id": 116,
    "title": "Crochet Masterpiece 116",
    "src": "/BYM content/IMG_0150.JPG",
    "category": "Crochet"
  },
  {
    "id": 117,
    "title": "Crochet Masterpiece 117",
    "src": "/BYM content/IMG_0151.JPG",
    "category": "Crochet"
  },
  {
    "id": 118,
    "title": "Crochet Masterpiece 118",
    "src": "/BYM content/IMG_20240203_075253.jpg",
    "category": "Crochet"
  },
  {
    "id": 119,
    "title": "Crochet Masterpiece 119",
    "src": "/BYM content/IMG_20240203_075348.jpg",
    "category": "Crochet"
  },
  {
    "id": 120,
    "title": "Crochet Masterpiece 120",
    "src": "/BYM content/IMG_20240331_202225-COLLAGE.jpg",
    "category": "Crochet"
  },
  {
    "id": 121,
    "title": "Crochet Masterpiece 121",
    "src": "/BYM content/IMG_20240331_203515-COLLAGE.jpg",
    "category": "Crochet"
  },
  {
    "id": 122,
    "title": "Crochet Masterpiece 122",
    "src": "/BYM content/IMG_20251216_121743.jpg",
    "category": "Crochet"
  },
  {
    "id": 123,
    "title": "Crochet Masterpiece 123",
    "src": "/BYM content/IMG_20251216_121756_1.jpg",
    "category": "Crochet"
  },
  {
    "id": 124,
    "title": "Crochet Masterpiece 124",
    "src": "/BYM content/IMG_20251216_121813_1.jpg",
    "category": "Crochet"
  },
  {
    "id": 125,
    "title": "Crochet Masterpiece 125",
    "src": "/BYM content/IMG_20260304_220122_544.webp",
    "category": "Crochet"
  },
  {
    "id": 126,
    "title": "Crochet Masterpiece 126",
    "src": "/BYM content/IMG_20260606_214833.jpg",
    "category": "Crochet"
  },
  {
    "id": 127,
    "title": "Crochet Masterpiece 127",
    "src": "/BYM content/IMG_20260606_214856.jpg",
    "category": "Crochet"
  },
  {
    "id": 128,
    "title": "Crochet Masterpiece 128",
    "src": "/BYM content/IMG_20260606_221405.jpg",
    "category": "Crochet"
  },
  {
    "id": 129,
    "title": "Crochet Masterpiece 129",
    "src": "/BYM content/IMG_20260606_221408_1.jpg",
    "category": "Crochet"
  },
  {
    "id": 130,
    "title": "Crochet Masterpiece 130",
    "src": "/BYM content/IMG_20260606_221422.jpg",
    "category": "Crochet"
  },
  {
    "id": 131,
    "title": "Crochet Masterpiece 131",
    "src": "/BYM content/IMG_20260606_221542_1.jpg",
    "category": "Crochet"
  },
  {
    "id": 132,
    "title": "Crochet Masterpiece 132",
    "src": "/BYM content/IMG_20260606_221557_1.jpg",
    "category": "Crochet"
  },
  {
    "id": 133,
    "title": "Crochet Masterpiece 133",
    "src": "/BYM content/IMG_20260606_221737.jpg",
    "category": "Crochet"
  },
  {
    "id": 134,
    "title": "Crochet Masterpiece 134",
    "src": "/BYM content/IMG_20260606_221751.jpg",
    "category": "Crochet"
  },
  {
    "id": 135,
    "title": "Crochet Masterpiece 135",
    "src": "/BYM content/IMG_20260715_182214.jpg",
    "category": "Crochet"
  },
  {
    "id": 136,
    "title": "Crochet Masterpiece 136",
    "src": "/BYM content/IMG_20260715_182215_1.jpg",
    "category": "Crochet"
  },
  {
    "id": 137,
    "title": "Crochet Masterpiece 137",
    "src": "/BYM content/IMG_20260715_182218_1.jpg",
    "category": "Crochet"
  },
  {
    "id": 138,
    "title": "Crochet Masterpiece 138",
    "src": "/BYM content/IMG_20260715_182220_1.jpg",
    "category": "Crochet"
  },
  {
    "id": 139,
    "title": "Crochet Masterpiece 139",
    "src": "/BYM content/IMG_20260715_182222.jpg",
    "category": "Crochet"
  },
  {
    "id": 140,
    "title": "Crochet Masterpiece 140",
    "src": "/BYM content/IMG_20260715_182224_1.jpg",
    "category": "Crochet"
  },
  {
    "id": 141,
    "title": "Crochet Masterpiece 141",
    "src": "/BYM content/Snapchat-1064872395.jpg",
    "category": "Crochet"
  },
  {
    "id": 142,
    "title": "Crochet Masterpiece 142",
    "src": "/BYM content/Snapchat-1161645025.jpg",
    "category": "Crochet"
  },
  {
    "id": 143,
    "title": "Crochet Masterpiece 143",
    "src": "/BYM content/Snapchat-1253249394.jpg",
    "category": "Crochet"
  },
  {
    "id": 144,
    "title": "Crochet Masterpiece 144",
    "src": "/BYM content/Snapchat-430386885.jpg",
    "category": "Crochet"
  },
  {
    "id": 145,
    "title": "Crochet Masterpiece 145",
    "src": "/BYM content/Snapchat-456221881.jpg",
    "category": "Crochet"
  },
  {
    "id": 146,
    "title": "Crochet Masterpiece 146",
    "src": "/BYM content/Snapchat-489464855.jpg",
    "category": "Crochet"
  },
  {
    "id": 147,
    "title": "Crochet Masterpiece 147",
    "src": "/BYM content/Snapchat-689037626.jpg",
    "category": "Crochet"
  },
  {
    "id": 148,
    "title": "Crochet Masterpiece 148",
    "src": "/BYM content/Snapchat-702538183.jpg",
    "category": "Crochet"
  },
  {
    "id": 149,
    "title": "Crochet Masterpiece 149",
    "src": "/BYM content/Snapchat-955630166.jpg",
    "category": "Crochet"
  },
  {
    "id": 150,
    "title": "Crochet Masterpiece 150",
    "src": "/BYM content/Snapchat-965249699.jpg",
    "category": "Crochet"
  }
] },
  { id: '3', pillar: 'webdesign', title: 'BMZtrial1', imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop', projectUrl: 'https://github.com/BYM1127/BMZtrial1', emoji: '🌸', tags: ['business', 'github'] },
  { id: 'c1', pillar: 'crochet', title: 'Crochet Work', imageUrl: '/crochet/IMG_20240311_082604_436.jpg', emoji: '🧶', tags: ['crochet', 'handmade'] },
  { id: 'c2', pillar: 'crochet', title: 'Crochet Work', imageUrl: '/crochet/IMG_20240311_082604_490.jpg', emoji: '🧶', tags: ['crochet', 'handmade'] },
  { id: '5', pillar: 'photography', title: 'Family at Sunset', imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=600&auto=format&fit=crop', emoji: '👨‍👩‍👧', tags: ['family', 'outdoor'] },
  { id: '6', pillar: 'webdesign', title: 'DkLC - Catering', imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=600&auto=format&fit=crop', projectUrl: 'https://github.com/BYM1127/DkLC', emoji: '🍲', tags: ['catering', 'github'] },
  { id: 'c3', pillar: 'crochet', title: 'Crochet Work', imageUrl: '/crochet/IMG_20240322_203625_217.webp', emoji: '🧶', tags: ['crochet', 'handmade'] },
  { id: 'c4', pillar: 'crochet', title: 'Crochet Work', imageUrl: '/crochet/IMG_20240327_184936_893.jpg', emoji: '🧶', tags: ['crochet', 'handmade'] },
  { id: '8', pillar: 'photography', title: 'Maternity Glow Session', imageUrl: 'https://images.unsplash.com/photo-1519064438302-7634f1b40d6c?q=80&w=600&auto=format&fit=crop', emoji: '🤰', tags: ['maternity', 'studio'] },
  { id: '9', pillar: 'webdesign', title: 'IMELA-PROJECTS', imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600&auto=format&fit=crop', projectUrl: 'https://github.com/BYM1127/IMELA-PROJECTS', emoji: '💡', tags: ['electrical', 'solar'] },
  { id: 'c5', pillar: 'crochet', title: 'Crochet Work', imageUrl: '/crochet/IMG_20240327_184936_929.jpg', emoji: '🧶', tags: ['crochet', 'handmade'] },
  { id: 'c6', pillar: 'crochet', title: 'Crochet Work', imageUrl: '/crochet/IMG_20240331_140012_639.jpg', emoji: '🧶', tags: ['crochet', 'handmade'] },
  { id: 'c7', pillar: 'crochet', title: 'Crochet Work', imageUrl: '/crochet/IMG_20240331_140012_664.jpg', emoji: '🧶', tags: ['crochet', 'handmade'] },
  { id: '11', pillar: 'photography', title: 'Event Coverage', imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop', emoji: '🎉', tags: ['events', 'coverage'] },
  { id: '13', pillar: 'photography', title: 'Creative Studio Headshot', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop', emoji: '📷', tags: ['headshot', 'studio'] },
  { id: 'c8', pillar: 'crochet', title: 'Crochet Work', imageUrl: '/crochet/IMG_20260715_182215_1.jpg', emoji: '🧶', tags: ['crochet', 'handmade'] },
  { id: 'c9', pillar: 'crochet', title: 'Crochet Work', imageUrl: '/crochet/IMG_20260715_182218_1.jpg', emoji: '🧶', tags: ['crochet', 'handmade'] },
  { id: 'c10', pillar: 'crochet', title: 'Crochet Work', imageUrl: '/crochet/IMG_20260715_182220_1.jpg', emoji: '🧶', tags: ['crochet', 'handmade'] },
  { id: '15', pillar: 'photography', title: 'Urban Lifestyle Shoot', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop', emoji: '🌆', tags: ['lifestyle', 'urban'] },
  { id: 'c11', pillar: 'crochet', title: 'Crochet Work', imageUrl: '/crochet/IMG_20260715_182222.jpg', emoji: '🧶', tags: ['crochet', 'handmade'] },
  { id: 'c12', pillar: 'crochet', title: 'Crochet Work', imageUrl: '/crochet/IMG_20260715_182224_1.jpg', emoji: '🧶', tags: ['crochet', 'handmade'] },
  { id: 'c13', pillar: 'crochet', title: 'Crochet Work', imageUrl: '/crochet/IMG_3932.JPG', emoji: '🧶', tags: ['crochet', 'handmade'] },
  { id: 'c14', pillar: 'crochet', title: 'Crochet Work', imageUrl: '/crochet/IMG_3933.JPG', emoji: '🧶', tags: ['crochet', 'handmade'] },
  { id: 'c15', pillar: 'crochet', title: 'Crochet Work', imageUrl: '/crochet/IMG_3934.JPG', emoji: '🧶', tags: ['crochet', 'handmade'] },
  { id: 'c16', pillar: 'crochet', title: 'Crochet Work', imageUrl: '/crochet/IMG_3935.JPG', emoji: '🧶', tags: ['crochet', 'handmade'] },
]

const FILTER_OPTIONS: { value: Filter; label: string; icon: React.ReactNode; color: string }[] = [
  { value: 'all',         label: 'All Work',    icon: <ImageIcon size={14} />,  color: 'var(--color-gold)' },
  { value: 'crochet',     label: 'Crochet',     icon: <Scissors size={14} />,   color: 'var(--color-crochet)' },
  { value: 'photography', label: 'Photography', icon: <Camera size={14} />,     color: 'var(--color-photography)' },
  { value: 'webdesign',   label: 'Web Design',  icon: <Monitor size={14} />,    color: 'var(--color-webdesign)' },
]

const PILLAR_COLOR: Record<string, string> = {
  crochet:     'var(--color-crochet)',
  photography: 'var(--color-photography)',
  webdesign:   'var(--color-webdesign)',
}
const PILLAR_DIM: Record<string, string> = {
  crochet:     'var(--color-crochet-dim)',
  photography: 'var(--color-photography-dim)',
  webdesign:   'var(--color-webdesign-dim)',
}
const PILLAR_LABEL: Record<string, string> = {
  crochet:     'Crochet',
  photography: 'Photography',
  webdesign:   'Web Design',
}

export default function GalleryPage() {
  const [filter, setFilter] = useState<Filter>('all')

  const filtered = filter === 'all' ? ITEMS : ITEMS.filter((i) => i.pillar === filter)

  return (
    <>
      {/* Header */}
      <section style={{ paddingTop: '8rem', paddingBottom: '3rem', paddingLeft: '1.5rem', paddingRight: '1.5rem', background: 'var(--color-bg-secondary)', borderBottom: '1px solid var(--color-border)', textAlign: 'center' }}>
        <div className="container">
          <span className="badge badge-gold" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            <ImageIcon size={11} style={{ marginRight: '0.35rem' }} /> Portfolio Gallery
          </span>
          <h1 className="font-serif" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '0.75rem' }}>
            Our Creative Work
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: 480, margin: '0 auto' }}>
            A look at crochet pieces, photography sessions, and website projects from BYM Studio.
          </p>
        </div>
      </section>

      {/* Filter tabs */}
      <div style={{ background: 'var(--color-bg-secondary)', padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)', position: 'sticky', top: '4.5rem', zIndex: 50, backdropFilter: 'blur(16px)' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {FILTER_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFilter(opt.value)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.5rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  border: '1px solid',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  borderColor: filter === opt.value ? opt.color : 'var(--color-border)',
                  background: filter === opt.value ? `${opt.color}18` : 'transparent',
                  color: filter === opt.value ? opt.color : 'var(--color-text-secondary)',
                }}
              >
                {opt.icon} {opt.label}
                <span style={{ marginLeft: '0.25rem', fontSize: '0.75rem', opacity: 0.7 }}>
                  ({opt.value === 'all' ? ITEMS.length : ITEMS.filter((i) => i.pillar === opt.value).length})
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery grid */}
      <section style={{ padding: '2.5rem 1.5rem 5rem' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))',
              gap: '1.25rem',
            }}
          >
            {filtered.map((item, i) => (
              <div
                key={item.id}
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  aspectRatio: i % 5 === 0 ? '4/5' : '1',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = `0 12px 40px ${PILLAR_DIM[item.pillar]}`
                  e.currentTarget.style.borderColor = `${PILLAR_COLOR[item.pillar]}44`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = ''
                  e.currentTarget.style.boxShadow = ''
                  e.currentTarget.style.borderColor = 'var(--color-border)'
                }}
              >
                {/* Image placeholder */}
                <div
                  style={{
                    flex: 1,
                    background: `linear-gradient(135deg, ${PILLAR_DIM[item.pillar]}, rgba(255,255,255,0.01))`,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {item.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '3.5rem' }}>{item.emoji}</div>
                  )}
                  {item.projectUrl && (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', opacity: 0, transition: 'opacity 0.2s', cursor: 'pointer' }}
                         onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                         onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                         onClick={(e) => { e.stopPropagation(); window.open(item.projectUrl, '_blank') }}
                    >
                      <span className="btn btn-web btn-sm">View on GitHub</span>
                    </div>
                  )}
                </div>

                {/* Caption */}
                <div style={{ padding: '0.85rem 1rem', borderTop: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.82rem', color: 'var(--color-text-primary)' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '0.1rem' }}>
                      {item.tags.join(' · ')}
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: PILLAR_COLOR[item.pillar],
                      background: PILLAR_DIM[item.pillar],
                      padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-full)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {PILLAR_LABEL[item.pillar]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
