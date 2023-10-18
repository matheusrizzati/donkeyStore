import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import ErrorPage from './ErrorPage'
import BasicDark from './storeLayouts/BasicDark/BasicDark'
import BasicLight from './storeLayouts/Basic Light/BasicLight'
import TesteLayout from './storeLayouts/TesteLayout'

function ClientStore(){
    const apiUrl = 'http://localhost:8800'
    const {url} = useParams()

    const [storeData, setStoreData] = useState()
    useEffect(() =>{
        const fetchData = () => {
            fetch(`${apiUrl}/store/url/${url}`).then(res => res.json()).then((data) => {
                setStoreData(data)
            })
        }
        fetchData()
    }, [])

    const setLayout = (layout) => {
        switch(layout){
            case 'basicLight':
                return <BasicLight storeData={storeData}/>
            case 'basicDark':
                return <BasicDark storeData={storeData}/>
            case 'teste':
                return <TesteLayout />
            default:
                <ErrorPage />
        }
    }
    return(
        <>
        {!storeData ? <ErrorPage />:
            setLayout(storeData.layout)
        }
        </>
    )
}

export default ClientStore