import styles from './Cadastro.module.css'
import logo from './../../donkeyStore_logo.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Cadastro() {
    // const apiUrl = 'https://donkey-api.vercel.app'
    const apiUrl = 'http://localhost:8800'
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        const credenciais = {
            username,
            password,
            confirmPassword,
        };
        try {
            await fetch(`${apiUrl}/auth/createUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credenciais),
            }).then(res => res.json()).then((data) => {
                alert(data.msg)
                if(data.msg === 'Usuário cadastrado com sucesso!'){
                    return navigate("/login")
                }
            })

        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.mainContainer}>
                <img src={logo} alt='logo' className={styles.logo} />
                <h2 className={styles.h2}>Crie agora sua conta</h2>
                <h3 className={styles.h3}>Já tem uma? <u className={styles.h3} style={{ cursor: 'pointer' }}>Clique Aqui</u></h3>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Username</label>
                        <input type='text' className={styles.input} value={username} onChange={e => setUsername(e.target.value)} />
                        <label className={styles.label}>Senha</label>
                        <input type='password' className={styles.input} value={password} onChange={e => setPassword(e.target.value)} />
                        <label className={styles.label}>Confirmar senha</label>
                        <input type='password' className={styles.input} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                    </div>
                    <button className={styles.button} type='submit'>Fazer cadastro</button>
                </form>
            </div>
            <div className={styles.secondContainer}>
            </div>
        </div>
    )
}

export default Cadastro
