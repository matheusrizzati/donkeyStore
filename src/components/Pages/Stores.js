import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Stores.module.css'
const addSvg = <svg style={{marginRight: '8px'}} width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 45C35.598 45 45 35.598 45 24C45 12.402 35.598 3 24 3C12.402 3 3 12.402 3 24C3 35.598 12.402 45 24 45Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M15 24H33" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M24 15V33" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> 
const userSvg = <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6.66675C21.7681 6.66675 23.4638 7.36913 24.7141 8.61937C25.9643 9.86961 26.6667 11.5653 26.6667 13.3334C26.6667 15.1015 25.9643 16.7972 24.7141 18.0475C23.4638 19.2977 21.7681 20.0001 20 20.0001C18.2319 20.0001 16.5362 19.2977 15.286 18.0475C14.0357 16.7972 13.3334 15.1015 13.3334 13.3334C13.3334 11.5653 14.0357 9.86961 15.286 8.61937C16.5362 7.36913 18.2319 6.66675 20 6.66675ZM20 23.3334C27.3667 23.3334 33.3334 26.3167 33.3334 30.0001V33.3334H6.66669V30.0001C6.66669 26.3167 12.6334 23.3334 20 23.3334Z" fill="#535353"/></svg>

function Stores(){
    const apiUrl = 'http://localhost:8800'
    // const apiUrl = 'https://donkey-api.vercel.app'
    const navigate = useNavigate()
    const token = localStorage.getItem('token') 
    

    useEffect(() => {
        if (!token)
            return navigate("/login")
    }, [])  
    
    const [accountMenu, setAccountMenu] = useState(false)
    const [modal, setModal] = useState(false)
    
    const [stores, setStores] = useState([])
    const [storeName, setStoreName] = useState('')
    const [url, setUrl] = useState('')
    
    async function handleSubmit(e){
        e.preventDefault()
        try{
            await fetch(`${apiUrl}/store`, {
                method: 'POST',
                headers: {
                    'authorization': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({storeName, url})
            }).then(res => res.json()).then((data) => {
                alert(data.msg)
                if(data.msg === 'Loja criada com sucesso'){
                    setModal(false)
                    setStoreName('')
                    setUrl('')
                }
            })
        }catch(err){
            alert(err)
        }
    }

    function logout(){
        localStorage.removeItem('token')
        return navigate("/login")
    }

    useEffect(() => {
        fetch(`${apiUrl}/store`,{headers: {'authorization':token}})
        .then(res => res.json())
        .then(data => setStores(data))
    },[modal, token])
    
    return(
        <>
        {accountMenu &&
        <div className={styles.accountMenu}>
            <h4 className={styles.accountMenuItem} onClick={logout}>Sair</h4>
        </div>
        }
        {modal &&
        <div className={styles.modalOver}>
            <div className={styles.modalContainer}>
                <div className={styles.modalHeader}>
                    <h3 className={styles.modalTitle}>Criar loja</h3>
                    <h3 className={styles.modalTitleCancel} onClick={()=>{setModal(false)}}>X</h3>
                </div>
                <form className={styles.modalForm} onSubmit={handleSubmit}>
                    <div className={styles.modalInputGroup}>
                    <label className={styles.modalLabel}>Nome da loja</label>
                    <input type='text' className={styles.modalInput} value={storeName} onChange={(e) => {setStoreName(e.target.value)}}/>
                    <label className={styles.modalLabel}>Sua URL</label>
                    <input type='text' className={styles.modalInput} value={url} onChange={(e) => {setUrl(e.target.value)}}/>
                    </div>
                    <div className={styles.modalButtons}>
                        <button className={styles.modalCancel} onClick={()=>{setModal(false)}}>Cancelar</button>
                        <button className={styles.modalCreate} type='submit'>Criar</button>
                    </div>
                </form>
            </div>
        </div>
        }
        <header className={styles.header}>
            <span></span>
            <h1>Logo</h1>
            <div onClick={() => {setAccountMenu(!accountMenu)}}>{userSvg}</div>
        </header>
        <main className={styles.container}>
            <h2 className={styles.containerTitle}>Minhas lojas</h2>
            {stores.length !== 0 ?
            (
                <div className={styles.containerGrid}>
                    {stores.map(item => (<button key={item._id} className={styles.storeButton} onClick={() => {navigate("/lojas/"+item._id)}}>{item.storeName}</button>))}
                    <button className={styles.storeButton} onClick={()=>{setModal(true)}}>{addSvg}Criar loja</button>
                </div>
            ):
            (
                <div className={styles.zeroGrid}>
                    <h3 className={styles.zeroTitle}>Você ainda não criou nenhuma loja...</h3>
                    <button className={styles.zeroCreateButton} onClick={()=>{setModal(true)}}>{addSvg}Criar nova loja</button>
                </div>
            )
            }
            
        </main>
        </>
    )
}

export default Stores