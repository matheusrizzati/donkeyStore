import { useEffect, useState } from 'react';
import styles from './BasicLight.module.css'
import Cart from '../Cart'
const cartSVG = <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.33331 5.66663C3.33331 5.40141 3.43867 5.14706 3.62621 4.95952C3.81374 4.77198 4.0681 4.66663 4.33331 4.66663H5.07731C6.34398 4.66663 7.10398 5.51863 7.53731 6.31063C7.82665 6.83863 8.03598 7.45063 8.19998 8.00529C8.24434 8.00179 8.28882 8.00001 8.33331 7.99996H24.9973C26.104 7.99996 26.904 9.05863 26.6 10.124L24.1626 18.6693C23.9441 19.4358 23.4818 20.1102 22.8457 20.5904C22.2096 21.0706 21.4343 21.3304 20.6373 21.3306H12.7066C11.9033 21.3307 11.1222 21.0669 10.4833 20.5798C9.84451 20.0927 9.38331 19.4093 9.17065 18.6346L8.15731 14.9386L6.47731 9.27463L6.47598 9.26396C6.26798 8.50796 6.07331 7.79996 5.78265 7.27196C5.50398 6.75863 5.27998 6.66663 5.07865 6.66663H4.33331C4.0681 6.66663 3.81374 6.56127 3.62621 6.37373C3.43867 6.1862 3.33331 5.93184 3.33331 5.66663ZM12 28C12.7072 28 13.3855 27.719 13.8856 27.2189C14.3857 26.7188 14.6666 26.0405 14.6666 25.3333C14.6666 24.626 14.3857 23.9478 13.8856 23.4477C13.3855 22.9476 12.7072 22.6666 12 22.6666C11.2927 22.6666 10.6145 22.9476 10.1144 23.4477C9.61426 23.9478 9.33331 24.626 9.33331 25.3333C9.33331 26.0405 9.61426 26.7188 10.1144 27.2189C10.6145 27.719 11.2927 28 12 28ZM21.3333 28C22.0406 28 22.7188 27.719 23.2189 27.2189C23.719 26.7188 24 26.0405 24 25.3333C24 24.626 23.719 23.9478 23.2189 23.4477C22.7188 22.9476 22.0406 22.6666 21.3333 22.6666C20.6261 22.6666 19.9478 22.9476 19.4477 23.4477C18.9476 23.9478 18.6666 24.626 18.6666 25.3333C18.6666 26.0405 18.9476 26.7188 19.4477 27.2189C19.9478 27.719 20.6261 28 21.3333 28Z" fill="black"/></svg>

function BasicLight(props){
    const apiUrl = 'http://localhost:8800'

    const [categorys, setCategorys] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')
    const [produtos, setProdutos] = useState([])
    const [cart, setCart] = useState(false)

    const fetchCategorys = async () => {
        try {
          const response = await fetch(`${apiUrl}/category/?storeId=${props.storeData._id}`, {
            headers: { 'authorization': `${props.token}` }
          });
          const data = await response.json();
          setCategorys(data);
        } catch (error) {
          // Handle fetch error here
          console.error('Error fetching category data:', error);
        }
      };    
    useEffect(() => {      
        fetchCategorys()
    }, [])

    async function showProducts(categoryId){
        const response = await fetch(`${apiUrl}/product/?storeId=${props.storeData._id}${(categoryId !== '' ? `&category=${categoryId}`: '')}&isActive=true`, {
            headers: { 'authorization': `${props.token}` }
        });
        const data = await response.json();
        setProdutos(data);
    }

    useEffect(() => {
        showProducts(selectedCategory);
    }, [selectedCategory]);

    function getCartItens(){
        const produtos = localStorage.getItem(`cart${props.storeData._id}`)
        if (produtos === null) {
            return []
        } else{
            return JSON.parse(produtos)
        }
    }

    function addItemToCart(produto){
        const produtos = getCartItens()
        const index = produtos.findIndex(item => item.id === produto._id); 
        if(index !== -1){
            produtos[index].quantity += 1
        }else{
            produtos.push({
                id: produto._id,
                name: produto.name,
                price: produto.price,
                quantity: 1
            })
        }
        localStorage.setItem(`cart${props.storeData._id}`, JSON.stringify(produtos))
        // localStorage.removeItem(`cart${props.storeData._id}`)
        console.log(getCartItens())
    }

    useEffect(() =>{getCartItens()},[])

    return(
        <>
        {cart && <Cart closeCart={() => {setCart(false)}} storeData={props.storeData}/>}
        <header className={styles.header}>
            <h2 onClick={() => {setSelectedCategory('')}} className={styles.headerLogo}>LOGO</h2>
            <div className={styles.categorys}>
            {categorys.map(item => (<h2 key={item._id} className={styles.categoryItem} onClick={() => {setSelectedCategory(item._id)}}>{item.name}</h2>))}
            </div>
            <h2 className={styles.cart} onClick={() => {setCart(!cart)}}>{cartSVG}</h2>
        </header>
        <main className={styles.main}>
            {produtos && produtos.length !== 0 && produtos.map(item => (
                <div key={item._id} className={styles.itemContainer}>
                <h2 className={styles.title}>{item.name}</h2>
                <img className={styles.image} alt='Produto sem foto' src={item.image} />
                <h2 className={styles.price}>R${(item.price).toFixed(2)}</h2>
                <button className={styles.addCart} onClick={() => {addItemToCart(item); setCart(true)}}>Comprar</button>
                </div>
            ))}
        </main>
        </>
    )
}  

export default BasicLight