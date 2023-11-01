import { db } from "@/firebase/config";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(request: NextRequest, response: NextResponse) {
    // const headersList = headers();
    // const userId = headersList.get('userid');
    // console.log('userId in getuserdata route', userId);
    // const findUser = query(collection(db, 'users'), where("userId", "==", userId));
    // const userData = await getDocs(findUser);

    const reqBody = await request.json();
    console.log('reqBody in updateuser route', reqBody);
    const { id, newData } = reqBody;
    console.log('newData', newData);
    const userDoc = doc(db, 'users', id); //TODO kan inte använda userId men borde inte använda id heller. Vad göra?
    console.log('number of keys in newdata', Object.keys(newData).length);
    const numberOfKeysInNewData = Object.keys(newData).length + Object.keys(newData.address).length;
    console.log('number of keys in numberOfKeysInNewData', numberOfKeysInNewData);
    let newUserInformation = {};
    if (numberOfKeysInNewData > 1) {
        if ((newData.firstName || newData.firstName == "") && newData.firstName !== null) {
            if (newData.firstName.trim().length !== 0) {
                newUserInformation = {
                    ...newUserInformation,
                    firstName: newData.firstName.trim()
                }
            } else {
                return NextResponse.json({ message: 'Something went wrong in firstName', field: 'firstName' }, {
                    status: 412
                })
            }
        }
        if ((newData.lastName || newData.lastName == "") && newData.lastName !== null) {
            if (newData.lastName.trim().length !== 0) {
                newUserInformation = {
                    ...newUserInformation,
                    lastName: newData.lastName.trim()
                }
            } else {
                return NextResponse.json({ message: 'Something went wrong in lastName', field: 'lastName' }, {
                    status: 412
                })
            }
        }
        if ((newData.address?.streetName || newData.address?.streetName == "") && newData.address?.streetName !== null) {
            if (newData.address.streetName.trim().length !== 0) {
                newUserInformation = {
                    ...newUserInformation,
                    "address.streetName": newData.address.streetName.trim()
                }
            } else {
                return NextResponse.json({ message: 'Something went wrong in streetName', field: 'streetName' }, {
                    status: 412
                })
            }
        }
        if ((newData.address?.streetNumber || newData.address?.streetNumber == "") && newData.address?.streetNumber !== null) {
            if (newData.address.streetNumber.trim().length !== 0) {
                newUserInformation = {
                    ...newUserInformation,
                    "address.streetNumber": newData.address.streetNumber.trim()
                }
            } else {
                return NextResponse.json({ message: 'Something went wrong in streetNumber', field: 'streetNumber' }, {
                    status: 412
                })
            }
        }
        // if (newData.address?.zipcode && newData.address.zipcode.toString().trim().length === 5) {
        // && newData.address.zipcode.toString().trim().length === 5) {
        // const zipcode = newData.address.zipcode.replace(/\s+/g, "");

        // if (newData.address?.zipcode == null) { //TODO varför blir det null när jag har mellanslag i postnumret?
        //     return NextResponse.json({ message: 'Something went wrong in zipcode', field: "zipcode" }, {
        //         status: 409
        //     })
        // }
        // if (newData.address?.zipcode || newData.address?.zipcode == null) { //TODO fungerar inte, blir 500 men varför? Fångas inte upp i catchen heller.
        // if (newData.address?.zipcode || newData.address?.zipcode == 0) {
        console.log("newData.address.zipcode", newData.address?.zipcode);
        console.log("newData.address.zipcode == 0", newData.address?.zipcode == 0);
        console.log("newData.address.zipcode !== null", newData.address?.zipcode !== null);
        console.log("newData.address.zipcode != null", newData.address?.zipcode != null);

        if ((newData.address?.zipcode || newData.address?.zipcode == 0) && newData.address?.zipcode !== null) { //Förklaring - ska inte gå in här om värdet är null, då ska det ignoreras bara.
            console.log('zipcode', newData.address.zipcode);
            const zipcode = newData.address.zipcode.toString().trim().replace(/\s+/g, "");
            console.log("zipcode som string, trimmad och utan mellanslag", zipcode);
            console.log('zipcode konverterat till nummer', +zipcode);
            // if (zipcode.length !== 5 || isNaN(zipcode) || zipcode == null) { //TODO fungerar inte, varför?
            if (zipcode.length !== 5 || isNaN(zipcode)) {
                return NextResponse.json({ message: 'Something went wrong in zipcode', field: 'zipcode' }, {
                    status: 412
                })
            } else {
                newUserInformation = {
                    ...newUserInformation,
                    "address.zipcode": newData.address.zipcode
                }
            }
            // else {
            // return NextResponse.json({error: 'zipcode'}, {
            //     status: 406
            // })
        }
        // else if (newData.address?.zipcode == null) { //TODO blir null med mellanslag och kollar jag om den är null så kommer den alltid gå in här eftersom zipcode kommer vara null när det inte är ifyllt
        //     return NextResponse.json({ message: 'Something went wrong in zipcode', field: "zipcode" }, {
        //         status: 406
        //     })
        // }
        if ((newData.address?.city || newData.address?.city == "") && newData.address?.city !== null) {
            if (newData.address.city.trim().length !== 0) {
                newUserInformation = {
                    ...newUserInformation,
                    "address.city": newData.address.city.trim()
                }
            } else {
                return NextResponse.json({ message: 'Something went wrong in city', field: 'city' }, {
                    status: 412
                })
            }
        }
    } else {
        return NextResponse.json({ message: 'received no new information' }, {
            status: 400
        })
    }
    console.log('newUserInformation i updateUser route', newUserInformation);
    if (newUserInformation) { //TODO lägga till check för null?
        await updateDoc(userDoc, newUserInformation);
        return NextResponse.json({
            status: 200
        })
    } else {
        return NextResponse.json({
            status: 400
        })
    }
}