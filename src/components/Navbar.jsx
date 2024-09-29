import { Disclosure,  Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Link } from 'react-router-dom'
import Switch from './Switch'



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
    const currentUser = {displayName: "MEK"}
    // const currentUser = false
  return (
    <Disclosure as="nav" className="bg-neutral-100 dark:bg-gray-900 py-3 dark:text-white fixed w-full top-0 z-20">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between">
        <Link className='pr-2 text-2xl font-semibold' to="/">
            Movie App
        </Link>
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            
            
          </div>
          
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

          {currentUser && <h5 className='mr-2 capitalize'>{currentUser?.displayName}</h5>}

          <Switch/>
            

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="h-8 w-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <a href="#"  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                    Your Profile
                  </a>
                </MenuItem>
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                    Settings
                  </a>
                </MenuItem>
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                    Sign out
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

     
        
    </Disclosure>
  )
}
