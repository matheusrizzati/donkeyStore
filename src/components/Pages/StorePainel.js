import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import styles from './StorePainel.module.css'
import Produtos from "../Panels/Produtos"
import Categorias from "../Panels/Categorias"
import Cupoms from "../Panels/Cupoms"
import Layouts from "../Panels/Layouts"
import Configuracoes from "../Panels/Configuracoes"
const openMenuSVG = <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.6667 6.85339V25.5201L25.3333 16.1867L10.6667 6.85339Z" fill="#878787"/></svg>
const closeMenuSVG = <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.53329 25.3333L6.66663 23.4666L14.1333 16L6.66663 8.53329L8.53329 6.66663L16 14.1333L23.4666 6.66663L25.3333 8.53329L17.8666 16L25.3333 23.4666L23.4666 25.3333L16 17.8666L8.53329 25.3333Z" fill="#878787"/></svg>
const menuFinanceiroSVG = <svg className={styles.menuSvg} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.33334 20H12C12 21.44 13.8267 22.6667 16 22.6667C18.1733 22.6667 20 21.44 20 20C20 18.5333 18.6133 18 15.68 17.933C12.8533 16.5867 9.33334 15.7067 9.33334 12C9.33334 9.61333 11.2933 7.58667 14 6.90667V4H18V6.90667C20.7067 7.58667 22.6667 9.61333 22.6667 12H20C20 10.56 18.1733 9.33333 16 9.33333C13.8267 9.33333 12 10.56 12 12C12 13.4667 13.3867 14 16.32 14.7067C19.1467 15.4133 22.6667 16.2933 22.6667 20C22.6667 22.3867 20.7067 24.4133 18 25.0933V28H14V25.0933C11.2933 24.4133 9.33334 22.3867 9.33334 20Z" fill="black"/></svg>
const menuProdutosSVG = <svg className={styles.menuSvg} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29.3333 9.33329L16 2.66663L2.66666 9.33329V22.6666L16 29.3333L29.3333 22.6666V9.33329Z" stroke="black" strokeWidth="2.66667" strokeLinejoin="round"/><path d="M2.66666 9.33333L16 16M16 16V29.3333M16 16L29.3333 9.33333M22.6667 6L9.33332 12.6667" stroke="black" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/></svg>
const menuMinhaLojaSVG = <svg className={styles.menuSvg} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28.4373 10.6666H24.5333L23.7013 5.69597C23.5337 4.9439 23.1655 4.25127 22.6359 3.69161C22.1063 3.13194 21.435 2.72615 20.6933 2.5173C19.9482 2.27757 19.172 2.1482 18.3893 2.1333H13.6107C12.828 2.1482 12.0518 2.27757 11.3067 2.5173C10.565 2.72615 9.89371 3.13194 9.36409 3.69161C8.83448 4.25127 8.46631 4.9439 8.29867 5.69597L7.46667 10.6666H3.56267C3.39465 10.6656 3.22876 10.7043 3.07852 10.7796C2.92829 10.8548 2.79795 10.9645 2.69814 11.0996C2.59832 11.2348 2.53185 11.3916 2.50414 11.5574C2.47643 11.7231 2.48826 11.893 2.53867 12.0533L6.54934 25.4933C6.75352 26.1426 7.15941 26.7098 7.70802 27.1127C8.25663 27.5155 8.91939 27.7329 9.6 27.7333H22.4C23.077 27.7284 23.7349 27.5089 24.2793 27.1064C24.8236 26.7039 25.2263 26.1391 25.4293 25.4933L29.44 12.0533C29.4899 11.8947 29.502 11.7267 29.4754 11.5626C29.4489 11.3985 29.3843 11.2429 29.2869 11.1082C29.1895 10.9735 29.0619 10.8634 28.9144 10.7867C28.7669 10.7101 28.6036 10.6689 28.4373 10.6666ZM9.64267 10.6666L10.4107 6.0373C10.4949 5.65933 10.6902 5.31516 10.9715 5.04905C11.2528 4.78294 11.6073 4.60705 11.9893 4.54397C12.5141 4.37757 13.0603 4.28583 13.6107 4.26663H18.3893C18.9461 4.2837 19.4987 4.37543 20.032 4.54397C20.4141 4.60705 20.7685 4.78294 21.0499 5.04905C21.3312 5.31516 21.5265 5.65933 21.6107 6.0373L22.3573 10.6666H9.55734H9.64267Z" fill="black"/></svg>

function StorePainel(){
    const location = useLocation()
    const apiUrl = 'http://localhost:8800'
    // const apiUrl = 'https://donkey-api.vercel.app'
    const url = window.location.search
    let code, storeId, panelState, state
    if (location.state) {
        storeId = location.state
    }
    if(url){
        const urlParams = new URLSearchParams(url)
        code = urlParams.get('code')
        state = urlParams.get('state').split("-")
        if (state){
            storeId = state[0]
            panelState = state[1]
        }
    }
    // const state = urlParams.get('state').split("-")
    useEffect(() => {
        if (!token)
            return navigate("/login")
    }, [])  
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [painel, setPainel] = useState('financeiro')
    const [menuOpen, setMenuOpen] = useState(false)
    const [menuFinanceiro, setMenuFinanceiro] = useState(false)
    const [menuProdutos, setMenuProdutos] = useState(false)
    const [menuMinhaLoja, setMenuMinhaLoja] = useState(false)
    
    const [myStore, setMyStore] = useState({})

    const fetchLoja = async() => {
        fetch(`${apiUrl}/store/${storeId}`, {headers: {'authorization':token}}).then(res => res.json()).then( (data) => {
            setMyStore(data)
        })
    }

    useEffect(() => {
        fetchLoja()
    },[])

    useEffect(() => {
        setPainel(panelState)
    }, [])

    const renderPainel = (param) => { 
        switch(param){
            case 'financeiro':
                return console.log('financeiro')
            case 'produtos':
                return <Produtos storeData={myStore} token={token}/> 
            case 'cupoms':
                return <Cupoms storeData={myStore} token={token}/> 
            case 'categorias':
                return <Categorias storeData={myStore} token={token}/> 
            case 'pedidos':
                return console.log('pedidos')
            case 'layouts':
                return <Layouts storeData={myStore} token={token}/>
            case 'configuracoes':
                return <Configuracoes storeData={myStore} fetchLoja={fetchLoja} token={token}/>
        }
    }
    const closeMenu = () => {setMenuOpen(false); setMenuFinanceiro(false); setMenuProdutos(false); setMenuMinhaLoja(false)}
    
    return(
        <div className={styles.container}>
            {console.log(storeId, code, panelState)}
            <menu className={styles.sidebar}>
                {(menuOpen)?<h1 className={styles.sidebarAction} onClick={closeMenu}>{closeMenuSVG}</h1>:<h1 className={styles.sidebarAction} onClick={() => {setMenuOpen(true)}}>{openMenuSVG}</h1>}
                {menuOpen && <button disabled={!myStore.isActive} className={styles.visitButton} onClick={() => {navigate(`/${myStore.url}`)}}>Visitar minha loja</button>}
                <div className={
                    (menuFinanceiro)?styles.sidebarmenuOpened:styles.sidebarMenu
                    } onClick={() => {(menuOpen)?setMenuFinanceiro(!menuFinanceiro):setPainel('Financeiro')}}>
                {(menuOpen)?<div className={styles.menuTitle}>{menuFinanceiroSVG}<h2>Financeiro</h2></div>:menuFinanceiroSVG}
                </div>
                {menuFinanceiro && 
                <div className={styles.submenu}>
                    <h3 className={styles.submenuItem}>Teste4245252525252525 Menu</h3>
                    <h3 className={styles.submenuItem}>Teste Menu</h3>
                </div>
                }

                <div className={
                    (menuProdutos)?styles.sidebarmenuOpened:styles.sidebarMenu
                    } onClick={() => {(menuOpen)?setMenuProdutos(!menuProdutos):setPainel('produtos')}}>
                {(menuOpen)?<div className={styles.menuTitle}>{menuProdutosSVG}<h2>Produtos</h2></div>:menuProdutosSVG}
                </div>
                {menuProdutos && 
                <div className={styles.submenu}>
                    <h3 className={styles.submenuItem} onClick={() => {setPainel('produtos')}}>Meus produtos</h3>
                    <h3 className={styles.submenuItem} onClick={() => {setPainel('cupoms')}}>Cupoms</h3>
                    <h3 className={styles.submenuItem} onClick={() => {setPainel('categorias')}}>Categorias</h3>
                </div>
                }

                <div className={
                    (menuMinhaLoja)?styles.sidebarmenuOpened:styles.sidebarMenu
                    } onClick={() => {(menuOpen)?setMenuMinhaLoja(!menuMinhaLoja):setPainel('Layouts')}}>
                {(menuOpen)?<div className={styles.menuTitle}>{menuMinhaLojaSVG}<h2>Minha Loja</h2></div>:menuMinhaLojaSVG}
                </div>
                {menuMinhaLoja && 
                <div className={styles.submenu}>
                    <h3 className={styles.submenuItem} onClick={() => {setPainel('layouts')}}>Layouts</h3>
                    <h3 className={styles.submenuItem} onClick={() => {setPainel('configuracoes')}}>Configurações</h3>
                </div>
                }

            </menu>
            <main className={styles.painel}>
                {renderPainel(painel)}
            </main>
        </div>
    )
}

export default StorePainel