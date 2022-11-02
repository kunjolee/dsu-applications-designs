import Head from 'next/head';
import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode | ReactNode[];
    title: string;
    description: string;
    goBack?: string;
}

const AppLayout = ({ children, description, title, goBack }: Props) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name='description' content={description} />
                <meta name='og:title' content={title} />
                <meta name='og:description' content={description} />
            </Head>
            {goBack && (
                <Link href='/' passHref>
                    <a
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            backgroundColor: '#fff',
                            color: '#f01b29',
                            padding: '1rem',
                        }}
                    >
                        {goBack}
                    </a>
                </Link>
            )}
            <main style={{ padding: '2rem' }}>{children}</main>
        </>
    );
};
export default AppLayout;
