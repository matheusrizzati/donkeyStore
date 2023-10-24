import { useEffect, useState } from "react"
import styles from './Layouts.module.css'
import apiUrl from '../../apiUrl'

function Layouts(props){
    const [layouts, setLayouts] = useState([])
    const [selectedLayout, setSelectedLayout] = useState('')

    const showSelectedLayout = () => {
        fetch(`${apiUrl}/store/${props.storeData._id}`, {headers:{'authorization':`${props.token}`}})
        .then(res => res.json()).then((data) => {setSelectedLayout(data.layout)})
    }

    useEffect(() => {
        const fetchData = () => {
            fetch(`${apiUrl}/user/${props.storeData.ownerId}`, {headers: {'authorization':`${props.token}`}}).then(res => res.json()).then((data) => {
                setLayouts(data.layouts)
            })
        }
        fetchData()
        showSelectedLayout()
    }, [])


    const changeLayout = async(layout_name) => {
        let body = {
            layout: layout_name
        }
        fetch(`${apiUrl}/store/${props.storeData._id}`, {
            method: 'PUT',
            headers: {'authorization':`${props.token}`,
            'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }).then(
            () => {showSelectedLayout()}
        )
    }
    return(
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Layouts</h1>
            </header>
            <main className={styles.mainContainer}>
            {layouts.map( (item) => {return(
                <div key={item} className={(selectedLayout === item ? styles.selectedLayout : styles.layoutSelect)} onClick={() => {changeLayout(`${item}`)}}>
                    <img className={styles.layoutImg} />
                    <h2 className={styles.layoutName}>{item}</h2>
                    </div>
            )})}
            </main>
        </div>
    )
}

export default Layouts