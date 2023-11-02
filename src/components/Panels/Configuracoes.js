import { useEffect, useState } from 'react'
import styles from './Configuracoes.module.css'

function Configuracoes(props){
    const apiUrl = 'http://localhost:8800'

    const [paymentConfig, setPaymentConfig] = useState(
        props.storeData.paymentConfig
    )
    
    useEffect(() => {
        props.fetchLoja()
    },[])

    function savePaymentConfig(e){
        e.preventDefault()
        let body = {
            paymentConfig,
            isActive: true
        }
        fetch(`${apiUrl}/store/${props.storeData._id}`, {
            method: 'PUT',
            headers: {'authorization':`${props.token}`,
            'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }).then(
            () => {alert('Email de pagamento configurado com sucesso'); props.fetchLoja()}
        )
    }

    function mercadopagoConnect(){
        window.location.assign(`https://auth.mercadopago.com/authorization?client_id=7368581066289116&response_type=code&platform_id=mp&s&state=${props.storeData._id}-configuracoes&redirect_uri=https://donkey-store.vercel.app/`);
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Configurações</h1>
            </header>
            <main className={styles.mainContainer}>
                <div className={styles.paymentSection}>
                    <h2 className={styles.paymentLabel}>Email do MercadoPago<h3 className={styles.paymentLabel2}> Não tem conta? Clique e crie uma</h3></h2>
                    <button onClick={mercadopagoConnect} className={styles.paymentButton}>Conectar com o MercadoPago</button>
                </div>
            </main>
        </div>
    )
}

export default Configuracoes