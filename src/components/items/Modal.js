import { useState } from "react"
import styles from './Modal.module.css'
function Modal(props) {
    const [modal, setModal] = useState(true)
    return (
        <>
        {modal &&
            <div className={styles.modalOver}>
            <div className={styles.modalContainer}>
                <div className={styles.modalHeader}>
                    <h3 className={styles.modalTitle}>{props.title}</h3>
                    <h3 className={styles.modalTitleCancel} onClick={() => { setModal(false) }}>X</h3>
                </div>
                <form className={styles.modalForm} onSubmit={props.handleSubmit}>
                    <div className={styles.modalInputGroup}>
                        {props.children}
                    </div>
                    <div className={styles.modalButtons}>
                        <button className={styles.modalCancel} onClick={() => { setModal(false) }}>Cancelar</button>
                        <button className={styles.modalCreate} type='submit'>Criar</button>
                    </div>
                    </form>
            </div>
            </div>
        }
        </>
    )
}

export default Modal