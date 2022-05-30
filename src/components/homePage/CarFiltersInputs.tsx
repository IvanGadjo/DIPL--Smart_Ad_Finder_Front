import { FC } from "react";


interface IProps {
    handleCarYearChange: (e: React.FormEvent<HTMLInputElement>) => void,
    handleCarMileageChange: (e: React.FormEvent<HTMLInputElement>) => void,
}


const CarFiltersInputs: FC<IProps> = ({ handleCarMileageChange, handleCarYearChange }) => {




    return (
        <>

                    
                <br/>
                <br/>

                <label>Година:</label>
                <input type="number" onChange={handleCarYearChange}/>

                <br/>
                <br/>

                <label>Километража до:</label>
                <input type="number" onChange={handleCarMileageChange}/>

                <br/>
                <br/>

                

        </>
    );
}

export default CarFiltersInputs;   