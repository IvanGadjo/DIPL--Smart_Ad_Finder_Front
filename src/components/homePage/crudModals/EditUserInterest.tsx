import { FC, Fragment, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { categories, regions } from "../../../utils/categoriesAndRegionsData";
import { editUserInterest } from "../../../utils/restServices/userInterestsService";
import { useNavigate } from "react-router-dom";
import { useUI_ZustandStore } from "../../../utils/zustandStores/userInfoStore";
import shallow from 'zustand/shallow';
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon, SaveAsIcon, TrashIcon, ReplyIcon } from "@heroicons/react/outline";


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }



  



const EditUserInterest: FC<{}> = () => {        // ! Pocetni values za kategorija i region treba da se zemaat od userInterest

    const location = useLocation();
    const navigate = useNavigate();                  // * Navigate programatically with react-router v6
    const userInterest: any = location.state;        // * Pass props via <Link> component in react router v6 - via state prop in Link & useLocation() hook in component
    
    const [ auth0UserInfo, userId ] = useUI_ZustandStore(state => [state.auth0UserInfo, state.userId], shallow);

    const [title, setTitle] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [region, setRegion] = useState<string>('');

    

    useEffect(() => {
        console.log(location.state);

        // @ts-ignore
        setCategory(location.state.category);
        // @ts-ignore
        setRegion(location.state.region);
        // @ts-ignore
        setTitle(location.state.keywords.mainKeyword + ' ' + restructureOtherKeywords(location.state.keywords.otherKeywords))

    }, []);



    const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();

        setTitle(e.currentTarget.value);
    }

    const handleCategoryChange = (category: any) => {
        setCategory(category.value);
    }

    const handleRegionChange = (region: any) => {         
        setRegion(region.value)
    }

    const handleBackButtonClick = () => {
        navigate('../home', { replace: true });       
    }

    const handleResetButtonClick = () => {
        setCategory('AllCategories');
        setRegion('AllRegions');
        setTitle('');
    }

    const renderMKDName_category = (category: string) => {
        const mkCategory = categories.find(cat => cat.value === category)
        return <span className="block truncate">{mkCategory?.text}</span>
    }

    const renderMKDName_region = (region: string) => {
        const mkRegion = regions.find(reg => reg.value === region)
        return <span className="block truncate">{mkRegion?.text}</span>
    }

    const restructureOtherKeywords = (otherKeywords: string[] | undefined) => {
        if(otherKeywords && otherKeywords.length>0){
            let restructured = otherKeywords.reduce((prev, next) => prev + ' '+ next)
            return restructured;
        }
    } 

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        if(userId) {

            userInterest.category = category;
            userInterest.region = region;
            userInterest.keywords = {
                mainKeyword: title
            };

            console.log(userInterest);
            await editUserInterest(userInterest, userId, auth0UserInfo.token);       

            navigate('../home', { replace: true });       // * Navigates to '/home', you can also pass state
        } else {
            console.error('UserID e UNDEFINED!')
        }
    }

    return (
        <>      

            <h1 className="text-2xl font-semibold text-gray-900 mb-7">Променете го вашето барање</h1>

            <form onSubmit={handleSubmit}>

                <label className="block text-sm font-medium text-gray-700 mb-2">Наслов:</label>
                <input type="text"
                    className="lg:w-96 shadow-sm focus:ring-green-500 focus:border-green-500 block sm:text-sm border-gray-300 rounded-md"
                    onChange={handleTitleChange}
                    value={title}
                />



                {/* //* Categories dropdown */}
                <div className="lg:w-96 mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Категорија:</label>
                
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
                <div className="lg:w-96 mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Регион:</label>

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




                <div className="lg:w-96 mt-10">
                    <button  
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                            Зачувај
                            <SaveAsIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                    </button>


                    <button  
                        type="reset"
                        className="lg:mx-7 mx-2 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                        onClick={() => {handleResetButtonClick()}}>
                            Ресетирај
                            <TrashIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                    </button>



                    <button  
                        type="reset"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        onClick={()=>{handleBackButtonClick()}}>
                            Назад
                            <ReplyIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                    </button>
                </div>


            </form>
            
            
        </>
    );
}

export default EditUserInterest;   