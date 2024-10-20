import normal_burrata from '../../files/normal_burrata.gif';
import double_cheese from '../../files/double_cheese.gif';
import moldy_cheese from '../../files/moldy_cheese.gif';
import ramsay from '../../files/ramsay.gif';
import melt1 from '../../files/melt1.gif';
import melt2 from '../../files/melt2.gif';

const prizes: any = [
  {
    image: normal_burrata,
    text: 'Normal Cheese',
  },
  {
    image: double_cheese,
    text: 'Double Cheese',
  },
  {
    image: moldy_cheese,
    text: 'Moldy Cheese',
  },
  {
    image: ramsay,
    text: 'Ooops, Burnt Cheese',
  },
  {
    image: melt1,
    text: 'Cheese Meltdown 3 days',
  },
  {
    image: melt2,
    text: 'Cheese Meltdown 7 days',
  },
];

const generateId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).substring(2)}`;

export const prizeList: any = [
  ...prizes,
  ...prizes.reverse(),
  ...prizes.reverse(),
  ...prizes,
  ...prizes,
  ...prizes,
].map((prize) => ({
  ...prize,
  id: generateId(),
}));
