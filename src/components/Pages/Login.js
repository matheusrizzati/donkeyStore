import styles from './Login.module.css'
import logo from './../../donkeyStore_logo.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login(){
    const apiUrl = 'http://localhost:8800'
    // const apiUrl = 'https://donkey-api.vercel.app'
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        const credenciais = {
            username,
            password,
        };
        try {
            await fetch(`${apiUrl}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credenciais),
            }).then(res => res.json()).then((data) => {
                alert(data.msg)
                if(data.msg === 'Login bem sucedido!'){
                    localStorage.setItem('token', data.token)
                    return navigate("/lojas")
                }
            })

        } catch (error) {
            alert(error);
        }
    };

    return(
        <div className={styles.container}>
            <div className={styles.mainContainer}>
                <img src={logo} alt='logo' className={styles.logo}/>
                <h2 className={styles.h2}>Entre agora na sua conta</h2>
                <h3 className={styles.h3}>Não tem uma? <u onClick={() => {navigate('/cadastro')}} className={styles.h3} style={{cursor: 'pointer'}}>Clique Aqui</u></h3>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Username</label>
                        <input type='text' className={styles.input} value={username} onChange={(e) => {setUsername(e.target.value)}}/>
                        <label className={styles.label}>Senha</label>
                        <input type='password' className={styles.input} value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                    </div>
                    <button className={styles.button} type='submit'>Fazer login</button>
                </form>
            </div>
            <div className={styles.secondContainer}>
            </div>
        </div>
    )
}

export default Login