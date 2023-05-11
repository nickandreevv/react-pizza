import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSortType } from '../../redux/slices/filterSlice'

const list = [
  { name: 'популярности', sortProperty: 'rating' },
  { name: 'цене', sortProperty: 'price' },
  { name: 'алфавиту', sortProperty: 'title' },
]

const Sort = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sortRef = useRef(false) // реф для класса sort

  const sort = useSelector((state) => state.filter.sort)
  const dispatch = useDispatch()

  const getCortedTypes = (index) => {
    dispatch(setSortType(index))
  }

  const popUpHandleClick = () => {
    setIsVisible(!isVisible)
  } // отображение popup

  const setNewSortList = (index) => {
    getCortedTypes(index) // поменять на active элемент с совпадающим индексом
    setIsVisible(false) // после выбора скрыть popup
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.composedPath().includes(sortRef.current)) {
        setIsVisible(false)
      } // если event содержит наш реф - выполняем условие ниже. Event - клик
    } // с помощью useRef мы определяем нужный нам элемент.
    // при клике на боди мы закрываем popup. Боди нахдим с помощью addEventListener
    document.body.addEventListener('click', handleClickOutside)

    return () => {
      document.body.removeEventListener('click', handleClickOutside)
    } // если выходим с компонента - вызов функции , которая убирает обработчик события. Вызывается только в этом случае
  }, [])

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          className={isVisible ? 'sort__label_svg' : ''}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={popUpHandleClick}>{sort.name}</span>
      </div>
      {isVisible && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, id) => (
              <li
                key={id}
                onClick={() => setNewSortList(obj)}
                className={
                  sort.sortProperty === obj.sortProperty ? 'active' : ''
                }
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Sort
