import { useState, useEffect } from 'react'
import axios from 'axios'
import Categories from './Categories'
import Sort from './Sort'
import Skeleton from '../PizzaBlock/Skeleton'
import PizzaBlock from '../PizzaBlock/PizzaBlock'
import Pagination from '../Pagination/Pagination'
import { useContext } from 'react'
import { MainContext } from '../../App'
import { useSelector } from 'react-redux'

const Home = () => {
  const categoryId = useSelector((state) => state.filter.categoryId) // получение начальной категории при загрузке страницы. Изменение прописано в Categories
  const sort = useSelector((state) => state.filter.sort.sortProperty) // получение начального значения сортировки при загрузке страницы. Изменение прописано в Sort
  const currentPage = useSelector((state) => state.current.currentPage)
  const { value } = useContext(MainContext)
  const [items, setItems] = useState([]) // получаем пустой массив, в который будем добавлять данные с бэка
  const [isLoading, setIsLoading] = useState(true) // загрузочное окно

  useEffect(() => {
    setIsLoading(true)

    const category = categoryId > 0 ? `category=${categoryId}` : '' // фильтр по категориям
    const search = value ? `&search=${value}` : '' // при изменении инпута оставляем те пиццы, которое подходят под тебования

    axios
      .get(
        `https://63f4babd3f99f5855db60353.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}${search}&sortBy=${sort}&order=desc`
      )
      .then((res) => {
        setItems(res.data) // добавляем в массив данные с бэка
        setIsLoading(false) // меняем загрузочное окно на загрузившийся массив
      })
    window.scroll(0, 0) // при загрузке страницы скролл будет идти с самого верха.
  }, [categoryId, sort, value, currentPage]) // если какая-то переменная меняется - useEffect ререндерит

  const skeletons = [...new Array(9)].map((_, index) => (
    <Skeleton key={index} />
  ))

  const pizzas = items
    // .filter((item) => item.title.toLowerCase().includes(value.toLowerCase())) UPD. Данные теперь получаем с бэка
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />)

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? skeletons //  при загрузке создаем массив undef , и перебираем его
          : pizzas}
      </div>
      <Pagination />
    </div>
  )
}

export default Home
