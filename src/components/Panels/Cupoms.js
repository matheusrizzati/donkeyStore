import { useEffect, useState } from 'react'
import styles from './Cupoms.module.css'
import modalStyles from '../items/Modal.module.css'

function Cupoms(props) {
    const apiUrl = 'http://localhost:8800'
    const [cupoms, setCupoms] = useState([])
    const [modal, setModal] = useState(false)
    const [name, setName] = useState('')
    const [percentage, setPercentage] = useState(null)
    const [isInteger, setIsInteger] = useState(false)
    const [integerValue, setIntegerValue] = useState(null)

    const fetchCupoms = async () => {
        try {
          const response = await fetch(`${apiUrl}/cupom/?storeId=${props.storeData._id}`, {
            headers: { 'authorization': `${props.token}` }
          });
          const data = await response.json();
          setCupoms(data);
        } catch (error) {
          // Handle fetch error here
          console.error('Error fetching cupoms data:', error);
        }
      };    
    useEffect(() => {      
        fetchCupoms()
    }, [modal])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isInteger){
            setPercentage(null)
        }else{
            setIntegerValue(null)
        }

        const body = {
            name, percentage: (percentage/100), isInteger, integerValue, storeId: props.storeData._id
        }

        fetch(`${apiUrl}/cupom`, {
            method: 'POST',
            headers: { 'authorization': `${props.token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }).then(res => res.json()).then((data) => {alert(data.msg); setModal(false)})
    }

    const deleteCupoms = async(id) => {
        fetch(`${apiUrl}/cupom/${id}`, { method: 'DELETE', headers: { 'authorization': `${props.token}` } }).then(
            () => {fetchCupoms()}
        )
    }

    return (
        <div className={styles.container}>
            {modal &&
                <div className={modalStyles.modalOver}>
                    <div className={modalStyles.modalContainer}>
                        <div className={modalStyles.modalHeader}>
                            <h3 className={modalStyles.modalTitle}>Criar cupom</h3>
                            <h3 className={modalStyles.modalTitleCancel} onClick={() => { setModal(false) }}>X</h3>
                        </div>
                        <form className={modalStyles.modalForm} onSubmit={handleSubmit}>
                            <div className={modalStyles.modalInputGroup}>
                                <label className={modalStyles.modalLabel}>Código do cupom</label>
                                <input type='text' className={modalStyles.modalInput} value={name} onChange={(e) => { setName(e.target.value) }} />
                                <div className={styles.checkbox}>
                                <input type='checkbox' className={modalStyles.modalInput} checked={isInteger} onChange={(e) => { setIsInteger(!isInteger) }} />
                                <label className={modalStyles.modalLabel}>Aplicar o desconto como um valor inteiro</label>
                                </div>
                                {!isInteger &&
                                    <>
                                    <label className={modalStyles.modalLabel}>% de desconto</label>
                                    <input type='text'  className={modalStyles.modalInput} value={percentage} onChange={(e) => { setPercentage(e.target.value) }} />
                                    </>
                                }
                                {isInteger &&
                                    <>
                                    <label className={modalStyles.modalLabel}>Valor do desconto</label>
                                    <input type='text'  className={modalStyles.modalInput} value={integerValue} onChange={(e) => { setIntegerValue(e.target.value) }} />
                                    </>
                                }
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
                <h1 className={styles.title}>Cupoms</h1>
                <button className={styles.modalButton} onClick={() => { setModal(true) }}>Criar cupom</button>
            </header>
            <main className={styles.mainContainer}>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <h2 className={styles.itemName} style={{fontSize:'1.8rem', color:'#c3c5cc'}}>Código do cupom</h2>
                        <h2 className={styles.itemName} style={{fontSize:'1.8rem', color:'#c3c5cc'}}>Valor do cupom</h2>
                        <h2 className={styles.itemName} style={{fontSize:'1.8rem', color:'#c3c5cc'}}>Usos</h2>
                    </li>
                    {cupoms && cupoms.length !== 0 && cupoms.map(item => (
                        <li className={styles.item} key={item._id}>
                            <h2 className={styles.itemName}>{item.name}</h2>
                            <h2 className={styles.itemName}>{item.percentage === null ? `R$${item.integerValue}` : `${(item.percentage * 100)}%`}</h2>
                            <h2 className={styles.itemName}>{item.usedTimes}</h2>
                            <h3 className={styles.itemName} onClick={() => { deleteCupoms(`${item._id}`) }}>X</h3>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    )
}
export default Cupoms