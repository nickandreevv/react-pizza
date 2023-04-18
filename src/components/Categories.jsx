import { useContext } from 'react'
import { HomeContext } from './Pages/Home'

const Categories = ({ value, onClickCategory }) => {
  const { categoryId, setSortedCategory } = useContext(HomeContext)
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
            onClick={() => setSortedCategory(id)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories
