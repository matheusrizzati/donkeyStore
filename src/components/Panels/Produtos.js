import { useEffect, useState } from 'react'
import styles from './Cupoms.module.css'
import modalStyles from '../items/Modal.module.css'
import apiUrl from '../../apiUrl'
import axios from 'axios'

function Produtos(props) {
    const [produtos, setProdutos] = useState([])
    const [modal, setModal] = useState(false)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(null)
    const [limited, setLimited] = useState(true)
    const [quantity, setQuantity] = useState(null)
    const [categorys, setCategorys] = useState([])
    const [category, setCategory] = useState(null)
    const [isActive, setIsActive] = useState(true)
    const [image, setImage] = useState()

    const fetchProdutos = async () => {
        try {
          const response = await fetch(`${apiUrl}/product/?storeId=${props.storeData._id}`, {
            headers: { 'authorization': `${props.token}` }
          });
          const data = await response.json();
          setProdutos(data);
        } catch (error) {
          // Handle fetch error here
          console.error('Error fetching cupoms data:', error);
        }
      };
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
        fetchProdutos()
        fetchCategorys()
    }, [modal])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!limited){
            setQuantity(null)
        }

        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', price)
        formData.append('limited', limited)
        formData.append('quantity', quantity)
        formData.append('category', category)
        formData.append('isActive', isActive)
        formData.append('file', image)
        formData.append('storeId', props.storeData._id)
        const body = {
            name, price, limited, quantity, category, isActive, image, storeId: props.storeData._id
        }

        axios.post(`${apiUrl}/product`, formData, {headers: {authorization: props.token}}).then(res => setModal(false))

    //     fetch(`${apiUrl}/product`, {
    //         method: 'POST',
    //         headers: { 'authorization': `${props.token}`, 'Content-Type': 'application/json' },
    //         body: formData
    //     }).then(res => res.json()).then((data) => {alert(data.msg); setModal(false)})
    }

    const deleteProduct = async(id) => {
        fetch(`${apiUrl}/product/${id}`, { method: 'DELETE', headers: { 'authorization': `${props.token}` } }).then(
            () => {fetchProdutos()}
        )
    }

    return (
        <div className={styles.container}>
            {modal &&
                <div className={modalStyles.modalOver}>
                    <div className={modalStyles.modalContainer}>
                        <div className={modalStyles.modalHeader}>
                            <h3 className={modalStyles.modalTitle}>Criar produto</h3>
                            <h3 className={modalStyles.modalTitleCancel} onClick={() => { setModal(false) }}>X</h3>
                        </div>
                        <form className={modalStyles.modalForm} onSubmit={handleSubmit}>
                            <div className={modalStyles.modalInputGroup}>
                                <label className={modalStyles.modalLabel}>Nome do produto</label>
                                <input type='text' className={modalStyles.modalInput} value={name} onChange={(e) => { setName(e.target.value) }} />
                                <label className={modalStyles.modalLabel}>Preço</label>
                                <input type='text' className={modalStyles.modalInput} value={price} onChange={(e) => { setPrice(e.target.value) }} />
                                <div className={styles.checkbox}>
                                <input type='checkbox' className={modalStyles.modalInput} checked={!limited} onChange={(e) => { setLimited(!limited) }} />
                                <label className={modalStyles.modalLabel}>Produto ilimitado? (Sem estoque)</label>
                                </div>
                                {limited &&
                                    <>
                                    <label className={modalStyles.modalLabel}>Quantidade em estoque</label>
                                    <input type='text'  className={modalStyles.modalInput} value={quantity} onChange={(e) => { setQuantity(e.target.value) }} />
                                    </>
                                }
                                <label className={modalStyles.modalLabel}>Categoria</label>
                                <select className={modalStyles.modalInput} value={category} onChange={(e)=>{setCategory(e.target.value)}}>
                                    {categorys.map(item => (<option value={item._id}>{item.name}</option>))}
                                </select>
                                <label className={modalStyles.modalLabel}>Imagem do produto</label>
                                {/* <input type='file' onChange={(e) => {setImage(e.target.files[0])}} /> */}
                                <input className={modalStyles.modalUpload} type="file" accept="image/*" onChange={(e) => {setImage(e.target.files[0])}}/>
                                <div className={styles.checkbox}>
                                <input type='checkbox' className={modalStyles.modalInput} checked={isActive} onChange={(e) => { setIsActive(!isActive) }} />
                                <label className={modalStyles.modalLabel}>Produto ativo</label>
                                </div>
                            </div>
                            <div className={modalStyles.modalButtons}>
                                <button className={modalStyles.modalCancel} onClick={() => { setModal(false) }}>Cancelar</button>
                                <button className={modalStyles.modalCreate} type='submit'>Criar</button>
                            </div>
                        </form>
                    </div>
                </div>
            }
            <header className={styles.header}>
                <h1 className={styles.title}>Meus produtos</h1>
                <button className={styles.modalButton} onClick={() => { setModal(true) }}>Criar produto</button>
            </header>
            <main className={styles.mainContainer}>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <h2 className={styles.itemName} style={{fontSize:'1.8rem', color:'#c3c5cc'}}>Nome do produto</h2>
                        <h2 className={styles.itemName} style={{fontSize:'1.8rem', color:'#c3c5cc'}}>Preço</h2>
                        <h2 className={styles.itemName} style={{fontSize:'1.8rem', color:'#c3c5cc'}}>Estoque</h2>
                    </li>
                    {produtos && produtos.length !== 0 && produtos.map(item => (
                        <li className={styles.item} key={item._id}>
                            <h2 className={styles.itemName}>{item.name}</h2>
                            <h2 className={styles.itemName}>R${item.price}</h2>
                            <h2 className={styles.itemName}>{item.limited ? item.quantity : '-'}</h2>
                            <h3 className={styles.itemName} onClick={() => { deleteProduct(`${item._id}`) }}>X</h3>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    )
}
export default Produtos