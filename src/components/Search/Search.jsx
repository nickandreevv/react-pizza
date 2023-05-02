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
  } // изменение локального стейта и стейта из App

  const updChangeInput = useCallback(
    debounce((value) => {
      setValue(value)
    }, 250),
    []
  ) // debounce для того, чтобы вводе одного символа запрос на бэк не шел каждый раз
  // useCallback нужен для того, чтобы сохратять ссылку на функцию

  const onClickClear = () => {
    setValue('')
    setSearchValue('')
    inputRef.current.focus()
  } // очищает инпут и добавляет фокус на него.
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
