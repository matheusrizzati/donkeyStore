import { useParams } from "react-router-dom"
import { useState } from "react"
import logo from './../../donkeyStore_logo.png'
import styles from './StorePainel.module.css'
const openMenuSVG = <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.6667 6.85339V25.5201L25.3333 16.1867L10.6667 6.85339Z" fill="#878787"/></svg>
const closeMenuSVG = <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.53329 25.3333L6.66663 23.4666L14.1333 16L6.66663 8.53329L8.53329 6.66663L16 14.1333L23.4666 6.66663L25.3333 8.53329L17.8666 16L25.3333 23.4666L23.4666 25.3333L16 17.8666L8.53329 25.3333Z" fill="#878787"/></svg>
const menuFinanceiroSVG = <svg className={styles.menuSvg} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.33334 20H12C12 21.44 13.8267 22.6667 16 22.6667C18.1733 22.6667 20 21.44 20 20C20 18.5333 18.6133 18 15.68 17.933C12.8533 16.5867 9.33334 15.7067 9.33334 12C9.33334 9.61333 11.2933 7.58667 14 6.90667V4H18V6.90667C20.7067 7.58667 22.6667 9.61333 22.6667 12H20C20 10.56 18.1733 9.33333 16 9.33333C13.8267 9.33333 12 10.56 12 12C12 13.4667 13.3867 14 16.32 14.7067C19.1467 15.4133 22.6667 16.2933 22.6667 20C22.6667 22.3867 20.7067 24.4133 18 25.0933V28H14V25.0933C11.2933 24.4133 9.33334 22.3867 9.33334 20Z" fill="black"/></svg>

function StorePainel(){
    const {id} = useParams()
    const [painel, setPainel] = useState('financeiro')
    const [menuOpen, setMenuOpen] = useState(false)
    const [menuFinanceiro, setMenuFinanceiro] = useState(false)

    const closeMenu = () => {setMenuOpen(false); setMenuFinanceiro(false)}
    return(
        <div className={styles.container}>
            <menu className={styles.sidebar}>
                {(menuOpen)?<h1 className={styles.sidebarAction} onClick={closeMenu}>{closeMenuSVG}</h1>:<h1 className={styles.sidebarAction} onClick={() => {setMenuOpen(true)}}>{openMenuSVG}</h1>}
                {/* {menuOpen && <img src={logo} alt='logo' className={styles.logo} /> } */}
                <div className={styles.sidebarMenu}>
                    <h2 onClick={() => {(menuOpen)?setMenuFinanceiro(!menuFinanceiro):setPainel('Financeiro')}}>
                    {(menuOpen)?<div className={styles.menuTitle}>{menuFinanceiroSVG}<h2> Financeiro</h2></div>:menuFinanceiroSVG}
                    </h2>
                    {menuFinanceiro &&
                    <h3 className={styles.menuItem}>Teste Menu</h3>
                    }
                </div>
            </menu>
            <main className={styles.painel}>

            </main>
        </div>
    )
}

export default StorePainel