import React from 'react'
import { useAtom } from 'jotai'
import { checkedAtom, loggedInAtom } from '../utils/atom'
import Initial from "../screens/Initial/Initial";
import Navigation from "./Navigation";

const Routes = () => {
    const [checked] = useAtom(checkedAtom)
    const [loggedIn] = useAtom(loggedInAtom)

    console.log('[##] loggedIn', loggedIn)

    // rendering
    if (!checked) {
        return <Initial />
    }

    return <Navigation />
}

export default Routes
