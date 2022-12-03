import React, { useEffect, useContext } from 'react'
import { UserDataContext } from '../../context/UserDataContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { decode, encode } from 'base-64'
import { onAuthStateChanged } from 'firebase/auth';
import { useAtom } from 'jotai'
import { checkedAtom, loggedInAtom } from '../../utils/atom';
import {auth, db} from "../../../firebase";
import Loading from "../../common/Loading";
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

export default function Initial() {
    const [, setChecked] = useAtom(checkedAtom)
    const [, setLoggedIn] = useAtom(loggedInAtom)
    const { setUserData } = useContext(UserDataContext)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const usersRef = doc(db, 'users', user.uid)
                onSnapshot(usersRef, (querySnapshot) => {
                    const userData = querySnapshot.data()
                    setUserData(userData)
                    setLoggedIn(true)
                    setChecked(true)
                })
            } else {
                setLoggedIn(false)
                setChecked(true)
            }
        });
    }, []);

    return (
            <Loading />
    )
}
