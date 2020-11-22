import { createIntl, createIntlCache, IntlCache } from 'react-intl';


const cache: IntlCache = createIntlCache();
const intlProv: any = {};
const content: any = {};


function getMessages(lang: string): any {
    if (!content[lang]) {
        //@ts-ignore
        content[lang] = window.__NEXT_DATA__?.props.pageProps.content;
    }

    return content[lang];
}



function getIntlProvider(lang: any): any {
    if (!intlProv[lang]) {
        intlProv[lang] = createIntl(
            {
                locale: lang,
                messages: getMessages(lang),
                onError: () => {},
            },
            cache // optional
        );
    }

    return intlProv[lang];
}


export const trans = (id: any, values?: any) => {
//@ts-ignore
    const {locale} = window.__NEXT_DATA__;

    // const dir = path.join(process.cwd(), "public", "static");
    //
    // const filePath = `${dir}/${locale}.json`;
    //
    // const buffer = file.readFileSync(filePath);
    //
    // const content = JSON.parse(buffer.toString())[id];
    const intl = getIntlProvider(locale);
    console.log(intl);

    // console.log('-----', locale,  intl.formatMessage({id}, value));
    return intl.formatMessage({id}, values);
};
