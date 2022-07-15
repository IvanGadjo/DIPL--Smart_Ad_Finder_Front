import { FC, useEffect, useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import LogOutButton from "../components/auth/logOutButton";
import { useUI_ZustandStore } from "../utils/zustandStores/userInfoStore";
import shallow from 'zustand/shallow';
import { getAllUserInterestsOfUser } from "../utils/restServices/userInterestsService";
import { getAllAdvertsByUserId } from "../utils/restServices/userAdvertsService";
import { IUserAdvert, IUserInterest } from "../utils/interfaces";




const Settings: FC<{}> = () => {

    const { user } = useAuth0();


    const [userInterestsStats, setUserInterestsStats] = useState({
        totalNum: 0,
        totalActive: 0,
        totalNotActive: 0
    });

    const [foundAdsStats, setFoundAdsStats] = useState([
        {
            userInterestName: '',
            foundAdsNum: 0,
        }
    ])

    const [userAdsStats, setUserAdsStats] = useState({
        totalNum: 0,
        totalActive: 0,
        totalNotActive: 0
    });


    const [ userId, auth0UserInfo ] = useUI_ZustandStore(state => [state.userId, state.auth0UserInfo], shallow);


    useEffect(() => {
        fetchUserStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchUserStats = async () => {
        if(userId) {
            let userInterestsTmp = await getAllUserInterestsOfUser(userId, auth0UserInfo.token);
            let userAdvertsTmp = await getAllAdvertsByUserId(userId, auth0UserInfo.token);

            calcUserInterestStats(userInterestsTmp);
            calcFoundAdsStats(userInterestsTmp);
            calcUserAdsStats(userAdvertsTmp);
            
        }
    }



    const calcUserInterestStats = (userInterests: IUserInterest[]) => {
        let totalNum = userInterests.length;
        let totalActive = userInterests.filter(ui => ui.active).length;
        let totalNotActive = totalNum - totalActive;

        setUserInterestsStats({totalNum, totalActive, totalNotActive});
    }

    const calcFoundAdsStats =  (userInterests: IUserInterest[]) => { 
        let foundAdsStats = [
            {
                userInterestName: '',
                foundAdsNum: 0,
            }
        ];

        userInterests.forEach(ui => {
            let restructuredOtherKeywords = ui.keywords.otherKeywords?.reduce((prev, next) => prev + ' '+ next);
            if(ui.foundAdverts) {
                foundAdsStats.push({
                    userInterestName: ui.keywords.mainKeyword + restructuredOtherKeywords,
                    foundAdsNum: ui.foundAdverts?.length
                })
            }
        })

        foundAdsStats = foundAdsStats.slice(1);
        setFoundAdsStats(foundAdsStats);
    }

    const calcUserAdsStats = (userAdverts: IUserAdvert[]) => {
        let totalNum = userAdverts.length;
        let totalActive = userAdverts.filter(ui => ui.isActive).length;
        let totalNotActive = totalNum - totalActive;

        setUserAdsStats({totalNum, totalActive, totalNotActive});
    }


    return (
        <>  

            <div className="grid grid-cols-2">
                {
                    user && user.name && user.email ?
                    <h3 className="text-2xl leading-6 font-semibold text-green-900">{user.name}, {user.email}</h3>
                    :
                    <></>
                }
                <div>
                    <LogOutButton/>
                </div>
            </div>



            <div className="mt-10">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Вашите барања</h3>

                <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                  
                    <div key='1' className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 truncate">Вкупно барања</dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">{userInterestsStats.totalNum}</dd>
                    </div>

                    <div key='2' className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 truncate">Вкупно активни</dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">{userInterestsStats.totalActive}</dd>
                    </div>

                    <div key='3' className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 truncate">Вкупно неактивни</dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">{userInterestsStats.totalNotActive}</dd>
                    </div>
                    
                </dl>
            </div>



            <div className="mt-10">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Пронајдени огласи</h3>

                <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">

                    {
                        foundAdsStats.map((fas) => (
                            <div key={fas.userInterestName} className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                                <dt className="text-sm font-medium text-gray-500 truncate">{fas.userInterestName}</dt>
                                <dd className="mt-1 text-3xl font-semibold text-gray-900">{fas.foundAdsNum}</dd>
                            </div>
                        ))
                    }
                
                </dl>
            </div>



            <div className="mt-10">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Вашите огласи</h3>

                <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                  
                    <div key='1' className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 truncate">Вкупно огласи</dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">{userAdsStats.totalNum}</dd>
                    </div>

                    <div key='2' className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 truncate">Вкупно активни</dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">{userAdsStats.totalActive}</dd>
                    </div>

                    <div key='3' className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 truncate">Вкупно неактивни</dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">{userAdsStats.totalNotActive}</dd>
                    </div>
                    
                </dl>
            </div>

        </>
    )
}

export default Settings;