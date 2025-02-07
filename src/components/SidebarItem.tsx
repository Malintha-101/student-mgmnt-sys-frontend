import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface SidebarItemProps {
  active?: boolean;
  icon: React.ReactNode;
  text: string;
  expanded: boolean;
  subMenu?: SubMenuItemProps[] | null;
}

// We're assuming that the sub-menu items will not have further sub-menu items therefore, it cannot be expanded
interface SubMenuItemProps extends Omit<SidebarItemProps, 'expanded'> {
  expanded?: never;
  subMenu?: never;
}

// This component is used to render the sub-menu items when hovered
function HoveredSubMenuItem({ icon, text, active }: SubMenuItemProps) {
  return (
    <div
      className={`my-2 rounded-md p-2 ${
        active ? 'bg-gray-300' : ' hover:bg-indigo-50'
      }`}
    >
      <div className="flex items-center justify-center ">
        <span className="text-primary-500 h-6 w-6 ">{icon}</span>
        <span className="text-primary-500 ml-3 w-28 text-start">{text}</span>
        <div className="bg-primary-200 h-1" />
      </div>
    </div>
  );
}

export default function SidebarItem({
  icon,
  active = false,
  text,
  expanded = false,
  subMenu = null,
}: SidebarItemProps) {



  return (
    <>
      <li>
        <Link
          to={`/${text.toLowerCase()}`}
          className={`group relative my-1 flex w-full cursor-pointer items-center rounded-md px-3 py-2 font-medium transition-colors ${
            active && !subMenu
              ? 'text-primary-500 bg-gradient-to-tr from-indigo-200 to-indigo-100'
              : 'text-indigo-100 hover:bg-indigo-50 hover:text-blue-950'
          } ${!expanded && 'hidden sm:flex'}`}
        >
          <span className="h-6 w-6">{icon}</span>

          <span
            className={`overflow-hidden text-start transition-all ${
              expanded ? 'ml-3 w-44' : 'w-0'
            }`}
          >
            {text}
          </span>

          {/* 
            display item text items when hovered
          */}
          {!expanded && (
            <div
              className={`
            text-primary-500 invisible absolute left-full ml-6 -translate-x-3
            rounded-md bg-indigo-100 px-2
            py-1 text-sm opacity-20 transition-all
            group-hover:visible group-hover:translate-x-0 group-hover:opacity-100 z-10
        `}
            >
              {/* 
                if hovered item has no sub-menu, display the text
                else display the sub-menu items
              */}
              {!subMenu
                ? text
                : subMenu.map((item, index) => (
                    <HoveredSubMenuItem
                      key={index}
                      text={item.text}
                      icon={item.icon}
                    />
                  ))}
            </div>
          )}
        </Link>
      </li>
      
    </>
  );
}