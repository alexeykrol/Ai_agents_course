import img1 from '/src/assets/images/products/s4.jpg';
import img2 from '/src/assets/images/products/s5.jpg';
import img3 from '/src/assets/images/products/s7.jpg';
import img4 from '/src/assets/images/products/s11.jpg';
import { Button, Rating, RatingStar } from 'flowbite-react';

import { Link } from 'react-router';
import CardBox from '../shared/CardBox';
import { IconBasket } from '@tabler/icons-react';

const ecoCard = [
  {
    title: 'Boat Headphone',
    subheader: 'September 14, 2023',
    photo: img1,
    salesPrice: 375,
    price: 285,
    rating: 4,
  },
  {
    title: 'MacBook Air Pro',
    subheader: 'September 14, 2023',
    photo: img2,
    salesPrice: 650,
    price: 900,
    rating: 5,
  },
  {
    title: 'Red Valvet Dress',
    subheader: 'September 14, 2023',
    photo: img3,
    salesPrice: 150,
    price: 200,
    rating: 3,
  },
  {
    title: 'Cute Soft Teddybear',
    subheader: 'September 14, 2023',
    photo: img4,
    salesPrice: 285,
    price: 345,
    rating: 2,
  },
];

const ProductCards = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        {ecoCard.map((item, i) => (
          <div className="lg:col-span-3 md:col-span-6 col-span-12" key={i}>
            <CardBox className="p-0 overflow-hidden group card-hover">
              <div className="relative">
                <Link to="#">
                  <div className="overflow-hidden h-[280px] w-full">
                    <img
                      src={item.photo}
                      alt="Spike"
                      height={280}
                      width={500}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
                <div className="p-6 pt-4">
                  <div className="flex justify-between items-center -mt-8 ">
                    <div className="ms-auto">
                      <Button
                        color={'primary'}
                        className="btn-circle ms-auto p-0 w-8 h-8 rounded-full!"
                      >
                        <IconBasket size={18} />
                      </Button>
                    </div>
                  </div>
                  <h6 className="text-base line-clamp-1 group-hover:text-primary">{item.title}</h6>
                  <div className="flex justify-between items-center mt-1">
                    <h5 className="text-base flex gap-2 items-center">
                      ${item.price}{' '}
                      <span className="font-normal text-sm text-dark/50 line-through">
                        ${item.salesPrice}
                      </span>
                    </h5>
                    {item.rating == 5 ? (
                      <Rating size={'sm'}>
                        <RatingStar />
                        <RatingStar />
                        <RatingStar />
                        <RatingStar />
                        <RatingStar />
                      </Rating>
                    ) : item.rating == 4 ? (
                      <Rating size={'sm'}>
                        <RatingStar />
                        <RatingStar />
                        <RatingStar />
                        <RatingStar />
                        <RatingStar filled={false} />
                      </Rating>
                    ) : (
                      <Rating size={'sm'}>
                        <RatingStar />
                        <RatingStar />
                        <RatingStar />
                        <RatingStar filled={false} />
                        <RatingStar filled={false} />
                      </Rating>
                    )}
                  </div>
                </div>
              </div>
            </CardBox>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductCards;
