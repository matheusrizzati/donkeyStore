import { useEffect, useState } from 'react'
import styles from './Configuracoes.module.css'
import apiUrl from '../../apiUrl'

function Configuracoes(props){
    // console.log(props.storeData.paymentConfig)
    const [acessToken, setAcessToken] = useState('')
    const paymentConfig = props.storeData.paymentConfig
    function getAcessToken(){
        const url = window.location.search
        let parseUrl = url.split("code=")[1]
        let code
        if (parseUrl){
            code = parseUrl.split("&")[0]
        }
        let credentials = {
        client_secret: "hUH7B4QaDzVJaKUy9QItc3knwZqIfLib",
        client_id: "7368581066289116",
        grant_type: "authorization_code",
        code,
        redirect_uri: 'https://donkey-store.vercel.app/painel'
        }
        fetch('https://api.mercadopago.com/oauth/token', {
        method: "POST",    
        body: JSON.stringify(credentials)    
        }).then(res => res.json()).then(data => setAcessToken(data.access_token))
    }
    function savePaymentConfig(){
        if(acessToken && paymentConfig && paymentConfig !== acessToken){
            let body = {
                paymentConfig: acessToken,
                isActive: true
            }
            fetch(`${apiUrl}/store/${props.storeData._id}`, {
                method:'PUT',
                headers: { 'authorization': `${props.token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            }).then(res => res.json()).then((data) => {alert("Mercado Pago configurado com sucesso"); props.fetchLoja()})
        } else{
            return false
        }
    }
    
    useEffect(() => {
        props.fetchLoja()
    },[])
    
    useEffect(() => {
        getAcessToken()
    },[])
    
    useEffect(() => {
        savePaymentConfig()
    },[acessToken, paymentConfig])

    function mercadopagoConnect(){
        window.location.assign(`https://auth.mercadopago.com/authorization?client_id=7368581066289116&response_type=code&platform_id=mp&s&state=${props.storeData._id}-configuracoes&redirect_uri=https://donkey-store.vercel.app/painel`);
    }
    
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Configurações</h1>
            </header>
            <main className={styles.mainContainer}>
                <div className={styles.paymentSection}>
                    <h2 className={styles.paymentLabel}>Email do MercadoPago<span className={styles.paymentLabel2}> Não tem conta? Clique e crie uma</span></h2>
                    <button onClick={mercadopagoConnect} className={styles.paymentButton}>Conectar com o MercadoPago</button>
                </div>
            </main>
        </div>
    )
}

export default Configuracoes