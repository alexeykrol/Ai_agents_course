import { createTheme } from "flowbite-react";

const customTheme = createTheme(
  {
    button: {
      base: "group relative flex items-center justify-center p-0.5 focus:ring-0 text-center font-medium cursor-pointer rounded-full",
      fullSized: "w-full",
      grouped: "rounded-none border-l-0 first:rounded-s-lg first:border-l last:rounded-e-lg focus:ring-2",
      pill: "rounded-full",
      color: {
        primary: "bg-primary hover:bg-primaryemphasis text-white",
        secondary: "bg-secondary hover:bg-secondaryemphasis text-white",
        error: "bg-error hover:bg-erroremphasis text-white",
        warning: "bg-warning hover:bg-warningemphasis text-white",
        info: "bg-info text-white",
        success: "bg-success hover:bg-successemphasis text-white",
        muted: "bg-muted text-dark dark:text-white dark:bg-darkmuted ",
        lighterror:
          "bg-lighterror dark:bg-darkerror text-error hover:bg-error hover:text-white",
        lightprimary:
          "bg-lightprimary text-primary hover:bg-primary dark:hover:bg-primary hover:text-white",
        lightsecondary:
          "bg-lightsecondary dark:bg-darksecondary text-secondary hover:bg-secondary dark:hover:bg-secondary hover:text-white",
        lightsuccess:
          "bg-lightsuccess dark:bg-darksuccess text-success hover:bg-success dark:hover:bg-success hover:text-white",
        lightinfo:
          "bg-lightinfo dark:bg-darkinfo text-info hover:bg-info dark:hover:bg-info hover:text-white",
        lightwarning:
          "bg-lightwarning dark:bg-darkwarning text-warning hover:bg-warning dark:hover:bg-warning hover:text-white",
        outlineprimary:
          "border border-primary bg-transparent text-primary hover:bg-primary dark:hover:bg-primary hover:text-white ",
        outlinewhite:
          "border border-white bg-transparent text-white hover:bg-white dark:hover:bg-white hover:text-dark ",
        transparent:
          "bg-transparent hover:bg-lightprimary dark:hover:bg-darkprimary hover:text-primary p-0",
      },
      outlineColor: {
        primary: "border bg-transparent text-primary",
        secondary: "border bg-transparent text-secondary",
        success: "border bg-transparent text-success",
        info: "border bg-transparent text-info",
        warning: "border bg-transparent text-warning",
        error: "border bg-transparent text-error",
        white: "border bg-transparent text-white",
        dark: "border bg-transparent text-dark",
        default: "border-1",
      },
      size: {
        xs: "h-8 px-3 text-xs",
        sm: "h-9 px-3 text-sm",
        md: "h-[42px] px-5 text-sm",
        lg: "h-12 px-5 text-base",
        xl: "h-15 px-6 text-base"
      },
    },
    buttonGroup:{
      base: "inline-flex rounded-md shadow-none"
    },
    badge: {
      root: {
        base: "flex h-fit w-fit items-center font-medium text-xs",
        color: {
          primary: "bg-primary text-white",
          secondary: "bg-secondary text-white ",
          info: "bg-info text-white dark:text-white hover:bg-info dark:bg-info hover:text-white dark:hover:bg-info dark:hover:text-white",
          success: "bg-success text-white hover:bg-success dark:bg-success dark:text-white dark:hover:bg-success",
          warning: "bg-warning text-white hover:bg-warning dark:bg-warning dark:text-white hover:text-white dark:hover:bg-warning dark:hover:text-white",
          error: "bg-error text-white ",
          lightsuccess: "bg-lightsuccess dark:bg-lightsuccess hover:bg-lightsuccess hover:text-success text-success",
          lightprimary: "bg-lightprimary dark:bg-lightprimary text-primary hover:bg-lightprimary hover:dark:bg-lightprimary hover:text-primary",
          lightwarning: "bg-lightwarning dark:bg-lightwarning text-warning",
          lightinfo: "bg-lightinfo dark:bg-lightinfo text-info",
          lightsecondary:
            "bg-lightsecondary dark:bg-lightsecondary text-secondary",
          lighterror: "bg-lighterror dark:bg-lighterror text-error",
          lightgray: "bg-lightgray dark:bg-lightgray text-gray",
          white: "bg-white dark:bg-darkmuted text-dark dark:text-white",
          muted: "bg-muted dark:bg-darkmuted text-dark dark:text-white",
        },
      },
      icon: {
        off: "rounded-full px-2.5 py-1",
        on: "rounded-full py-[5px] px-[10px] gap-1",
        size: {
          xs: "h-3 w-3",
          sm: "h-3.5 w-3.5",
        },
      },
    },
  
    tooltip: {
      target: "w-auto",
      base: "absolute z-10 inline-block rounded-lg px-3 py-2 text-xs font-normal shadow-sm",
    },
  
    card: {
      root: {
        base: "flex rounded-lg dark:shadow-dark-md shadow-md bg-white dark:bg-dark p-6 relative w-full break-words",
        children: "flex h-full flex-col justify-center gap-2 p-0",
      },
    },
  
    drawer: {
      root: {
        base: "fixed z-40 overflow-y-auto bg-white dark:bg-darkgray p-0 transition-transform",
      },
      header: {
        inner: {
          closeButton:
            "absolute end-2.5 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-lightgray dark:bg-darkmuted text-primary cursor-pointer",
          closeIcon: "h-4 w-4",
          titleText:
            "mb-4 inline-flex items-center text-base font-semibold text-ld",
        },
      },
    },
  
    modal: {
      base: "fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
      content: {
        base: "relative h-full w-full p-4 md:h-auto",
        inner:
          "relative flex max-h-[90dvh] flex-col rounded-lg bg-white dark:bg-darkgray",
      },
      sizes: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
      },
      body: {
        base: "flex-1 overflow-auto p-6",
        popup: "pt-0",
      },
      header: {
        base: "flex items-start justify-between border-0 p-6",
        popup: "border-b-0 p-2",
        title: "text-xl font-semibold text-dark dark:text-white leading-[normal]",
        close: {
          base: "cursor-pointer outline-hidden ltr:ml-auto rtl:mr-auto items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
          icon: "h-5 w-5",
        },
      },
      footer: {
        base: "flex items-center gap-2 p-6 pt-2",
        popup: "border-none",
      },
    },
  
    dropdown: {
      arrowIcon: "ml-2 h-4 w-4",
      content: "focus:outline-hidden",
      floating: {
        animation: "transition-opacity",
        arrow: {
          base: "absolute z-10 h-3 w-3 rotate-45",
          style: {
            dark: "bg-dark dark:bg-dark",
            light: "bg-white",
            auto: "bg-white dark:bg-dark",
          },
          placement: "-4px",
        },
        base: "z-10 w-fit  items-center focus:outline-hidden !bg-white dark:!bg-dark shadow-md dark:shadow-dark-md text-start rounded-sm",
        content: "py-2 text-sm text-darklink focus:outline-hidden bg-white",
        header: "block px-4 py-2 text-ld",
        item: {
          container: "focus:outline-hidden",
          base: "flex w-full cursor-pointer items-center justify-start px-4  py-2 text-sm text-ld hover:text-primary dark:hover:!text-primary hover:bg-lighthover dark:hover:bg-lightinfo/30 focus:bg-lighthover dark:focus:bg-lightinfo/30 focus:outline-hidden",
          icon: "mr-2 h-4 w-4",
        },
        style: {
          dark: "bg-dark text-white dark:bg-dark",
          light: "border-none bg-white",
          auto: "border-none bg-white text-ld dark:border-none dark:bg-dark dark:text-white focus:outline-hidden",
        },
        target: "w-fit",
      },
      inlineWrapper: "flex items-center",
    },
  
    table: {
      root: {
        base: "w-full text-left text-sm text-gray-500 dark:text-gray-400",
        shadow:
          "absolute left-0 top-0 -z-10 h-full w-full  bg-transparent dark:bg-transparent drop-shadow-md ",
        wrapper: "relative",
      },
      head: {
        base: "group/head text-sm font-medium capitalize text-dark dark:text-white border-b border-ld",
        cell: {
          base: "font-semibold px-4 py-4 bg-transaprent  dark:bg-transparent",
        },
      },
      body: {
        base: "group/body",
        cell: {
          base: "px-4 py-3 dark:bg-transparent group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-none group-last/body:group-last/row:last:rounded-b-none",
        },
      },
      row: {
        base: "group/row bg-transparent ",
        hovered: "hover:bg-lighthover dark:hover:bg-lightinfo/20",
        striped:
          "odd:bg-transparent  even:bg-gray-50 dark:odd:bg-dark dark:even:bg-gray-700",
      },
    },
  
    
  
    checkbox: {
      base: "rounded border-2 flex cursor-pointer w-[18px] h-[18px] !border-dark/30  bg-transparent dark:bg-transparent focus:shadow-none focus:ring-0 focus:outline-none focus:ring-offset-0",
      color: {
        default: "text-primary",
        primary: "text-primary",
        secondary: "text-secondary",
        error: "text-error",
      },
    },

  

    

  
    label: {
      root: {
        base: "text-sm font-semibold text-dark dark:text-white",
        disabled: "opacity-100",
      },
    },
  
    alert: {
      base: "flex flex-col gap-2 p-4 text-sm",
      borderAccent: "border-t-4",
      color: {
        primary: "bg-primary text-white border-yellow-500",
        secondary: "bg-secondary text-white border-yellow-500",
        success: "bg-success text-white border-yellow-500",
        info: "bg-info text-white border-yellow-500",
        warning: "bg-warning text-dark border-yellow-500 dark:text-yellow-800",
        error: "bg-error text-white border-yellow-500",
        dark: "bg-dark text-white dark:bg-dark border-yellow-500",
        lightsuccess:
          "bg-lightsuccess dark:bg-lightsuccess text-success border-success",
        lightprimary:
          "bg-lightprimary dark:bg-lightprimary text-primary border-primary",
        lightwarning:
          "bg-lightwarning dark:bg-lightwarning text-warning border-yellow-500",
        lightinfo: "bg-lightinfo dark:bg-lightinfo text-info border-info",
        lightsecondary:
          "bg-lightsecondary dark:bg-lightsecondary text-secondary border-secondary",
        lighterror: "bg-lighterror dark:bg-lighterror text-error border-error",
        lightgray:
          "bg-lightgray dark:bg-dark text-dark dark:text-white border-lightgray",
      },
      icon: "mr-3 inline h-5 w-5 shrink-0",
      rounded: "rounded-lg",
      wrapper: "flex items-center",
  
      closeButton: {
        base: "-m-1.5 ml-auto inline-flex h-7 w-7 rounded-lg p-1.5 focus:ring-0 cursor-pointer",
        icon: "h-4 w-4",
        color: {
          primary: "bg-transparent",
          secondary: "bg-transparent",
          success: "bg-transparent",
          info: "bg-transparent",
          warning: "bg-transparent",
          error: "bg-transparent",
          dark: "bg-transparent",
        },
      },
    },


  
    navbar: {
      collapse: {
        base: "w-full md:w-auto",
        list: "flex gap-2 items-center",
        hidden: {
          on: "hidden",
          off: "",
        },
      },
      link: {
        base: " py-1.5 px-4 text-base hover:text-primary dark:hover:text-primary text-darklink hover:bg-lightprimary rounded-full flex justify-center items-center cursor-pointer lp-nav",
        active: {
          on: "bg-primary text-primary md:bg-transparent md:text-primary dark:text-primary",
          off: "text-dark dark:text-white",
        },
      },
    },
  
  
  
   
  
    popover: {
      base: "absolute z-20 inline-block w-max max-w-[100vw] bg-white rounded-lg outline-hidden shadow-sm dark:border-gray-600 dark:bg-gray-800",
      content: "z-10 overflow-hidden rounded-[7px]",
      arrow: {
        base: "absolute h-2 w-2 z-0 rotate-45 rounded-md mix-blend-lighten bg-white border border-ld dark:border-gray-600 dark:bg-gray-800 dark:mix-blend-color",
        placement: "-4px rounded-md",
      },
    },
  
    sidebar: {
      root: {
        inner: "bg-white dark:bg-dark rounded-none p-0 overflow-y-hidden",
      },
      item: {
        base: "flex items-center cursor-pointer justify-center rounded-lg px-4 py-3 gap-3  text-[15px] text-start  leading-[normal] ",
        content: {
          base: "flex-1 whitespace-nowrap px-0",
        },
      
      },
  
      collapse: {
        button:
          "group flex gap-3 items-center  rounded-lg px-4 py-3 text-[15px] text-start truncate leading-[normal] font-normal text-link  cursor-pointer",
        icon: {
          base: "h-6 w-6 text-link text-base",
        },
        label: {
          base: "flex justify-start flex-1 max-w-36 overflow-hidden truncate",
        },
      },
      itemGroup: {
        base: "mt-4 space-y-0 border-t border-ld pt-4 first:mt-0 first:border-t-0 first:pt-0 sidebar-nav ",
      },
    },
  
   
    
  }
);

export default customTheme;
