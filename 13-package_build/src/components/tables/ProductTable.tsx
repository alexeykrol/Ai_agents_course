import {
  Badge,
  Progress,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react';
import { HiOutlineDotsVertical } from 'react-icons/hi';

import { Table } from 'flowbite-react';

import product1 from '/src/assets/images/products/s1.jpg';
import product2 from '/src/assets/images/products/s2.jpg';
import product3 from '/src/assets/images/products/s3.jpg';
import product4 from '/src/assets/images/products/s4.jpg';
import product5 from '/src/assets/images/products/s5.jpg';

const ProductTable = () => {
  const ProductTableData = [
    {
      img: product1,
      name: 'iPhone 13 pro max-Pacific Blue-128GB storage',
      payment: '$180',
      paymentstatus: 'Partially paid',
      process: 45,
      processcolor: 'bg-warning',
      statuscolor: 'secondary',
      statustext: 'Confirmed',
    },
    {
      img: product2,
      name: 'Apple MacBook Pro 13 inch-M1-8/256GB-space',
      payment: '$120',
      paymentstatus: 'Full paid',
      process: 100,
      processcolor: 'bg-success',
      statuscolor: 'success',
      statustext: 'Confirmed',
    },
    {
      img: product3,
      name: 'PlayStation 5 DualSense Wireless Controller',
      payment: '$120',
      paymentstatus: 'Cancelled',
      process: 100,
      processcolor: 'bg-error',
      statuscolor: 'error',
      statustext: 'Cancelled',
    },
    {
      img: product4,
      name: 'Amazon Basics Mesh, Mid-Back, Swivel Office',
      payment: '$120',
      paymentstatus: 'Partially paid',
      process: 45,
      processcolor: 'bg-warning',
      statuscolor: 'secondary',
      statustext: 'Confirmed',
    },
    {
      img: product5,
      name: 'Apple MacBook Air Laptop: Apple M1 chip, 13.3-inch/33.74',
      payment: '$150',
      paymentstatus: 'Partially paid',
      process: 20,
      processcolor: 'bg-warning',
      statuscolor: 'secondary',
      statustext: 'Confirmed',
    },
  ];


  return (
    <>
      <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6  relative w-full break-words">
        <h5 className="card-title">Table</h5>
        <div className="mt-3">
          <div className="overflow-x-auto">
            <Table hoverable>
              <TableHead className="border-b border-gray-300">
                <TableHeadCell className="p-6 text-base">Products</TableHeadCell>
                <TableHeadCell className="text-base">Payment</TableHeadCell>
                <TableHeadCell className="text-base">Status</TableHeadCell>
                <TableHeadCell className="text-base"></TableHeadCell>
              </TableHead>
              <TableBody className="divide-y divide-gray-300">
                {ProductTableData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="whitespace-nowrap ps-6">
                      <div className="flex gap-3 items-center">
                        <img src={item.img} alt="icon" className="h-[60px] w-[60px] rounded-md" />
                        <div className="truncat line-clamp-2 sm:text-wrap max-w-56">
                          <h6 className="text-sm">{item.name}</h6>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <h5 className="text-base text-wrap">
                        {item.payment}
                        <span className="text-dark opacity-70">
                          <span className="mx-1">/</span>499
                        </span>
                      </h5>
                      <div className="text-sm font-medium text-dark opacity-70 mb-2 text-wrap">
                        {item.paymentstatus}
                      </div>
                      <div className="me-5">
                        <Progress
                          progress={item.process}
                          color={`${item.processcolor}`}
                          className={`${item.processcolor}`}
                          size={'sm'}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        color={`light${item.statuscolor}`}
                        className={`border border-${item.statuscolor} text-${item.statuscolor}`}
                      >
                        {item.statustext}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <HiOutlineDotsVertical size={22} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export { ProductTable };
