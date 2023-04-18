import { useState, useEffect } from 'react'
import Categories from '../Categories'
import Sort from '../Sort'
import Skeleton from '../PizzaBlock/Skeleton'
import PizzaBlock from '../PizzaBlock/PizzaBlock'

const Home = ({ value }) => {
  const [items, setItems] = useState([]) // получаем пустой массив, в который будем добавлять данные с бэка
  const [categoryId, setCategoryId] = useState(0) // начальный индекс списка
  const [isLoading, setIsLoading] = useState(true) // загрузочное окно
  const [sort, setSort] = useState({
    name: 'популярности',
    sortProperty: 'rating',
  })

  const setSortedCategory = (index) => {
    setCategoryId(index)
  } // сортировка комп. Category по индексу

  const getCortedTypes = (index) => {
    setSort(index)
  } // сортировка комп. Sort по индексу

  useEffect(() => {
    setIsLoading(true)

    const category = categoryId > 0 ? `category=${categoryId}` : '' // фильтр по категориям
    const search = value ? `&search=${value}` : '' // при изменении инпута оставляем те пиццы, которое подходят под тебования
    fetch(
      `https://63f4babd3f99f5855db60353.mockapi.io/pizzas?${category}&sortBy=${sort.sortProperty}&order=desc${search}`
    ) // делаем запрос. При измененни переменных - делаем запрос с нужными данными. По сортировке
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr) // добавляем в массив данные с бэка
        setIsLoading(false) // меняем загрузочное окно на загрузившийся массив
      })
    window.scrollTo(0, 0) // при загрузке страницы скролл будет идти с самого верха
  }, [categoryId, sort, value]) // если какая-то переменная меняется - делает запрос

  const skeletons = [...new Array(9)].map((_, index) => (
    <Skeleton key={index} />
  ))

  const pizzas = items
    // .filter((item) => item.title.toLowerCase().includes(value.toLowerCase()))
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />)

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={setSortedCategory} />
        <Sort value={sort} onClickSort={getCortedTypes} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? skeletons //  при загрузке создаем массив undef , и перебираем его
          : pizzas}
      </div>
    </div>
  )
}

export default Home
