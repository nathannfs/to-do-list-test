import styles from './styles.module.scss'

interface ModalProps {
  children: React.ReactNode
  handleModal: () => void
  handleAddTask?: () => void
  handleDeleteTask?: () => void
  type: 'add' | 'delete'
}

export function Modal({
  children,
  handleModal,
  handleAddTask,
  handleDeleteTask,
  type = 'add',
}: ModalProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {children}

        {type === 'delete' && (
          <p>Tem certeza que você deseja deletar essa tarefa?</p>
        )}

        <div className={styles.buttons}>
          <button type="button" onClick={handleModal}>
            Cancelar
          </button>

          {type === 'add' ? (
            <button
              type="button"
              onClick={handleAddTask}
              className={styles.addButton}
            >
              Adicionar
            </button>
          ) : (
            <button
              type="button"
              onClick={handleDeleteTask}
              className={styles.deleteButton}
            >
              Deletar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
