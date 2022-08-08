import React, { FC, Fragment, useEffect, useState } from "react";
import { categories, regions } from "../../../utils/categoriesAndRegionsData";
import { IUserAdvert } from "../../../utils/interfaces";
import { useNavigate, useLocation } from "react-router-dom";
import { editUserAdvert } from "../../../utils/restServices/userAdvertsService";
import { useUI_ZustandStore } from "../../../utils/zustandStores/userInfoStore";
import shallow from 'zustand/shallow';
import { useUserAdverts } from "../../../utils/swrHooks/useUserAdverts";
import { Listbox, Transition } from "@headlessui/react";
import { SelectorIcon, CheckIcon, ReplyIcon, SaveAsIcon, TrashIcon } from "@heroicons/react/outline";



function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}





const EditUserAdvert: FC<{}> = () => {        

    const [ auth0UserInfo, userId ] = useUI_ZustandStore(state => [state.auth0UserInfo, state.userId], shallow);
    const { allAdverts, setAdverts } = useUserAdverts();


    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [contactInfo, setContactInfo] = useState<string>('');
    const [image, setImage] = useState<File | undefined>();

    const [category, setCategory] = useState<string>('');
    const [region, setRegion] = useState<string>('');
    

    const navigate = useNavigate(); 
    const location = useLocation();
    const userAdvert: any = location.state;
    

    useEffect(() => {

        // @ts-ignore
        setCategory(location.state.category);
        // @ts-ignore
        setRegion(location.state.region);
        // @ts-ignore
        setTitle(location.state.title)
        // @ts-ignore
        setDescription(location.state.description);
        // @ts-ignore
        setPrice(location.state.price);
        // @ts-ignore
        setContactInfo(location.state.contactInfo);
        // @ts-ignore
        setImage(location.state.image);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        setTitle(e.currentTarget.value)
    }

    const handleCategoryChange = (category: any) => {
        setCategory(category.value);
    }

    const handleRegionChange = (region: any) => {         
        setRegion(region.value);
    }

    const handleDescriptionChange = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        setDescription(e.currentTarget.value);
    }

    const handlePriceChange = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        setPrice(e.currentTarget.value);
    }

    const handleContactInfoChange = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        setContactInfo(e.currentTarget.value);
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const fileList = e.target.files;
        if (!fileList) return;

        console.log(fileList[0]);
        setImage(fileList[0]);
    }

    const handleBackButtonClick = () => {
        navigate('../advertisments', { replace: true });       
    }

    const handleResetButtonClick = () => {
        setCategory('AllCategories');
        setRegion('AllRegions');
        setTitle('');
        setDescription('');
        setPrice('');
        setContactInfo('');
        // setImage(undefined);
    }

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        if(userId) {

            let userAd:IUserAdvert = {
                id: userAdvert.id,
                isActive: true,
                category,
                region,
                title,
                description,
                price,
                contactInfo
            };

            const frmData = new FormData();

            if(image){
                frmData.append('image', image)
            }

            let editedAd = await editUserAdvert(userAd, frmData, userId, auth0UserInfo.token);




            let filteredAds = allAdverts.filter((ad: IUserAdvert) => {
                if(ad.id){
                    if(ad.id !== editedAd.id)
                        return ad
                } 
                return null;    
            })

            console.log(filteredAds)

            setAdverts([...filteredAds, editedAd])      // * Update ads in swr hook for real time render of ads


            navigate('../advertisments', { replace: true });     
        } else {
            console.error('UserID e UNDEFINED!')
        }
    }

     // * Utility methods
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

            <h1 className="text-2xl font-semibold text-gray-900 mb-7">Променете го вашиот оглас:</h1>


            <form onSubmit={handleSubmit}>

                <label className="block text-sm font-medium text-gray-700 mb-2">Наслов:</label>
                <input type="text"
                    className="lg:w-96 shadow-sm focus:ring-green-500 focus:border-green-500 block sm:text-sm border-gray-300 rounded-md"
                    onChange={handleTitleChange}
                    value={title}
                    required
                />

                <label className="block text-sm font-medium text-gray-700 mb-2">Опис:</label>
                <input type="text"
                    className="lg:w-96 shadow-sm focus:ring-green-500 focus:border-green-500 block sm:text-sm border-gray-300 rounded-md"
                    onChange={handleDescriptionChange}
                    value={description}
                    required
                />


                <label className="block text-sm font-medium text-gray-700 mb-2">Цена (со валута):</label>
                <input type="text"
                    className="lg:w-96 shadow-sm focus:ring-green-500 focus:border-green-500 block sm:text-sm border-gray-300 rounded-md"
                    onChange={handlePriceChange}
                    value={price}
                    required
                />

                <label className="block text-sm font-medium text-gray-700 mb-2">Информации за контакт:</label>
                <input type="text"
                    className="lg:w-96 shadow-sm focus:ring-green-500 focus:border-green-500 block sm:text-sm border-gray-300 rounded-md"
                    onChange={handleContactInfoChange}
                    value={contactInfo}
                    required
                />


                <label className="block text-sm font-medium text-gray-700 mb-2">Слика:</label>
                <input
                    accept="image/*"
                    id="image"
                    name="image"
                    type="file"
                    multiple={false}
                    onChange={handleImageChange}
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

export default EditUserAdvert;   