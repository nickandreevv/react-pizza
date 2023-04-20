import { useDispatch, useSelector } from 'react-redux'
import { setCategoryId } from '../../redux/slices/filterSlice'

const Categories = () => {
  const categoryId = useSelector((state) => state.filter.categoryId)
  const dispatch = useDispatch()

  const onChangeCategory = (index) => {
    dispatch(setCategoryId(index))
  } // сортировка комп. Category по индексу с помощью dispatch
  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ]

  return (
    <div className="categories">
      <ul>
        {categories.map((item, id) => (
          <li
            key={id}
            className={categoryId === id ? 'active' : ''}
            onClick={() => onChangeCategory(id)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories
