import { customInitApp } from "@/firebase/admin-config";
import { createUserWithEmailAndPassword, deleteUser, } from "firebase/auth";
import { auth } from "@/firebase/config";
import { NextResponse } from "next/server";
import { auth as authProvider } from "firebase-admin";
import { cookies } from "next/headers";
import { setDoc, addDoc, doc, collection } from "firebase/firestore";
import { db } from "@/firebase/config";
import { RegUser } from "@/components/Register/RegisterComponent";
const strongPassword = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^*-]).{8,}$");



customInitApp();

// const auth = getAuth();


export async function POST(
    request: Request
) {
    const req = await request.json();
    console.log('req body i register', req);
    console.log('req email', req.email);
    console.log('address', req.address.streetName);

    let userInformation: RegUser = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        address: {
            streetName: "",
            streetNumber: "",
            zipcode: "",
            city: "",
        }
    }

    if (!req.firstName || req.firstName.trim().length < 2 || req.firstName == null) {
        return NextResponse.json({ message: 'Something went wrong in firstName', field: 'firstName' }, {
            status: 400
        })
    } else {
        userInformation = {
            ...userInformation,
            firstName: req.firstName.trim()
        }
    }
    // console.log('userInformation i register route', userInformation)

    if (!req.lastName || req.lastName.trim().length == 0 || req.lastName == null) {
        return NextResponse.json({ message: 'Something went wrong in lastName', field: 'lastName' }, {
            status: 400
        })
    } else {
        userInformation = {
            ...userInformation,
            lastName: req.lastName.trim()
        }
    }
    // console.log('userInformation i register route', userInformation)
    // console.log('test email i register route', (!/\S+@\S+\.\S+/.test(req.email)))

    if (!req.email || (!/\S+@\S+\.\S+/.test(req.email)) || req.email == null) {
        return NextResponse.json({ message: 'Something went wrong in email', field: 'email' }, {
            status: 400
        })
    } else {
        userInformation = {
            ...userInformation,
            email: req.email.trim()
        }
    }
    // console.log('userInformation i register route', userInformation)


    if (!req.password || !strongPassword.test(req.password) || req.password == null) {
        return NextResponse.json({ message: 'Something went wrong in password', field: 'password' }, {
            status: 400
        })
    } else {
        userInformation = {
            ...userInformation,
            password: req.password
        }
    }
    // console.log('userInformation i register route', userInformation)


    if (!req.address.streetName || req.address.streetName.trim().length == 0 || req.address.streetName == null) {
        return NextResponse.json({ message: 'Something went wrong in streetName', field: 'streetName' }, {
            status: 400
        })
    } else {
        userInformation = {
            ...userInformation,
            address: {
                ...userInformation.address, streetName: req.address.streetName.trim()
            }
        }
        // updatedInformation.address = { ...updatedInformation.address, streetName: streetName }; //lösning om jag inte hade satt ett address objekt i updatedinformation
    }
    // console.log('userInformation i register route', userInformation)


    if (!req.address.streetNumber || req.address.streetNumber.trim().length == 0 || req.address.streetNumber == null) {
        return NextResponse.json({ message: 'Something went wrong in streetNumber', field: 'streetNumber' }, {
            status: 400
        })
    } else {
        userInformation = {
            ...userInformation,
            address: {
                ...userInformation.address, streetNumber: req.address.streetNumber.trim()
            }
        }
    }
    // console.log('userInformation i register route', userInformation)


    if (!req.address.zipcode || isNaN(req.address.zipcode) || req.address.zipcode.toString().length == 0 || req.address.zipcode.toString().length < 5 || req.address.zipcode == undefined) {
        return NextResponse.json({ message: 'Something went wrong in zipcode', field: 'zipcode' }, {
            status: 400
        })
        // } else if (zipcode.toString().length == 0 || zipcode == undefined) {
        //     errors.zipcode = "Postnr saknas"
        // } else if (zipcode.toString().length < 5) {
        //     errors.zipcode = "Postnummer måste vara 5 siffror"
    } else {
        userInformation = {
            ...userInformation,
            address: {
                ...userInformation.address, zipcode: req.address.zipcode
            }
        }
        // userInformation.address.zipcode = +zipcode;
        // updatedInformation.address = { ...updatedInformation.address, zipcode: +zipcode }; //lösning om jag inte hade satt ett address objekt i updatedinformation
    }
    // console.log('userInformation i register route', userInformation)


    if (!req.address.city || req.address.city.trim().length == 0 || req.address.city == undefined) {
        return NextResponse.json({ message: 'Something went wrong in city', field: 'city' }, {
            status: 400
        })
    } else {
        userInformation = {
            ...userInformation,
            address: {
                ...userInformation.address, city: req.address.city.trim()
            }
        }
        // updatedInformation.address = { ...updatedInformation.address, city: city }; //lösning om jag inte hade satt ett address objekt i updatedinformation
    }

    console.log('userInformation i register route', userInformation)
    if (userInformation) {
        try {
            let userCredential;
            try {
                userCredential = await createUserWithEmailAndPassword(auth, req.email, req.password); //TODO inte rätt auth här?
                console.log('user', userCredential.user);
                console.log(userCredential)
            } catch (error) {
                console.log('error i try catch i register route', error);
                return NextResponse.json({ message: 'Email already registered' }, { status: 409 });
            }

            if (userCredential) {
                let res;
                try {
                    console.log('i trycatch för addDoc i register route')
                    //TODO - Går något fel i addDoc, ta bort ovan nyss skapade användare
                    res = await addDoc(collection(db, "users"), {
                        // firstName: req.firstName,
                        // lastName: req.lastName,
                        // admin: false,
                        // address: {
                        //     streetName: req.address.streetName,
                        //     streetNumber: req.address.streetNumber,
                        //     zipcode: req.address.zipcode,
                        //     city: req.address.city
                        // },
                        // userId: userCredential.user.uid
                        firstName: userInformation.firstName,
                        lastName: userInformation.lastName,
                        admin: false,
                        address: {
                            streetName: userInformation.address.streetName,
                            streetNumber: userInformation.address.streetNumber,
                            zipcode: userInformation.address.zipcode,
                            city: userInformation.address.city
                        },
                        userId: userCredential.user.uid
                    });

                } catch (error) {
                    console.log('error i addDoc i register route', error);
                    const user = auth.currentUser;
                    console.log('user i register route', user);
                    if (user) {
                        try {
                            await deleteUser(user);
                            console.log('user deleted');
                            return NextResponse.json({ message: 'Something went wrong when saving user information, user was deleted' }, { status: 400 });
                        } catch (error) {
                            console.log('error i deleteUser i register route', error)
                            return NextResponse.json({ message: 'Something went wrong when deleting user' }, { status: 400 });
                        }
                        // deleteUser(user).then(() => {
                        //     console.log('user deleted');
                        //     return NextResponse.json({ message: 'Something went wrong when saving user information, user deleted' }, { status: 400 }); //Kan inte göra return i en then catch
                        // }).catch((error) => {
                        //     console.log('error i deleteUser i register route', error)
                        //     return NextResponse.json({ message: 'Something went wrong when deleting user' }, { status: 400 });
                        // })
                    } else {
                        console.log('user finns inte', user);
                        return NextResponse.json({ message: 'Something went wrong when deleting user, no user found' }, { status: 400 });
                    }
                }

                console.log('new user document with autogenerated id', res?.id)
                //låt ligga i mamma trycatchen
                if (res?.id) {
                    console.log('i if sats för cookie')
                    const idToken = await userCredential.user.getIdToken();
                    const expiresInSec = 60 * 60 * 24 * 5; //seconds for nextjs
                    const expiresInMsec = expiresInSec * 1000; //milliseconds for db
                    const sessionCookie = await authProvider().createSessionCookie(idToken, {
                        expiresIn: expiresInMsec,
                    });
                    const options = {
                        name: "session",
                        value: sessionCookie,
                        maxAge: expiresInSec,
                        httpOnly: true,
                        secure: true,
                    };
                    console.log('sessionCookie i register route', sessionCookie)
                    console.log('uid för nyreggad användare i register route', userCredential.user.uid)
                    //Add the cookie to the browser
                    cookies().set(options);
                    return NextResponse.json(userCredential.user, {
                        status: 200
                    })
                } else {
                    return NextResponse.json({ message: 'Something went wrong with creating cookie in register route' }, {
                        status: 400
                    })
                }

            } else {
                return NextResponse.json({ message: 'Something went wrong in register route' }, {
                    status: 400
                })
            }

        } catch (error) {
            console.log('error i try catch i register route', error);
            return NextResponse.json({ message: 'Something went wrong in register' }, { status: 400 });
        }

    } else {
        return NextResponse.json({ message: 'Something went wrong in register' }, {
            status: 400
        })
    }
    // return NextResponse.json(/*userCredential.user,*/ {
    //     status: 200
    // })
}
