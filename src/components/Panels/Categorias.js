import { useEffect, useState } from 'react'
import styles from './Categorias.module.css'
import modalStyles from '../items/Modal.module.css'

function Categorias(props) {
    const apiUrl = 'http://localhost:8800'
    const [categorys, setCategorys] = useState([])
    const [modal, setModal] = useState(false)
    const [name, setName] = useState('')

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
    }, [modal])

    const handleSubmit = async (e) => {
        e.preventDefault()
        fetch(`${apiUrl}/category`, {
            method: 'POST',
            headers: { 'authorization': `${props.token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, storeId: `${props.storeData._id}` })
        }).then(res => res.json()).then((data) => { setModal(false); alert(data.msg) })
    }

    const deleteCategory = (id) => {
        fetch(`${apiUrl}/category/${id}`, { method: 'DELETE', headers: { 'authorization': `${props.token}` } }).then(fetchCategorys())
    }

    return (
        <div className={styles.container}>
            {modal &&
                <div className={modalStyles.modalOver}>
                    <div className={modalStyles.modalContainer}>
                        <div className={modalStyles.modalHeader}>
                            <h3 className={modalStyles.modalTitle}>Criar categoria</h3>
                            <h3 className={modalStyles.modalTitleCancel} onClick={() => { setModal(false) }}>X</h3>
                        </div>
                        <form className={modalStyles.modalForm} onSubmit={handleSubmit}>
                            <div className={modalStyles.modalInputGroup}>
                                <label className={modalStyles.modalLabel}>Nome da categoria</label>
                                <input type='text' className={modalStyles.modalInput} value={name} onChange={(e) => { setName(e.target.value) }} />
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
                <h1 className={styles.title}>Categorias</h1>
                <button className={styles.modalButton} onClick={() => { setModal(true) }}>Criar categoria</button>
            </header>
            <main className={styles.mainContainer}>
                <ul className={styles.list}>
                    {categorys && categorys.length !== 0 && categorys.map(item => (
                        <li className={styles.item} key={item._id}>
                            <h2 className={styles.itemName}>{item.name}</h2>
                            <h3 className={modalStyles.modalTitleCancel} onClick={() => { deleteCategory(`${item._id}`) }}>X</h3>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    )
}
export default Categorias