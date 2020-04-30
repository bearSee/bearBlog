const color = window.localStorage.getItem('theme-color') || 'rgba(210, 190, 82, 1)';
const currentBackground = window.localStorage.getItem('current-background');

export default {
  color,
  predefineColors: [
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
    'rgba(255, 69, 0, 0.68)',
    'rgb(255, 120, 0)',
    'hsv(51, 100, 98)',
    'hsva(120, 40, 94, 0.5)',
    'hsl(181, 100%, 37%)',
    'hsla(209, 100%, 56%, 0.73)',
  ],
  backgroundList: [
    {
      url: 'study-bg.jpg',
      name: '数学',
    },
    {
      url: 'catcher.jpg',
      name: '麦田',
    },
    {
      url: 'light-house.jpg',
      name: '灯塔',
    },
    {
      url: 'fall-maple-leaves.jpg',
      name: '落枫',
    },
    {
      url: 'catcher-circle-A.jpg',
      name: '麦圈A',
    },
    {
      url: 'catcher-circle-B.jpg',
      name: '麦圈B',
    },
    {
      url: 'catcher-grain.jpg',
      name: '麦穗',
    },
  ],
  currentBackground,
};