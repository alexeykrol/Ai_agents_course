import { useState } from 'react';
import { Button, DrawerItems, Navbar } from 'flowbite-react';
import { Icon } from '@iconify/react';
import Profile from './Profile';
import Notification from './notification';
import { Drawer } from 'flowbite-react';
import MobileSidebar from '../sidebar/MobileSidebar';
import { Link } from 'react-router';

const Header = () => {
  // mobile-sidebar
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  return (
    <>
      <header>
        <Navbar fluid className={`rounded-lg bg-white shadow-md  py-4 `}>
          {/* Mobile Toggle Icon */}

          <div className="flex gap-3 items-center justify-between w-full ">
            <div className="flex gap-2 items-center">
              <span
                onClick={() => setIsOpen(true)}
                className="h-10 w-10 flex text-black dark:text-white text-opacity-65 xl:hidden hover:text-primary hover:bg-lightprimary rounded-full justify-center items-center cursor-pointer"
              >
                <Icon icon="solar:hamburger-menu-line-duotone" height={21} />
              </span>
              <Notification />
            </div>

            <div className="flex gap-4 items-center">
              <Button
                as={Link}
                to="https://www.wrappixel.com/templates/spike-react-tailwind-admin-template/?ref=376#demos"
                target="_blank"
               
                color={'primary'}
                className="rounded-full py-1 px-5 font-medium"
              >
                Check Pro Template
              </Button>
              <Profile />
            </div>
          </div>
        </Navbar>
      </header>

      {/* Mobile Sidebar */}
      <Drawer open={isOpen} onClose={handleClose} className='w-64'>
        <DrawerItems>
          <MobileSidebar />
        </DrawerItems>
      </Drawer>
    </>
  );
};

export default Header;
