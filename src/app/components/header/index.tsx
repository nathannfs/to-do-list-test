import styles from './styles.module.scss'

import logo from '@/app/assets/logo.png'

export function Header() {
  return (
    <header className={styles.header}>
      <img src={logo.src} alt="Logo FocalPoint" />

      <h1>Bem-vindo de volta, Marcus</h1>

      <span>Segunda, 01 de dezembro de 2025</span>
    </header>
  )
}
