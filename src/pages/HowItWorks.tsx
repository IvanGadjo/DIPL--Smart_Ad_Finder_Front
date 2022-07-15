import { FC } from "react";
import { CameraIcon } from '@heroicons/react/solid'
import searchPic from '../shared/search_pic_woman_2.jpg';
import { howToSteps } from "../utils/howToStepsData";




function classNames(...classes: string[]) {
return classes.filter(Boolean).join(' ')
}


const HowItWorks: FC<{}> = () => {

    return (
        <>
            <div className="bg-white overflow-hidden">
                <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                    <div className="hidden lg:block bg-gray-50 absolute top-0 bottom-0 left-3/4 w-screen" />
                    <div className="mx-auto text-base max-w-prose lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-none">
                    <div>
                        <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">За оваа апликација</h2>
                        <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Како работи SmartAdFinder?
                        </h3>
                    </div>
                    </div>
                    <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
                    <div className="relative lg:row-start-1 lg:col-start-2">
                        <svg
                        className="hidden lg:block absolute top-0 right-0 -mt-20 -mr-20"
                        width={404}
                        height={384}
                        fill="none"
                        viewBox="0 0 404 384"
                        aria-hidden="true"
                        >
                        <defs>
                            <pattern
                            id="de316486-4a29-4312-bdfc-fbce2132a2c1"
                            x={0}
                            y={0}
                            width={20}
                            height={20}
                            patternUnits="userSpaceOnUse"
                            >
                            <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                            </pattern>
                        </defs>
                        <rect width={404} height={384} fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)" />
                        </svg>
                        <div className="relative text-base mx-auto max-w-prose lg:max-w-none">
                        <figure>
                            <div className="aspect-w-12 aspect-h-7 lg:aspect-none">
                            <img
                                className="rounded-lg shadow-lg object-cover object-center"
                                // src="https://images.unsplash.com/photo-1546913199-55e06682967e?ixlib=rb-1.2.1&auto=format&fit=crop&crop=focalpoint&fp-x=.735&fp-y=.55&w=1184&h=1376&q=80"
                                src={searchPic}
                                alt="Whitney leaning against a railing on a downtown street"
                                width={1184}
                                height={1376}
                            />
                            </div>
                            <figcaption className="mt-3 flex text-sm text-gray-500">
                            <CameraIcon className="flex-none w-5 h-5 text-gray-400" aria-hidden="true" />
                            <span className="ml-2">„Барање на огласи без SmartAdFinder“</span>
                            </figcaption>
                        </figure>
                        </div>
                    </div>
                    <div className="mt-8 lg:mt-0">
                        <div className="text-base max-w-prose mx-auto lg:max-w-none">
                        <p className="text-lg text-gray-500">
                            „SmartAdFinder“ е апликација која го олеснува процесот на барање огласи во нашата држава. Во позадина „SmartAdFinder“
                            ги пребарува најпознатите македонски страни за огласи и ги прикажува најрелевантните посакувани резултати за вас.
                            Воедно ја имате можноста да внесете и ваш оглас, до кој другите корисници на „SmartAdFinder“ лесно ќе пристапат.
                            Се што вие треба да направите е да внесете барање кое ви е од интерес, опишано со наредните чекори:
                        </p>
                        </div>
                        <div className="mt-10 prose prose-indigo text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1">


                            <div className="flow-root">
                                <ul role="list" className="-mb-8">
                                    {howToSteps.map((event, eventIdx) => (
                                    <li key={event.id}>
                                        <div className="relative pb-8">
                                        {eventIdx !== howToSteps.length - 1 ? (
                                            <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                                        ) : null}
                                        <div className="relative flex space-x-3">
                                            <div>
                                            <span
                                                className={classNames(
                                                event.iconBackground,
                                                'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                                                )}
                                            >
                                                <event.icon className="h-5 w-5 text-white" aria-hidden="true" />
                                            </span>
                                            </div>
                                            <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                            <div>
                                                <p className="text-sm text-gray-500">
                                                {event.content}{' '}
                                                <span className="font-medium text-gray-900">
                                                    {event.target}
                                                </span>
                                                </p>
                                            </div>
                                        
                                            </div>
                                        </div>
                                        </div>
                                    </li>
                                    ))}
                                </ul>
                            </div>


                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HowItWorks;