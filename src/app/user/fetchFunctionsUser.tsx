import { Order } from "@/types/Order.types"
import { UserInformation } from "./settings/edit-information/page";
import { User } from '@/types/User.types'
import { RegUser } from "@/components/Register/RegisterComponent";

export const getOrderHistory = async (): Promise<Order[] | undefined> => {
    // try {
    const res = await fetch('/api/getorderhistory', {
        next: {
            revalidate: 120
        }
    });
    if (res.status !== 200) {
        throw new Error('Something went wrong');
    } else {
        const data = await res.json();
        console.log('data in getorderhistory', data);
        return data;
    }
    // } catch (error) {
    //     console.log('error in getorderhistory', error);
    // }
}

export const updateUserInformation = async (id: string, newData: UserInformation) => {
    try {
        const res = await fetch('/api/updateuser', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                newData: newData
            })
        })
        // const data = await res.json();
        // console.log('response data i updateuserinformation', data);
        // return data;
        console.log('res i updateuserinformation', res);
        // if (res.status !== 200) {
        //     // throw new Error(data.message);
        //     return res;
        // } else {
        return res;
        // }
    } catch (error) {
        console.log('error i updateUserInformation', error);
    }
}

export const loginUser = async (email: string, password: string) => {
    console.log('i loginUser');
    // try {
    const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    })
    // if (res.status !== 200) {
    //     console.log('error i loginuser')
    //     throw new Error('Something went wrong with login');
    // } else {
    //     const data = await res.json();
    //     console.log('data i loginUser', data);
    //     return data;
    // }
    return res;
    // return NextResponse.json(data);
    // } catch (error) {
    //     console.log('error i loginUser', error);
    // }
}

// export const registerUser = async (email: string, password: string) => {
export const registerUser = async (userData: RegUser) => {
    // try {
    const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            // userData
            email: userData.email,
            password: userData.password,
            firstName: userData.firstName,
            lastName: userData.lastName,
            address: {
                streetName: userData.address.streetName,
                streetNumber: userData.address.streetNumber,
                zipcode: userData.address.zipcode,
                city: userData.address.city
            }
            // email: "test@test.com ",
            // password: "hejHej22!",
            // firstName: "  abc",
            // lastName: " hej ",
            // address: {
            //     streetName: "Testgatan",
            //     streetNumber: "11A",
            //     zipcode: 12334,
            //     city: "h j"
            // }
            // email: email,
            // password: password,
        }),
    })
    // const data = await res.json();
    // if (res.status === 400) {
    //     throw new Error(data.message);
    // } else {
    // const data = await res.json();
    console.log('data i registerUser', res);
    return res;
    // }
    // return NextResponse.json(data);
    // } catch (error) {
    //     console.log('error i registerUser', error);
    // }
}

export async function logoutUser() {
    const response = await fetch('/api/logout', {
        method: 'POST',
    });
    if (response.status === 200) {
        console.log('logout successful');
        return response;
    } else {
        throw new Error('Someting went wrong with logout');
    };
};

export const getUserData = async (): Promise<User[] | undefined> => {
    // try {
    const res = await fetch('/api/getuserdata', {
        next: {
            revalidate: 120
        }
    });
    if (res.status !== 200) {
        throw new Error('Someting went wrong')
    } else {
        const data = await res.json();
        console.log('data in getuserdata', data);
        return data;
    }
    // } catch (error) {
    //     console.log('error in getuserdata', error);
    // }
}