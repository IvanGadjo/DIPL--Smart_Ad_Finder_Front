import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { categories, regions } from "../../utils/categoriesAndRegionsData";
import { useRUIIS_ZustandStore } from "../../utils/zustandStores/renderUserInterestsInfoStore";
import shallow from 'zustand/shallow';
import { PlusCircleIcon } from "@heroicons/react/outline";
import { Switch } from '@headlessui/react'


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }






const ActionsPanel: FC<{}> = () => {

    const [ setCategory, 
            setRegion, 
            setShowActiveUserInterests,
            showActiveUserInterests] = useRUIIS_ZustandStore(state => [state.setCategory, state.setRegion, state.setShowActiveUserInterests, state.showActiveUserInterests], shallow)



    // * These 3 values go into Zustand state / renderUserInterestsInfo context, that decides how userInterests are rendered in Home page
    // * Now I work with Zustand state

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {       // * Filter done on backend
        setCategory(e.currentTarget.value);
    }

    const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {         // * Filter done on backend
        setRegion(e.currentTarget.value)
    }

    const handleToggle_activeInterests = () => {        // * Filter done when rendering on front
        if(showActiveUserInterests)
            setShowActiveUserInterests(false);
        else
            setShowActiveUserInterests(true);
    }


    return (
        <>

            <div className="grid grid-cols-2 gap-4">

                <div>
                    <label>Филтрирај по категорија:</label>
                    <select onChange={handleCategoryChange}>
                        <>
                        <option value='all'>Сите</option>
                        {
                            categories.map(cat => {
                                return <option value={cat.value} key={cat.value}>{cat.text}</option>
                            })
                        }
                        </>
                    </select>
                    
                    <br/>
                    <br/>
                

                    <label>Филтрирај по регион:</label>
                    <select onChange={handleRegionChange}>
                        <>
                        <option value='all'>Сите</option>
                        {
                            regions.map(reg => {
                                return <option value={reg.value} key={reg.value}>{reg.text}</option>
                            })
                        }
                        </>
                    </select>
                </div>






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