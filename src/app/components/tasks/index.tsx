'use client'

import { useEffect, useState } from 'react'

import styles from './styles.module.scss'

import { Modal } from '../modal'
import { type ITask, Task } from '../task'

interface TypeModal {
  type: 'add' | 'delete'
  taskId?: number
}

export function Tasks() {
  const [tasks, setTasks] = useState<ITask[]>(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('tasks') || '[]')
    }

    return []
  })
  const [inputValue, setInputValue] = useState('')
  const [modalOpen, setModalOpen] = useState<TypeModal | null>(null)

  const tasksPending = tasks.filter(task => !task.isChecked)
  const tasksFinished = tasks.filter(task => task.isChecked)

  useEffect(() => {
    const stateJSON = JSON.stringify(tasks)

    if (typeof window !== 'undefined') {
      localStorage.setItem('tasks', stateJSON)
    }
  }, [tasks])

  function handleAddTask() {
    if (!inputValue) {
      return
    }

    const newTask: ITask = {
      id: new Date().getTime(),
      text: inputValue,
      isChecked: false,
    }

    setTasks(state => [...state, newTask])
    setModalOpen(null)
    setInputValue('')
  }

  function handleRemoveTask(id: number | undefined) {
    const filteredTasks = tasks.filter(task => task.id !== id)

    setTasks(filteredTasks)
    setModalOpen(null)
  }

  function handleToggleTask({ id, value }: { id: number; value: boolean }) {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, isChecked: value }
      }

      return { ...task }
    })

    setTasks(updatedTasks)
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Suas tarefas de hoje</h2>

        <div className={styles.tasks}>
          {tasksPending.length > 0 ? (
            tasksPending.map(task => (
              <Task
                key={task.id}
                data={task}
                removeTask={() =>
                  setModalOpen({ type: 'delete', taskId: task.id })
                }
                toggleTaskStatus={handleToggleTask}
              />
            ))
          ) : (
            <p className={styles.emptyText}>Nenhuma tarefa pendente!</p>
          )}
        </div>

        <h2>Tarefas finalizadas</h2>

        <div className={styles.tasks}>
          {tasksFinished.length > 0 ? (
            tasksFinished.map(task => (
              <Task
                key={task.id}
                data={task}
                removeTask={() =>
                  setModalOpen({ type: 'delete', taskId: task.id })
                }
                toggleTaskStatus={handleToggleTask}
              />
            ))
          ) : (
            <p className={styles.emptyText}>Nenhuma tarefa finalizada!</p>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setModalOpen({ type: 'add' })}
        className={styles.button}
      >
        Adicionar nova tarefa
      </button>

      {modalOpen?.type === 'add' && (
        <Modal
          type="add"
          handleModal={() => setModalOpen(null)}
          handleAddTask={handleAddTask}
        >
          <h2>Nova tarefa</h2>

          <div className={styles.inputModal}>
            <label htmlFor="newTask">Título</label>
            <input
              type="text"
              placeholder="Digite"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
            />
          </div>
        </Modal>
      )}

      {modalOpen?.type === 'delete' && (
        <Modal
          type="delete"
          handleModal={() => setModalOpen(null)}
          handleDeleteTask={() => handleRemoveTask(modalOpen.taskId)}
        >
          <h2>Deletar tarefa</h2>
        </Modal>
      )}
    </div>
  )
}
