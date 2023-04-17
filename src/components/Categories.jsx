const Categories = ({ value, onClickCategory }) => {
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
            className={value === id ? 'active' : ''}
            onClick={() => onClickCategory(id)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories
