import { FC, Fragment } from "react";
import { Link } from "react-router-dom";
import { categories, regions } from "../../utils/categoriesAndRegionsData";
import { useRUIIS_ZustandStore } from "../../utils/zustandStores/renderUserInterestsInfoStore";
import shallow from 'zustand/shallow';
import { CheckIcon, PlusCircleIcon, SelectorIcon } from "@heroicons/react/outline";
import { Listbox, Switch, Transition } from '@headlessui/react'


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }






const ActionsPanel: FC<{}> = () => {

    const [ category,
            setCategory, 
            region,
            setRegion, 
            setShowActiveUserInterests,
            showActiveUserInterests] = useRUIIS_ZustandStore(state => [state.category, state.setCategory, state.region,
                                         state.setRegion, state.setShowActiveUserInterests, state.showActiveUserInterests], shallow)



    // * These 3 values go into Zustand state / renderUserInterestsInfo context, that decides how userInterests are rendered in Home page
    // * Now I work with Zustand state

    const handleCategoryChange = (category: any) => {       // * Filter done on backend
        setCategory(category.value);
    }

    const handleRegionChange = (region: any) => {         // * Filter done on backend
        setRegion(region.value)
    }

    const handleToggle_activeInterests = () => {        // * Filter done when rendering on front
        if(showActiveUserInterests)
            setShowActiveUserInterests(false);
        else
            setShowActiveUserInterests(true);
    }

    const renderMKDName_category = (category: string) => {
        const mkCategory = categories.find(cat => cat.value === category)
        return <span className="block truncate">{mkCategory?.text}</span>
    }

    const renderMKDName_region = (region: string) => {
        const mkRegion = regions.find(reg => reg.value === region)
        return <span className="block truncate">{mkRegion?.text}</span>
    }


    return (
        <>

            <div className="grid grid-cols-2 gap-4">

                <div>

                    {/* //* Categories dropdown */}
                    <div className="mb-4 lg:w-96">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Филтрирај по категорија:</label>
                        <Listbox value={category} onChange={handleCategoryChange}>
                            {({ open }) => (
                                <>
                                <div className="mt-1 relative">
                                    <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm">
                                    {renderMKDName_category(category)}
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </span>
                                    </Listbox.Button>

                                    <Transition
                                        show={open}
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                        {categories.map((cat) => (
                                        <Listbox.Option
                                            key={cat.value}
                                            className={({ active }) =>
                                            classNames(
                                                active ? 'text-white bg-green-600' : 'text-gray-900',
                                                'cursor-default select-none relative py-2 pl-3 pr-9'
                                            )
                                            }
                                            value={cat}
                                        >
                                            {({ selected, active }) => (
                                            <>
                                                <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                {cat.text}
                                                </span>

                                                {selected ? (
                                                <span
                                                    className={classNames(
                                                    active ? 'text-white' : 'text-green-600',
                                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                                    )}
                                                >
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                                ) : null}
                                            </>
                                            )}
                                        </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                    </Transition>
                                </div>
                                </>
                            )}
                        </Listbox>
                    </div>
                    
                    
                
                    {/* //* Regions dropdown */}
                    <div className="lg:w-96">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Филтрирај по регион:</label>
                        <Listbox value={region} onChange={handleRegionChange}>
                            {({ open }) => (
                                <>
                                <div className="mt-1 relative">
                                    <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm">
                                    {renderMKDName_region(region)}
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </span>
                                    </Listbox.Button>

                                    <Transition
                                        show={open}
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                        {regions.map((reg) => (
                                        <Listbox.Option
                                            key={reg.value}
                                            className={({ active }) =>
                                            classNames(
                                                active ? 'text-white bg-green-600' : 'text-gray-900',
                                                'cursor-default select-none relative py-2 pl-3 pr-9'
                                            )
                                            }
                                            value={reg}
                                        >
                                            {({ selected, active }) => (
                                            <>
                                                <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                {reg.text}
                                                </span>

                                                {selected ? (
                                                <span
                                                    className={classNames(
                                                    active ? 'text-white' : 'text-green-600',
                                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                                    )}
                                                >
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                                ) : null}
                                            </>
                                            )}
                                        </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                    </Transition>
                                </div>
                                </>
                            )}
                        </Listbox>
                    </div>
                </div>





                {/* //* Right hand side tools */}
                <div className="">
                    <div className="block">
                    <Link to='/createUserInterest'>
                        <button  
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                            Ново барање
                            <PlusCircleIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                        </button>
                    </Link>
                    </div>


                    {
                        showActiveUserInterests ? 
                        <button onClick={() => handleToggle_activeInterests()}
                        className="block text-sm font-medium text-gray-700 mt-4 mb-2">
                            Прикажи неактивни
                        </button> 
                        :
                        <button onClick={() => handleToggle_activeInterests()}
                        className="block text-sm font-medium text-gray-700 mt-4 mb-2">
                            Прикажи активни
                        </button>
                    }
                    


                    <Switch
                        checked={showActiveUserInterests}
                        onChange={setShowActiveUserInterests}
                        className={classNames(
                            !showActiveUserInterests ? 'bg-green-600' : 'bg-gray-200',
                            'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                        )}
                        >
                        <span className="sr-only">Use setting</span>
                        <span
                            aria-hidden="true"
                            className={classNames(
                                !showActiveUserInterests ? 'translate-x-5' : 'translate-x-0',
                                'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                            )}
                        />
                    </Switch>
                </div>
               
            </div>

        </>
    );
}

export default ActionsPanel;   