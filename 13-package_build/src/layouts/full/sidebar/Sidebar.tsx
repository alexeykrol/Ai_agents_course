
import {  Sidebar, SidebarItemGroup, SidebarItems } from "flowbite-react";
import SidebarContent from "./Sidebaritems";
import NavItems from "./NavItems";
import SimpleBar from "simplebar-react";
import React from "react";
import FullLogo from "../shared/logo/FullLogo";
import Upgrade from "./Upgrade";
import NavCollapse from "./NavCollapse";

const SidebarLayout = () => {


  return (
    <>
      <div className="xl:block hidden">
        <Sidebar
          className="fixed menu-sidebar  bg-white dark:bg-darkgray rtl:pe-4 rtl:ps-0 top-[72px]"
          aria-label="Sidebar with multi-level dropdown example"
        >
          <div className="px-5 py-4 flex items-center sidebarlogo">
            <FullLogo />
          </div>
          <SimpleBar className="h-[calc(100vh_-_294px)]">
            <SidebarItems className=" mt-2">
              <SidebarItemGroup
               className="sidebar-nav hide-menu">
                {SidebarContent &&
                  SidebarContent?.map((item, index) => (
                    <div className="caption" key={item.heading}>
                      <React.Fragment key={index}>
                        <h5 className="text-dark/60 uppercase font-medium leading-6 text-xs pb-2 ps-6">
                          {item.heading}
                        </h5>
                        {item.children?.map((child, index) => (
                        <React.Fragment key={child.id && index}>
                          {child.children ? (
                            <div className="collpase-items">
                              <NavCollapse item={child} />
                            </div>
                          ) : (
                            <NavItems item={child} />
                          )}
                        </React.Fragment>
                      ))}
                      </React.Fragment>
                    </div>
                  ))}
              </SidebarItemGroup>
            </SidebarItems>
          </SimpleBar>
          <Upgrade/>
        </Sidebar>
      </div>
    </>
  );
};

export default SidebarLayout;
