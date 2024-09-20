import styles from './page.module.scss'

import { Header } from '../components/header'
import { Tasks } from '../components/tasks'

export default function Home() {
  return (
    <main className={styles.container}>
      <Header />

      <Tasks />
    </main>
  )
}
