import s from './search.module.scss'
import icon from '../../assets/img/search.svg'
import close from '../../assets/img/close.svg'
import { useContext } from 'react'
import { MainContext } from '../../App'
const Search = () => {
  const { value, setValue } = useContext(MainContext)

  return (
    <div className={s.root}>
      <img className={s.icon} src={icon} alt="search" />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={s.input}
        placeholder="Поиск пиццы"
      />
      {value && (
        <img
          onClick={() => setValue('')}
          className={s.close}
          src={close}
          alt="close"
        />
      )}
    </div>
  )
}

export default Search
