import { FC } from "react";


interface IProps {
    handleCarYearChange: (e: React.FormEvent<HTMLInputElement>) => void,
    handleCarMileageChange: (e: React.FormEvent<HTMLInputElement>) => void,
}


const CarFiltersInputs: FC<IProps> = ({ handleCarMileageChange, handleCarYearChange }) => {




    return (
        <>
  

                <div>
                    <label className="block text-sm font-medium text-gray-700">Година:</label>
                    <div className="mt-1">
                        <input
                        type="number"
                        className="lg:w-96 shadow-sm focus:ring-green-500 focus:border-green-500 block sm:text-sm border-gray-300 rounded-md"
                        placeholder="пр. 2022"
                        onChange={handleCarYearChange}
                        />
                    </div>
                </div>

                <div className="mt-2 mb-6">
                    <label className="block text-sm font-medium text-gray-700">Километража до:</label>
                    <div className="mt-1">
                        <input
                        type="number"
                        className="lg:w-96 shadow-sm focus:ring-green-500 focus:border-green-500 block sm:text-sm border-gray-300 rounded-md"
                        placeholder="пр. 20 000"
                        onChange={handleCarMileageChange}
                        />
                    </div>
                </div>


        </>
    );
}

export default CarFiltersInputs;   