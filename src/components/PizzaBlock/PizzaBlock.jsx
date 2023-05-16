import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../../redux/slices/cartSlice'

const PizzaBlock = ({
  category,
  id,
  imageUrl,
  price,
  rating,
  sizes,
  title,
  types,
}) => {
  const dispatch = useDispatch()
  const cartItem = useSelector((state) =>
    state.cart.items.find((obj) => obj.id === id)
  ) // если объекты совпадают - вытаскиваем count

  const addedCount = cartItem ? cartItem.count : 0 // проверка. Если объект пуст - выводим 0. Иначе будет ошибка

  const typesOfNames = ['тонкое', 'традиционное']
  const [activeType, setActiveType] = useState(0)
  const [activeSize, setActiveSize] = useState(0)

  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      type: typesOfNames[activeType],
      size: activeSize,
    }
    dispatch(addItem(item))
  } // создаем объект, который будет передаваться в корзину
  // item - берем те элементы, которые будут нужны в корзине
  // с помощью dispach мы при нажатии будем изменять стейт(в редакс) и добавлять в него нужные элементы
  const getActiveType = (index) => {
    setActiveType(index)
  } // при нажатии на кнопку выбрать нужный тип теста
  const getActiveSize = (index) => {
    setActiveSize(index)
  } // при нажатии на кнопку выбрать размер пиццы
  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((typeId) => (
              <li
                key={typeId}
                onClick={() => getActiveType(typeId)}
                className={activeType === typeId ? 'active' : ''}
              >
                {typesOfNames[typeId]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((item, id) => (
              <li
                key={id}
                className={activeSize === id ? 'active' : ''}
                onClick={() => getActiveSize(id)}
              >
                {item} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button
            onClick={onClickAdd}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PizzaBlock
