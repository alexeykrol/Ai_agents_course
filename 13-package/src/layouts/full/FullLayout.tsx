import { FC } from 'react';
import { Outlet } from 'react-router';

import Sidebar from './sidebar/Sidebar';
import Header from './header/Header';
import Topbar from './header/Topbar';

const FullLayout: FC = () => {
  return (
    <>
      
        <Topbar />
        <div className="flex w-full ">
          <div className="page-wrapper flex w-full">
            {/* Header/sidebar */}
            <Sidebar />
            <div className="container flex flex-col w-full pt-6">
              {/* Top Header  */}
              <Header />

              <div className={`h-full`}>
                {/* Body Content  */}
                <div className={`w-full`}>
                  <div className="container px-0 py-6">
                    <Outlet />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      
    </>
  );
};

export default FullLayout;
