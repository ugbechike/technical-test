import {GetStaticProps} from "next";
import path from "path";
import fs from "fs";

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { locale } = ctx;
    console.log('---', locale);
    const dir = path.join(process.cwd(), "public", "static");

    const filePath = `${dir}/${locale}.json`;

    const buffer = fs.readFileSync(filePath);

    const content = JSON.parse(buffer.toString());

    return {
        props: {
            content,
        },
    };
};
