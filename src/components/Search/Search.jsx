import s from './search.module.scss'
import icon from '../../assets/img/search.svg'
import close from '../../assets/img/close.svg'
import { useContext } from 'react'
import { MainContext } from '../../App'
import { useRef } from 'react'
import debounce from 'lodash.debounce'
import { useCallback } from 'react'
import { useState } from 'react'
const Search = () => {
  const [searchValue, setSearchValue] = useState('')
  const { setValue } = useContext(MainContext)
  const inputRef = useRef()

  const onChangeInput = (e) => {
    setSearchValue(e.target.value)
    updChangeInput(e.target.value)
  }

  const updChangeInput = useCallback(
    debounce((str) => {
      setValue(str)
    }, 500),
    []
  )

  const onClickClear = () => {
    setValue('')
    setSearchValue('')
    inputRef.current.focus()
  }
  return (
    <div className={s.root}>
      <img className={s.icon} src={icon} alt="search" />
      <input
        ref={inputRef}
        value={searchValue}
        onChange={onChangeInput}
        className={s.input}
        placeholder="Поиск пиццы"
      />
      {searchValue && (
        <img
          onClick={onClickClear}
          className={s.close}
          src={close}
          alt="close"
        />
      )}
    </div>
  )
}

export default Search
