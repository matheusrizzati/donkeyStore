import styles from './Checkout.module.css'
import { maskCPF } from '../../items/masks';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import apiUrl from '../../../apiUrl';
import axios from 'axios';

function Checkout() {
    const location = useLocation();
    const storeData = location.state.storeData
    const itens = location.state.itens
    const subtotal = location.state.subtotal

    const [step, setStep] = useState(1)
    const [cupomError, setCupomError] = useState(false)
    const [cupomData, setCupomData] = useState()
    const [cupomCode, setCupomCode] = useState('')

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [cpf, setCpf] = useState('')
    const [serverId, setServerId] = useState('')

    function addCupom() {
        fetch(`${apiUrl}/cupom?name=${cupomCode}`).then(setCupomError(false)).then(res => res.json()).then((data) => { if (data.length === 0) { setCupomError(true) } else { setCupomData(data[0]); setCupomError(false) } })
    } 

    function createPreference(){
    console.log("preference")

    let body = {
        items: 
            itens.map((item) => {return {
                id: item.id,
                title: item.name,
                picture_url: item.image,
                quantity: item.quantity,
                unit_price: item.price,
                currency_id: 'BRL'
            }}),
        payer:{
            name,
            email
        },
        back_urls:{
            success: 'http://localhost:3000/checkout',
            failure: '',
            pending: ''
        },
        auto_return: 'approved',
        binary_mode: true,
    }

        fetch('https://api.mercadopago.com/checkout/preferences', {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' +  `${storeData.paymentConfig}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(res => res.json()).then(data => window.location.assign(data.init_point))
    }

    return (
        <div className={styles.container}>
            <div className={styles.resumeContainer}>
                <ul className={styles.list}>
                    {itens.map(item => (
                        <li className={styles.item} key={item.id}>
                            <img src={item.image} alt='sem foto' className={styles.itemImg}/>
                            <div className={styles.itemPart}>
                                    <div className={styles.itemPart1}>
                                        <h2 className={styles.itemName}>{item.name}</h2>
                                        <h2 className={styles.itemName2}>{item.quantity}</h2>
                                    </div>
                                    <div className={styles.itemPart2}>
                                        <h2 className={styles.itemName}>R${(item.price * item.quantity).toFixed(2)}</h2>
                                        {item.quantity > 1 ? <h2 className={styles.itemName2}>R${item.price.toFixed(2)}/un</h2> : <h2> </h2>}
                                    </div>
                                </div>
                        </li>
                    ))}
                </ul>
                <div className={styles.cupom}>
                    <input type='text' placeholder="Código do cupom" value={cupomCode} onChange={(e) => { setCupomCode(e.target.value) }} />
                    <button onClick={addCupom}>Adicionar</button>
                </div>
                    {cupomError && <h2 className={styles.cupomError}>Cupom expirado ou invalido</h2>}
                <div className={styles.footer}>
                    <div className={styles.subtotal}>
                        <h2>Subtotal</h2>
                        <h2>R${subtotal.toFixed(2)}</h2>
                    </div>
                    {cupomData && 
                    <div className={styles.footerCupom}>
                        <div>
                        <h3 className={styles.cupomRemove} onClick={() => {setCupomData()}}>X</h3>
                        <h2>{cupomData.name}</h2>
                        </div>
                        <h2>- R${cupomData.isInteger ?
                        (cupomData.integerValue).toFixed(2):
                        (cupomData.percentage*subtotal).toFixed(2)    
                        }</h2>
                    </div>}
                    <div className={styles.total}>
                        <h2>Total</h2>
                        <h2>R${cupomData ? (cupomData.isInteger ? (subtotal - cupomData.integerValue).toFixed(2) : ((subtotal - (cupomData.percentage*subtotal)).toFixed(2))) : subtotal.toFixed(2)}</h2>
                    </div>
                </div>
            </div>
            <div className={styles.stepContainer}>
                <div className={styles.stepProgress}>
                    <div onClick={() => { setStep(1) }} className={(step >= 1 ? styles.stepProgressItemSelected : styles.stepProgressItem)}>
                        <div />
                        <h2>Dados</h2>
                    </div>
                    {/* <h2>-</h2> */}
                    {/* <div onClick={(!name || !email || !cpf || !serverId) ? () => {alert("Preencha seus dados para prosseguir")} : () => { setStep(2) }} style={(!name || !email || !cpf || !serverId) ? {cursor: 'not-allowed'}: {cursor: 'pointer'}} className={(step >= 2 ? styles.stepProgressItemSelected : styles.stepProgressItem)}>
                        <div/>
                        <h2>Pagamento</h2>
                    </div> */}
                </div>
                {step === 1 && <div className={styles.step}>
                    <label>Nome</label>
                    <input type='text' value={name} onChange={(e) => {setName(e.target.value)}}/>
                    <label>Email</label>
                    <input type='text' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                    {/* <label>CPF</label>
                    <input type='text' maxLength={14} value={cpf} onChange={(e) => {setCpf(maskCPF(e.target.value))}}/> */}
                    <label>ID no servidor</label>
                    <input type='text' value={serverId} onChange={(e) => {setServerId(e.target.value)}}/>
                    <div>
                    <button disabled={!name || !email || !serverId} onClick={createPreference}>Realizar pagamento</button>
                    </div>
                </div>}
                {/* {step === 2 && <div>
                    <h2>Step 2</h2>
                </div>} */}
            </div>
        </div>
    )
}

export default Checkout