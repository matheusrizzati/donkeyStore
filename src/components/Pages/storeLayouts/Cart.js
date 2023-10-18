import { useEffect, useState } from 'react'
import styles from './Cart.module.css'

function Cart(props) {
    const [itens, setItens] = useState([])

    function getCartItens() {
        const produtos = localStorage.getItem(`cart${props.storeData._id}`)
        if (produtos === null) {
            setItens([])
        } else {
            setItens(JSON.parse(produtos));
        }
    }

    function removeCartItem(id){
        const produtos = itens
        const index = produtos.findIndex(item => item.id === id); 
        produtos.splice(index, 1)
        localStorage.setItem(`cart${props.storeData._id}`, JSON.stringify(produtos))
        getCartItens()
    }

    function removeQuantity(id){
        const produtos = itens
        const index = produtos.findIndex(item => item.id === id); 
        if(produtos[index].quantity > 1){
            produtos[index].quantity -= 1
        } else{
            produtos.splice(index, 1)
        }
        localStorage.setItem(`cart${props.storeData._id}`, JSON.stringify(produtos))
        getCartItens()
    }
    
    function addQuantity(id){
        const produtos = itens
        const index = produtos.findIndex(item => item.id === id); 
        produtos[index].quantity += 1
        localStorage.setItem(`cart${props.storeData._id}`, JSON.stringify(produtos))
        getCartItens()
    }

    useEffect(() => {
        getCartItens()
    }, [])

    return (
        <div className={styles.over}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h2 className={styles.headerTitle}>Carrinho</h2>
                    <h2 className={styles.headerClose} onClick={() => { props.closeCart() }}>X</h2>
                </header>
                {itens && itens.length !== 0 &&
                    <ul className={styles.itemList}>
                        {itens.map(item => (
                            <li key={item.id} className={styles.item}>
                                <img src={item.image} alt='Sem foto' className={styles.itemImg} />
                                <div className={styles.itemPart}>
                                    <div className={styles.itemPart1}>
                                        <h2 className={styles.itemName}>{item.name}</h2>
                                        <h2 className={styles.itemName}><span className={styles.operator} onClick={() => {removeQuantity(item.id)}}>-</span> {item.quantity} <span className={styles.operator} onClick={() => {addQuantity(item.id)}}>+</span></h2>
                                    </div>
                                    <div className={styles.itemPart2}>
                                        <h2 className={styles.itemPrice}>R${(item.price).toFixed(2)}</h2>
                                        <h2 className={styles.itemRemove} onClick={() => {removeCartItem(item.id)}}>Remover</h2>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>}
                    <footer className={styles.footer}>
                    <div className={styles.subtotal}>
                        <h2 className={styles.subtotalTitle}>Subtotal:</h2>
                        <h2 className={styles.subtotalValue}>R$ {itens.reduce((acc, item) => acc + (item.quantity * item.price), 0).toFixed(2)}</h2>
                    </div>
                    <button className={styles.checkoutButton}>Finalizar compra</button>
                    </footer>
            </div>
        </div>
    )
}

export default Cart
