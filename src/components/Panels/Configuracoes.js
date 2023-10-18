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

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Configurações</h1>
            </header>
            <main className={styles.mainContainer}>
                <div className={styles.paymentSection}>
                    <h2 className={styles.paymentLabel}>Email do MercadoPago<h3 className={styles.paymentLabel2}> Não tem conta? Clique e crie uma</h3></h2>
                    <input type='text' value={paymentConfig} onChange={(e) => {setPaymentConfig(e.target.value)}} className={styles.paymentInput}/>
                    <button onClick={savePaymentConfig} className={styles.paymentButton}>Salvar</button>
                </div>
            </main>
        </div>
    )
}

export default Configuracoes