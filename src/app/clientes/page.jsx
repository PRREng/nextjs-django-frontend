"use client"
import { useAuth } from '@/components/authProvider';
import { useEffect } from 'react';
import useSWR from 'swr';



const fetcher = async url => {
    const res = await fetch(url);

    if (!res.ok) {
        const error = new Error('An error occurred while fetching the data.');

        error.info = await res.json();
        error.status = res.status;
        throw error;
    }
    return res.json();
}

const CLIENTES_API_URL = "/api/clientes/"

export default function Page() {

    const { data, error, isLoading } = useSWR(CLIENTES_API_URL, fetcher);
    const auth = useAuth();

    useEffect(() => {
        if (error?.status === 401) {
            auth.loginRequiredRedirect();
        }
    }, [auth, error]);

    if (error) return <div>failed to load</div>;
    if (isLoading) return <div>loading...</div>;

    return (
        <main className='flex min-h-screen flex-col items-center justify-between p-24'>
            <div>
                {JSON.stringify(data)}
            </div>
        </main>
    )

}