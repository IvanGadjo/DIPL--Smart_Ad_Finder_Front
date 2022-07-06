import { FC, Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IFoundAdvert, IUserInterest } from "../../utils/interfaces";
import { setActiveOnUserInterest, 
         getAllUserInterestsOfUser,
         getUserInterestById } from '../../utils/restServices/userInterestsService';
import { deleteFoundAdvert } from '../../utils/restServices/foundAdvertsService';
import { useUI_ZustandStore } from '../../utils/zustandStores/userInfoStore';
import shallow from 'zustand/shallow';
import CarFiltersInputs from './CarFiltersInputs';
import FoundAdsTable from './FoundAdsTable';
import { Listbox, Transition } from "@headlessui/react";
import { SelectorIcon, CheckIcon, ExclamationCircleIcon, PencilAltIcon } from "@heroicons/react/outline";


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }




interface IProps {
    // userInterestsProps: [IUserInterest]      // * This is a TS tuple
    userInterests: IUserInterest[],         // * This is a TS array
    setUserInterests: (userInterests: IUserInterest[]) => void
}

const UserInterestsTable: FC<IProps> = ({ userInterests, setUserInterests }) => {

    const [ shownUserInterest, 
            setShownUserInterest, 
            auth0UserInfo,
            userId ] = useUI_ZustandStore(state => [state.shownUserInterest, state.setShownUserInterest, state.auth0UserInfo, state.userId], shallow);
    const [ shownAds, setShownAds ] = useState<IFoundAdvert[] | undefined>();
    const [ prevShownAds, setPrevShownAds ] = useState<IFoundAdvert[] | undefined>();


    const [ carYear, setCarYear ] = useState<string>('');
    const [ carMileage, setCarMileage ] = useState<string>('');


    useEffect(() => {
        if(shownUserInterest)setShownAds(shownUserInterest.foundAdverts)
    },[shownUserInterest])

    

    const handleShownInterestChange = async (userInt: any) => {

        console.log(userInt)
        if(userInt && userInt.id) {
            let ui = userInterests.find(ui => ui.id === parseInt(userInt.id));
                
            if(ui) {
                setShownUserInterest(ui);
                setPrevShownAds(ui.foundAdverts);

            } else console.log('Error in handleShownInterestChange()');
        }

    } 

    const handleSetActiveOnInterest = async (userInterest: IUserInterest) => {

        if(userId) {

            let restructuredOtherKeywords = userInterest.keywords.otherKeywords?.reduce((prev, next) => prev + ' '+ next);
            userInterest.keywords.mainKeyword = userInterest.keywords.mainKeyword + ' ' + restructuredOtherKeywords;
            userInterest.keywords.otherKeywords = [''];

            if(userInterest.active){
                await setActiveOnUserInterest(userInterest, userId, false, auth0UserInfo.token);
            }
            else {
                await setActiveOnUserInterest(userInterest, userId, true, auth0UserInfo.token);
            }

            let newUserInterests: IUserInterest[] = await getAllUserInterestsOfUser(userId, auth0UserInfo.token);


            newUserInterests.sort((prev, next) => {       // * Sort userInterests by id and then show them in dropdown
                if(prev.id && next.id){
                    if(prev.id > next.id) 
                        return 1
                    else  return -1
                }
                else return 1
            })


            setUserInterests(newUserInterests);     // * State change triggers rerender
        } else {
            console.error('UserID e UNDEFINED!')
        }
    }

    // ? TODO: Sredi da e funkcionalno posle UI design
    // const handleWebsiteChoiceChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    //     e.preventDefault();
    //     console.log(e.currentTarget.value)

    //     const unchangedUserInt = userInterests.find(ui => ui.id === shownUserInterest?.id);

    //     if(e.target.value !== 'all') {

    //         console.log(unchangedUserInt?.foundAdverts?.filter(fa => fa.url.split('/')[2] === e.target.value))

    //         if(unchangedUserInt && unchangedUserInt.foundAdverts) {
    //             unchangedUserInt.foundAdverts = unchangedUserInt?.foundAdverts?.filter(fa => fa.url.split('/')[2] === e.target.value)
    //             console.log(unchangedUserInt)

    //             setShownUserInterest(unchangedUserInt)
    //         }
    //     } else {

    //     }
    // }

    const handleDeleteFoundAd = async (foundAdvert: IFoundAdvert, userInterestId: number) => {

        if(userId) {
        
            await deleteFoundAdvert(foundAdvert, auth0UserInfo.token);
            let newUserInterest = await getUserInterestById(userInterestId, auth0UserInfo.token);
            let oldUserInterest = userInterests.find(ui => ui.id === newUserInterest.id);


            if(oldUserInterest) {
                userInterests.splice(userInterests.indexOf(oldUserInterest), userId);        // * Splice returns array of deleted elements :/

                userInterests.push(newUserInterest)
                setUserInterests(userInterests);
                setShownUserInterest(newUserInterest)
            } else {
                console.log('Error in handleDeleteFoundAd')
            }

            // await deleteFoundAdvert(foundAdvert);        // * Another way of deleting, refetches data from back
            // let newUserInterests: IUserInterest[] = await getAllUserInterestsOfUser(1); 
            // setUserInterests(newUserInterests);     

            // let updatedUserInterest = newUserInterests.find(ui => ui.id === userInterestId)

            // if(updatedUserInterest)
            //     setShownUserInterest(updatedUserInterest)
        } else {
            console.error('UserID e UNDEFINED!')
        }

    }

    const renderOtherKeywords = (otherKeywords: string[] | undefined) => {
        // console.log(otherKeywords)

        if(otherKeywords && otherKeywords.length>0){
            let restructured = otherKeywords.reduce((prev, next) => prev + ', '+ next)
            return <>, {restructured}</>
        }
    } 

    // * Car filters handle methods    
    // ! KRSH SE OVIE
    const handleCarYearChange = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        setCarYear(e.currentTarget.value);


        if(e.currentTarget.value !== ''){       // ? Ne e prazno godina poleto

            const godina = parseInt(e.currentTarget.value);

            if(carMileage !== '') {
                const newFoundAds = prevShownAds?.filter(fa => fa.carYear === godina);

                console.log(newFoundAds)

                if(newFoundAds?.length===0){
                    setShownAds([]);
                } else {
                    setShownAds(newFoundAds)
                    setPrevShownAds(newFoundAds)
                }

            } else {
                const newFoundAds = shownUserInterest.foundAdverts?.filter(fa => fa.carYear === godina);

                setShownAds(newFoundAds)
                setPrevShownAds(newFoundAds)
            }
            
        } else {            // ? Prazno e godina poleto

            if(carMileage === '') {
                setShownAds(shownUserInterest.foundAdverts)
                setPrevShownAds(shownUserInterest.foundAdverts)
            }

       
        }
    }

    const handleCarMileageChange = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        setCarMileage(e.currentTarget.value);


        if(e.currentTarget.value !== ''){

            const km = parseInt(e.currentTarget.value);

            if(carYear !== ''){         // ? raboti so prevShownAds
                console.log('KEC')
                console.log(prevShownAds)
                const newFoundAds = prevShownAds?.filter(fa => fa.carMileage <= km);

                console.log(newFoundAds)

                if(newFoundAds?.length===0){
                    setShownAds([]);
                } else {
                    setShownAds(newFoundAds)
                    setPrevShownAds(newFoundAds)
                }
            } else {            // ? raboti so shownUserInterest.foundAdverts
                console.log('DVA')
                const newFoundAds = shownUserInterest.foundAdverts?.filter(fa => fa.carMileage <= km);

                console.log(newFoundAds)
                setShownAds(newFoundAds)
                setPrevShownAds(newFoundAds)
            }

        } else {
            setShownAds(shownUserInterest.foundAdverts)
            setPrevShownAds(shownUserInterest.foundAdverts)
        }
    }

 

    return (
        <>  
            
            {

                userInterests.length > 0 
                ?
                <>
                    {


                        <>

                            <label className="block text-sm font-medium text-gray-700 mb-2">Твои барања:</label>
                            <div className="grid grid-cols-2 gap-2">

                                {/* // * User interests dropdown */}
                                <div className="lg:w-96 mb-6">
                                    <Listbox value={shownUserInterest} onChange={handleShownInterestChange}>
                                        {({ open }) => (
                                            <>
                                            <div className="mt-1 relative">
                                                <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm">
                                                <span className="block truncate"> 
                                                    {shownUserInterest.keywords.mainKeyword}
                                                    {renderOtherKeywords(shownUserInterest.keywords.otherKeywords)}
                                                    {shownUserInterest.active ?  ' (Активно)' : ' (Неактивно)'}</span>
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
                                                    {userInterests.map((ui) => (
                                                    <Listbox.Option
                                                        key={ui.id}
                                                        className={({ active }) =>
                                                        classNames(
                                                            active ? 'text-white bg-green-600' : 'text-gray-900',
                                                            'cursor-default select-none relative py-2 pl-3 pr-9'
                                                        )
                                                        }
                                                        value={ui}
                                                    >
                                                        {({ selected, active }) => (
                                                        <>
                                                            <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                            {ui.keywords.mainKeyword}
                                                            {renderOtherKeywords(ui.keywords.otherKeywords)}
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

                                {/* //* Tools for user interests */}
                                <div>
                                    <Link to='/editUserInterest' state={shownUserInterest}>
                                        <button type="button"
                                                className="w-32 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                                        >
                                            Промени
                                            <PencilAltIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                                        </button>
                                    </Link>
                                    
                                    <button type="button"
                                            onClick={() => handleSetActiveOnInterest(shownUserInterest)}
                                            className="mt-1 lg:ml-4 w-32 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                        >
                                            { shownUserInterest.active ? <>Деактивирај</> : <>Активирај</>}
                                            <ExclamationCircleIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                                    </button>
                                </div>


                            </div>

                            {/* <select onChange={handleWebsiteChoiceChange}>
                                <option value='all' key='all'>Сите</option>
                                <option value='www.pazar3.mk' key='pazar3'>Пазар 3</option>
                                <option value='reklama5.mk' key='reklama5'>Реклама 5</option>
                            </select> */}




                            {/* //* Car filters */}
                            { 
                                shownUserInterest.category === 'Avtomobili' ?
                                <CarFiltersInputs handleCarMileageChange={handleCarMileageChange} handleCarYearChange={handleCarYearChange}/> :
                                null
                            }




                            {/* // * Found ads table */}
                            <FoundAdsTable shownUserInterest={shownUserInterest} shownAds={shownAds} handleDeleteFoundAd={handleDeleteFoundAd}/>
                            

                        </>
                    }
                </>
                :
                <> Сеуште немате внесено барање! </>
            }

            
            
        </>
    );
}

export default UserInterestsTable;   