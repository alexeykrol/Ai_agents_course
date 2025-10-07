import React from 'react';
import { ChildItem } from '../Sidebaritems';
import { SidebarItem } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { Link, useLocation } from 'react-router';

interface NavItemsProps {
  item: ChildItem;
}
const Dropitems: React.FC<NavItemsProps> = ({ item }) => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <>
    <Link to={item.url} target={item.isPro ? 'blank' : '_self'}>
      <SidebarItem
        
        className={`realtive max-h-10 relative  py-2 ps-6 pe-4 ${
          item.url == pathname
            ? `text-primary  ${
                item.icon ? ` bg-primary/10   hover:bg-primary/10 ` : 'bg-transparent '
              }   active `
            : ` text-dark/80 bg-transparent  group/link  `
        } `}
      >
        <div className="flex items-center justify-between">
          <span className="flex gap-3 align-center items-center">
            {item.icon ? (
              <Icon icon={item.icon} className={`${item.color}`} height={22} />
            ) : (
              <span
                className={`ms-2 me-2 ${
                  item.url == pathname
                    ? 'rounded-full mx-1.5 group-hover/link:bg-dark bg-dark dark:bg-white  h-[6px] w-[6px]'
                    : 'h-[6px] w-[6px] bg-black/40  rounded-full  group-hover/link:bg-dark '
                } `}
              ></span>
            )}
            <span className={`max-w-32 text-ellipsis overflow-x-hidden`}>{item.name}</span>
          </span>
          {item.isPro ? (
            <span className="py-1 px-2 text-[10px] bg-secondary/20 text-secondary rounded-full">
              Pro
            </span>
          ) : null}
        </div>
      </SidebarItem>
      </Link>
    </>
  );
};

export default Dropitems;
