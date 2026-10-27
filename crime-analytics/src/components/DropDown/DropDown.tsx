import {Menu} from '@base-ui/react/menu';
import type { Dispatch } from 'react';

const triggerClass = "flex h-8 items-center justify-center gap-1.5 rounded-none border border-neutral-950 bg-white pr-2 pl-3 text-sm leading-none font-normal whitespace-nowrap text-neutral-950 select-none hover:not-data-disabled:bg-neutral-100 active:not-data-disabled:bg-neutral-200 data-pressed:bg-neutral-100 data-disabled:border-neutral-500 data-disabled:text-neutral-500 focus-visible:-outline-offset-1 focus-visible:outline-2 focus-visible:outline-neutral-950 disabled:border-neutral-500 disabled:text-neutral-500 dark:border-white dark:bg-neutral-950 dark:text-white dark:hover:not-data-disabled:bg-neutral-800 dark:active:not-data-disabled:bg-neutral-700 dark:data-pressed:bg-neutral-800 dark:data-disabled:border-neutral-400 dark:data-disabled:text-neutral-400 dark:focus-visible:outline-white";
const popupClass =   'min-w-[max(14rem,var(--anchor-width))] origin-[var(--transform-origin)] overflow-hidden border border-neutral-950 bg-white text-neutral-950 shadow-[0.25rem_0.25rem_0] shadow-black/12 transition-[scale,opacity] duration-100 ease-out outline-hidden data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0 dark:border-white dark:bg-neutral-950 dark:text-white dark:shadow-none'; 
const inputDivClass =   'flex items-center border-b border-neutral-300 has-data-highlighted:border-neutral-950 has-data-highlighted:ring-1 has-data-highlighted:ring-neutral-950 has-data-highlighted:ring-inset dark:border-neutral-700 dark:has-data-highlighted:border-white dark:has-data-highlighted:ring-white'; 
const clearClass =   'flex size-8 items-center justify-center bg-transparent outline-hidden focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-neutral-950 dark:focus-visible:outline-white'; 
const emptyClass = 'p-3 text-sm text-neutral-500 dark:text-neutral-400'; 
const inputClass =   'min-h-8 w-0 flex-1 bg-transparent px-2.5 text-sm any-pointer-coarse:text-base leading-none outline-hidden placeholder:text-neutral-500 dark:placeholder:text-neutral-400'; 
const itemBaseClass =   "cursor-default py-2 pl-4 text-sm leading-4 outline-hidden select-none data-highlighted:relative data-highlighted:z-0 data-highlighted:text-white data-highlighted:before:absolute data-highlighted:before:inset-x-1 data-highlighted:before:inset-y-0 data-highlighted:before:z-[-1] data-highlighted:before:bg-neutral-950 data-highlighted:before:content-[''] dark:data-highlighted:text-neutral-950 dark:data-highlighted:before:bg-white"; 
const itemClass = `${itemBaseClass} flex pr-8`;
const listBaseClass =   'overflow-y-auto py-1 outline-hidden scrollbar-thin scroll-py-1 not-has-[>:not([hidden])]:py-0'; 
const listClass = `${listBaseClass} max-h-[min(22rem,var(--available-height))] [&>[data-filter-section]:not([hidden])~[data-filter-section]:not([hidden])>[data-filter-separator]]:block`; 

type DropDownProp = {
    name : string;
    values : string[];
    example : string;
    onClick : Dispatch<string[]>;

}

function handleClick(){



}

export default function DropDown({name,values,example,onClick} : DropDownProp){

    return (
            <div>
                <Menu.FilterProvider>
                    <Menu.Root>
                        <Menu.Trigger className={triggerClass}>
                            {name}  <CaretDownIcon/>
                        </Menu.Trigger>
                        <Menu.Portal>
                            <Menu.Positioner className="outline-hidden">
                                <Menu.Popup className={popupClass}>
                                    <div className={inputDivClass}>
                                        <Menu.Input className={inputClass} aria-label="Filter amenities" placeholder={`e.g. ${example}`}/>
                                        <Menu.Clear className={clearClass}><ClearIcon/></Menu.Clear>
                                    </div>
                                    <Menu.Empty className={emptyClass}>No {name} found</Menu.Empty>
                                    <Menu.List className={listClass}>
                                        {values.map((value) => (
                                            <Menu.Item className={itemClass} onClick={handleClick}>
                                                {value}
                                            </Menu.Item>
                                        ))}
                                    </Menu.List>
                                </Menu.Popup>
                            </Menu.Positioner>
                        </Menu.Portal>
                    </Menu.Root>
                </Menu.FilterProvider>
            </div>
        )


}

function CaretDownIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      {...props}
      style={{ display: 'block', ...props.style }}
    >
      <path d="M12 6H4l4 4.5z" />
    </svg>
  );
}

function ClearIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      {...props}
      style={{ display: 'block', ...props.style }}
    >
      <path d="m3.5 3.5 9 9m0-9-9 9" />
    </svg>
  );
}