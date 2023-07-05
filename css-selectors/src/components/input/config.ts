const RightAnswersList: string[][] = [
  ['slates', 'div slates', '.blanket slates', 'div.blanket slates', '*'],
  ['#ropes', 'ring #ropes', '[id=ropes]'],
  ['.hearts', 'glasses.hearts'],
  [
    '*',
    'slates, mask, hat',
    'slates, hat, mask',
    'hat, slates, mask',
    'hat, mask, slates',
    'mask, slates, hat',
    'mask, hat, slates',
  ],
  [
    '[attr="butBerry"]',
    '.fruit [attr="butBerry"]',
    'strawberry [attr="butBerry"]',
    'strawberry.fruit [attr="butBerry"]',
  ],
  [
    'slates, hat, glasses',
    'slates, glasses, hat',
    'hat, glasses, slates',
    'hat, slates, glasses',
    'glasses, hat, slates',
    'glasses, slates, hat',
  ],
  ['book.closed', '.closed'],
  ['book glasses', 'book.closed glasses', '.closed glasses'],
  ['shell+flippers', 'shell + flippers'],
  [
    'book~glasses',
    'book ~ glasses',
    '.closed~glasses',
    '.closed ~ glasses',
    'book.closed~glasses',
    'book.closed ~ glasses',
  ],
];

export { RightAnswersList };
