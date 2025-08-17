import { Card } from 'flowbite-react';
import React from 'react';

interface MyAppProps {
  children: React.ReactNode;
  className?: string;
}
const CardBox: React.FC<MyAppProps> = ({ children, className }) => {
  return <Card className={`card p-6 shadow-md border-0  ${className} `}>{children}</Card>;
};
export default CardBox;
