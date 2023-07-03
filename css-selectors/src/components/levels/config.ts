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
import hat from '../../assets/img/hat.svg';
import mask from '../../assets/img/mask.svg';
import watermelon from '../../assets/img/watermelon.svg';
import avocado from '../../assets/img/avocado.svg';
import bookClosed from '../../assets/img/book_closed.svg';
import shell from '../../assets/img/shell.svg';
import flippers from '../../assets/img/flippers.svg';

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
  [
    {
      selector: 'div',
      img: blanket,
      nesting: 0,
      class: 'blanket',
      child: [
        { selector: 'slates', img: slates, nesting: 1, target: true },
        { selector: 'hat', img: hat, nesting: 1, target: true },
        { selector: 'mask', img: mask, nesting: 1, target: true },
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
          selector: 'plate',
          img: plate,
          nesting: 1,
          child: [
            {
              selector: 'watermelon',
              img: watermelon,
              nesting: 2,
              class: 'fruit',
            },
          ],
        },
        {
          selector: 'plate',
          img: plate,
          nesting: 1,
          child: [
            {
              selector: 'strawberry',
              img: strawberry,
              nesting: 2,
              class: 'fruit',
              attribute: 'butBerry',
              target: true,
            },
          ],
        },
        {
          selector: 'plate',
          img: plate,
          nesting: 1,
          child: [
            {
              selector: 'avocado',
              img: avocado,
              nesting: 2,
              class: 'fruit',
            },
          ],
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
        { selector: 'slates', img: slates, nesting: 1, target: true },
        { selector: 'mask', img: mask, nesting: 1 },
        { selector: 'hat', img: hat, nesting: 1, target: true },
        { selector: 'glasses', img: glasses, nesting: 1, target: true },
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
          selector: 'book',
          img: book,
          nesting: 1,
          target: true,
        },
        { selector: 'book', img: bookClosed, nesting: 1, class: 'closed' },
        {
          selector: 'book',
          img: book,
          nesting: 1,
          target: true,
        },
        { selector: 'book', img: bookClosed, nesting: 1, class: 'closed' },
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
          selector: 'book',
          img: bookClosed,
          nesting: 1,
          class: 'closed',
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
        {
          selector: 'book',
          img: book,
          nesting: 1
        },
        {
          selector: 'book',
          img: bookClosed,
          nesting: 1,
          class: 'closed',
          child: [
            {
              selector: 'glasses',
              img: glasses,
              nesting: 2,
              target: true,
            },
          ],
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
        { selector: 'shell', img: shell, nesting: 1 },
        { selector: 'flippers', img: flippers, nesting: 1, target: true },
        { selector: 'flippers', img: flippers, nesting: 1 },
        { selector: 'ring', img: ring, nesting: 1 },
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
        { selector: 'book', img: bookClosed, nesting: 1, class: 'closed' },
        { selector: 'glasses', img: glasses, nesting: 1, target: true },
        { selector: 'glasses', img: glasses, nesting: 1, target: true },
        { selector: 'star', img: star, nesting: 1 },
        { selector: 'glasses', img: glasses, nesting: 1 },
      ],
    },
  ],
];

export { LevelsList };
