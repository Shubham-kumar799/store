//components
import { Carousel } from 'react-responsive-carousel';

//icons

//types
import { FC } from 'react';

//utils
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ProductImage } from '@appTypes/products';

interface Props {
  images: ProductImage[];
}

const ProductSlider: FC<Props> = ({ images }) => {
  return (
    <Carousel
      showStatus={false}
      autoPlay
      infiniteLoop
      showArrows={false}
      renderThumbs={() => {
        const thumblist = images.map(i => (
          <img
            key={i.public_id}
            style={{
              height: '80px',
              width: '80px',
              objectFit: 'contain',
            }}
            src={i.url}
            id={i.public_id}
          />
        ));

        return thumblist;
      }}
    >
      {images.map(i => (
        <img
          style={{
            height: '600px',
            objectFit: 'cover',
          }}
          key={i.public_id}
          id={i.public_id}
          src={i.url}
        />
      ))}
    </Carousel>
  );
};

export default ProductSlider;
