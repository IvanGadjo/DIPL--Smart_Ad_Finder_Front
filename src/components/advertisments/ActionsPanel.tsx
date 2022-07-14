import { Dispatch, FC, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { IUserAdvert } from "../../utils/interfaces";
import { getAllAdverts, getAllAdvertsByUserId } from "../../utils/restServices/userAdvertsService";
import { useUI_ZustandStore } from '../../utils/zustandStores/userInfoStore';
import shallow from 'zustand/shallow';
import { PlusCircleIcon } from "@heroicons/react/outline";



  
interface IProps {
    setShownAdverts: Dispatch<SetStateAction<IUserAdvert[] | undefined>>,
    typeOfAdsShown: string,
    setTypeOfAdsShown: Dispatch<SetStateAction<string>>
}



const ActionsPanel: FC<IProps> = ({ setShownAdverts, typeOfAdsShown, setTypeOfAdsShown }) => {

    const [ userId, auth0UserInfo ] = useUI_ZustandStore(state => [state.userId, state.auth0UserInfo], shallow);

    
    const handleToggle_advertsShownType = async () => {
        if(typeOfAdsShown === 'byUser') {

            let userAds = await getAllAdverts();   
            
            setShownAdverts(userAds);
            setTypeOfAdsShown('all');
            
        } else {
            if(userId){
                let userAds = await getAllAdvertsByUserId(userId, auth0UserInfo.token);
                setShownAdverts(userAds);
                setTypeOfAdsShown('byUser');
            } else {
                console.error('UserID e UNDEFINED!')
            }
        }
    }

    return (
        <>


            <div className="inline">
                <Link to='/createUserAdvert'>
                    <button  
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        Нов оглас
                        <PlusCircleIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                    </button>
                </Link>
            </div>




            {
                typeOfAdsShown === 'byUser' ? 
                <button onClick={() => handleToggle_advertsShownType()}
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                    Прикажи ги сите
                </button> 
                :
                <button onClick={() => handleToggle_advertsShownType()}
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                    Прикажи само мои
                </button>
            }
                


            {/* {
                typeOfAdsShown === 'byUser' ? 
                <button onClick={() => handleToggle_advertsShownType()}
                className="block text-sm font-medium text-gray-700 mt-4 mb-2">
                    Прикажи ги сите
                </button> 
                :
                <button onClick={() => handleToggle_advertsShownType()}
                className="block text-sm font-medium text-gray-700 mt-4 mb-2">
                    Прикажи само мои
                </button>
            }
                    


            <Switch
                checked={typeOfAdsShown === 'byUser'}
                onChange={() => {}}
                className={classNames(
                    !(typeOfAdsShown === 'byUser') ? 'bg-green-600' : 'bg-gray-200',
                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                )}
                >
                <span className="sr-only">Use setting</span>
                <span
                    aria-hidden="true"
                    className={classNames(
                        !(typeOfAdsShown === 'all') ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                    )}
                />
            </Switch> */}

        </>
    );
}

export default ActionsPanel;   