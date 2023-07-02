import { Level } from '../../types/index';
import blanket from '../../assets/img/blanket.svg';
import slates from '../../assets/img/slates.svg';
import ring from '../../assets/img/ring.svg';
import ringRopes from '../../assets/img/ring_ropes.svg';
import plate from '../../assets/img/plate.svg';
import strawberry from '../../assets/img/strawberry.svg';
import star from '../../assets/img/star.svg';
import glasses from '../../assets/img/glasses.svg';
import glassesHearts from '../../assets/img/glasses_hearts.svg';
import book from '../../assets/img/book.svg';

const LevelsList: Level[][] = [
  [
    {
      selector: 'div',
      img: blanket,
      nesting: 0,
      class: 'blanket',
      child: [
        { selector: 'slates', img: slates, nesting: 1, target: true },
        { selector: 'slates', img: slates, nesting: 1, target: true },
      ],
    },
  ],
  [
    {
      selector: 'div',
      img: blanket,
      nesting: 0,
      class: 'blanket',
      child: [
        { selector: 'slates', img: slates, nesting: 1 },
        { selector: 'ring', img: ring, nesting: 1 },
        {
          selector: 'ring',
          img: ringRopes,
          nesting: 1,
          id: 'ropes',
          target: true,
        },
      ],
    },
  ],
  [
    {
      selector: 'div',
      img: blanket,
      nesting: 0,
      class: 'blanket',
      child: [
        { selector: 'slates', img: slates, nesting: 1 },
        {
          selector: 'plate',
          img: plate,
          nesting: 1,
          child: [
            {
              selector: 'strawberry',
              img: strawberry,
              nesting: 2,
              target: true,
            },
          ],
        },
        { selector: 'strawberry', img: strawberry, nesting: 1 },
      ],
    },
  ],
  [
    {
      selector: 'div',
      img: blanket,
      nesting: 0,
      class: 'blanket',
      child: [
        {
          selector: 'ring',
          img: ring,
          nesting: 1,
          child: [{ selector: 'star', img: star, nesting: 2 }],
        },
        {
          selector: 'ring',
          img: ringRopes,
          nesting: 1,
          id: 'ropes',
          child: [{ selector: 'star', img: star, nesting: 2, target: true }],
        },
        {
          selector: 'plate',
          img: plate,
          nesting: 1,
          child: [{ selector: 'strawberry', img: strawberry, nesting: 2 }],
        },
      ],
    },
  ],
  [
    {
      selector: 'div',
      img: blanket,
      nesting: 0,
      class: 'blanket',
      child: [
        { selector: 'glasses', img: glasses, nesting: 1 },
        {
          selector: 'glasses',
          img: glassesHearts,
          nesting: 1,
          class: 'hearts',
          target: true,
        },
        {
          selector: 'book',
          img: book,
          nesting: 1,
          child: [
            {
              selector: 'glasses',
              img: glassesHearts,
              nesting: 2,
              class: 'hearts',
              target: true,
            },
          ],
        },
        { selector: 'book', img: book, nesting: 1 },
      ],
    },
  ],
];

export { LevelsList };
