'use client';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const User = () => {
    const authstate = useSelector((state: RootState) => state.auth);
    const router = useRouter();

    useEffect(() => {
        if (!authstate.isLoggedIn) {
            router.push("/login");
        }
    }, [])

    return (
        <div>
        </div>
    )
}

export default User