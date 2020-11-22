import { useEffect, useState } from 'react';
import axios from 'axios';
import {chunk} from "../../../utils/helper/chunk-data";

const url = 'https://api.eas.ae/v2/carsonline';


type ResType = {
    Cars: Record<string, any>[];
    Error: Record<string, any>;
    RefreshInterval: number
    Ticks: string
    alertAr: string
    alertEn: string
    count: number
    endDate: number
    sortDirection: "Asc" | "Dsc"
    sortOption: string;
}



export const useGetAuctionCars = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isFinishedOnce, setIsFinishedOnce] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState({} as ResType | null);
    const fetchData = async () => {
        setIsError(false);
        setIsLoading(true);
        let res: any;
        try {
            res = await axios.get(url);
        } catch (e) {
            res = null;
        }
        if (res) {
            setData(res.data);

            setIsFinishedOnce(true);

        } else {
            setData(null);

            setIsError(true);
        }
        setIsLoading(false);
    };


    useEffect(() => {

        // initial load on mount
        fetchData();
        return () => {
            // todo cancel api call if option passed
        };
    }, []);

    const paginatedData = chunk(data?.Cars, 24);
    const pageSize = paginatedData.length;

    return { data, pagination: {data: paginatedData, size: pageSize}, isLoading, isError, isFinishedOnce, fetchData };
};


export type UseGetCarsApiReturnType = ReturnType<typeof useGetAuctionCars>;
