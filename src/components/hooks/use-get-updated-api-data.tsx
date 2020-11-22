import { useEffect, useState } from 'react';
import axios from 'axios';
import {chunk} from "../../../utils/helper/chunk-data";

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
type QueryPropsType = {
    ticks?: string;
}

export const useGetUpdatedAuctionData = (props: QueryPropsType) => {
    const { ticks } = props;
    const [isLoading, setIsLoading] = useState(true);
    const [isFinishedOnce, setIsFinishedOnce] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState({} as ResType | null);
    const [opt, setOpt] = useState({ ticks });

    const fetchUpdatedData = async () => {
        setIsError(false);
        setIsLoading(true);
        let res: any;
        try {
            res = await axios.get(`https://api.eas.ae/v2/carsonline?t_${opt.ticks}`);
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
        fetchUpdatedData();
        return () => {
            // todo cancel api call if option passed
        };
    }, [opt]);

    const paginatedUpdatedData = chunk(data?.Cars, 24);
    const pageSize = paginatedUpdatedData.length;

    return { data, updatedPaginatedData: {paginatedUpdatedData, pageSize }, isLoading, isError, isFinishedOnce, setOpt };
};
