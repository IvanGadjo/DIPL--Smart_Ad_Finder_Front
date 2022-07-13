import { FC } from "react";
import { RefreshIcon } from "@heroicons/react/outline";


const Loader: FC<{}> = () => {

    return (
        <>
            <svg className="animate-spin h-7 w-7 lg:ml-96 lg:mt-36 ml-44 mt-40" viewBox="0 0 24 24">
                <RefreshIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
            </svg>
        </>
    )
}

export default Loader;