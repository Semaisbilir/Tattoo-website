import InfiniteMenu from './InfiniteMenu'

const items = [
  {
    image: 'https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996355/tattoo_test_vqghv7.webp',
    link: 'https://google.com/',
    title: 'Item 1',
    description: 'This is pretty cool, right?'
  },
  {
    image: 'https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996354/tattoo_test_image_qkrrxl.jpg',
    link: 'https://google.com/',
    title: 'Item 2',
    description: 'This is pretty cool, right?'
  },
  {
    image: 'https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996352/tattoo_test_2_gt8tpt.jpg',
    link: 'https://google.com/',
    title: 'Item 3',
    description: 'This is pretty cool, right?'
  },
  {
    image: 'https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996349/native_test_cye5vw.jpg',
    link: 'https://google.com/',
    title: 'Item 4',
    description: 'This is pretty cool, right?'
  },
  {
    image: 'https://res.cloudinary.com/dnkzcvqxc/image/upload/v1753996347/flowers_test_krfgjr.webp',
    link: 'https://google.com/',
    title: 'Item 5',
    description: 'This is pretty cool, right?'
  }
];

<div style={{ height: '600px', position: 'relative' }}>
  <InfiniteMenu items={items}/>
</div>