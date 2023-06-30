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
      class: 'blanket',
      child: [
        { selector: 'slates', img: slates, target: true },
        { selector: 'slates', img: slates, target: true },
      ],
    },
  ],
  [
    {
      selector: 'div',
      img: blanket,
      class: 'blanket',
      child: [
        { selector: 'slates', img: slates },
        { selector: 'ring', img: ring },
        { selector: 'ring', img: ringRopes, id: 'ropes', target: true },
      ],
    },
  ],
  [
    {
      selector: 'div',
      img: blanket,
      class: 'blanket',
      child: [
        { selector: 'slates', img: slates },
        {
          selector: 'plate',
          img: plate,
          child: [{ selector: 'strawberry', img: strawberry, target: true }],
        },
        { selector: 'strawberry', img: strawberry },
      ],
    },
  ],
  [
    {
      selector: 'div',
      img: blanket,
      class: 'blanket',
      child: [
        {
          selector: 'ring',
          img: ring,
          child: [{ selector: 'star', img: star }],
        },
        {
          selector: 'ring',
          img: ringRopes,
          id: 'ropes',
          child: [{ selector: 'star', img: star, target: true }],
        },
        {
          selector: 'plate',
          img: plate,
          child: [{ selector: 'strawberry', img: strawberry }],
        },
      ],
    },
  ],
  [
    {
      selector: 'div',
      img: blanket,
      class: 'blanket',
      child: [
        { selector: 'glasses', img: glasses },
        {
          selector: 'glasses',
          img: glassesHearts,
          id: 'hearts',
          target: true,
        },
        {
          selector: 'book',
          img: book,
          child: [
            {
              selector: 'glasses',
              img: glassesHearts,
              id: 'hearts',
              target: true,
            },
          ],
        },
        { selector: 'book', img: book },
      ],
    },
  ],
];

export { LevelsList };
