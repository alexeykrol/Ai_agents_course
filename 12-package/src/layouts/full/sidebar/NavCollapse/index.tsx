
import  {useState } from "react";
import { ChildItem } from "../Sidebaritems";
import { useLocation } from "react-router";
import React from "react";
import { CustomCollapse } from "../CustomCollapse";
import Dropitems from "../DropItems";

interface NavCollapseProps {
  item: ChildItem;
}



const NavCollapse: React.FC<NavCollapseProps> = ({ item }: any) => {
  const location = useLocation();
  const pathname = location.pathname;

  // Determine if any child matches the current path
  const activeDD = item.children.find((t: { url: string }) => t.url === pathname);
  

  // Manage open/close state for the collapse
  const [isOpen, setIsOpen] = useState<boolean>(!!activeDD);


  // Toggle the collapse
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <CustomCollapse
      label={ `${item.name}`}
      open={isOpen}
      onClick={handleToggle}
      icon={item.icon} 
      isPro={item.isPro}
      className={ 
        Boolean(activeDD)
          ? `sidebar-link bg-primary/10  hover:bg-primary/10  text-primary mb-1`
          : `sidebar-link group/link before:content-[''] before:absolute before:start-0 before:top-0 before:h-full before:w-0 hover:before:w-full before:bg-primary/10 before:transition-all before:duration-400 before:rounded-e-full hover:bg-transparent  hover:text-primary  mb-1`
      }
    >
      {/* Render child items */}
      {item.children && (
        <div className="sidebar-dropdown">
          {item.children.map((child: any) => (
            <React.Fragment key={child.id}>
              {child.children ? (
                <NavCollapse item={child} /> // Recursive call for nested collapse
              ) : (
                <Dropitems item={child} />
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </CustomCollapse>
  );
};

export default NavCollapse;
