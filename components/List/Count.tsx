import {useContext} from 'react'
import BeerCollectionContext from "@/store/store"

export default function Count() {
    const ctx = useContext(BeerCollectionContext)
    return <p>Your collection counts <b>{ctx.defaultData.length}</b> bottles</p>
}