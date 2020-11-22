// @ts-ignore
import stylisRtl from 'stylis-rtl';
import { CacheProvider } from '@emotion/core';
import createCache from '@emotion/cache';
import React from 'react';
import {useRouter} from "next/router";

const options = {
    rtl: { stylisPlugins: [stylisRtl] },
    ltr: {},
};
export type LangDirectionType = 'rtl' | 'ltr';

type RtlProviderProps = {
    lang: string;
    children: any;
};

export function BaseRtlProvider(props: RtlProviderProps) {
    const router = useRouter();
    const {  children } = props;
    const direction: LangDirectionType = router.locale == 'ar' ? 'rtl' : 'ltr';


    return <CacheProvider value={createCache(options[direction])}>{children}</CacheProvider>;
}
