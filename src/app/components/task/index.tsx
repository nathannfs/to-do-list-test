import Image from 'next/image'
import styles from './styles.module.scss'

import checkboxChecked from '@/app/assets/checkbox-checked.png'
import checkbox from '@/app/assets/checkbox.png'
import trash from '@/app/assets/trash.png'

export interface ITask {
  id: number
  text: string
  isChecked: boolean
}

interface Props {
  data: ITask
  removeTask: (id: number) => void
  toggleTaskStatus: ({ id, value }: { id: number; value: boolean }) => void
}

export function Task({ data, removeTask, toggleTaskStatus }: Props) {
  function handleTaskToggle() {
    toggleTaskStatus({ id: data.id, value: !data.isChecked })
  }

  function handleRemove() {
    removeTask(data.id)
  }

  const checkboxCheckedClassName = data.isChecked
    ? styles['checkbox-checked']
    : styles['checkbox-unchecked']
  const paragraphCheckedClassName = data.isChecked
    ? styles['paragraph-checked']
    : ''

  return (
    <div className={styles.container}>
      <div>
        <label
          htmlFor="checkbox"
          onClick={handleTaskToggle}
          onKeyDown={handleTaskToggle}
        >
          <input readOnly type="checkbox" checked={data.isChecked} />
          <span className={`${styles.checkbox} ${checkboxCheckedClassName}`}>
            {!data.isChecked && <Image src={checkbox} alt="Checkbox" />}
            {data.isChecked && (
              <Image src={checkboxChecked} alt="Checkbox checked" />
            )}
          </span>

          <p className={`${styles.paragraph} ${paragraphCheckedClassName}`}>
            {data.text}
          </p>
        </label>
      </div>

      <button type="button" onClick={handleRemove}>
        <Image src={trash} alt="Trash" />
      </button>
    </div>
  )
}
