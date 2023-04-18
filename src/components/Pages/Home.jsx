import { useState, useEffect } from 'react'
import Categories from '../Categories'
import Sort from '../Sort'
import Skeleton from '../PizzaBlock/Skeleton'
import PizzaBlock from '../PizzaBlock/PizzaBlock'
import Pagination from '../Pagination/Pagination'
import { useContext } from 'react'
import { MainContext } from '../../App'
import { createContext } from 'react'

export const HomeContext = createContext('')

const Home = () => {
  const { value } = useContext(MainContext)

  const [items, setItems] = useState([]) // получаем пустой массив, в который будем добавлять данные с бэка
  const [categoryId, setCategoryId] = useState(0) // начальный индекс списка
  const [isLoading, setIsLoading] = useState(true) // загрузочное окно
  const [currentPage, setCurrentPage] = useState(1) // пагинация страниц. Первое значение стейта - первая страница в списке
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
      `https://63f4babd3f99f5855db60353.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sort.sortProperty}&order=desc${search}`
    ) // делаем запрос. При измененни переменных - делаем запрос с нужными данными. По сортировке
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr) // добавляем в массив данные с бэка
        setIsLoading(false) // меняем загрузочное окно на загрузившийся массив
      })
    // window.scrollTo(0, 0) // при загрузке страницы скролл будет идти с самого верха. UPD: скролл убрал, т.к на странице оставляю по 4 товара. Смысла в нем нет
  }, [categoryId, sort, value, currentPage]) // если какая-то переменная меняется - делает запрос

  const skeletons = [...new Array(9)].map((_, index) => (
    <Skeleton key={index} />
  ))

  const pizzas = items
    // .filter((item) => item.title.toLowerCase().includes(value.toLowerCase())) UPD: данные теперь получаем с бэка
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />)

  const onChangePage = (num) => {
    setCurrentPage(num)
  } // смена страницы

  return (
    <HomeContext.Provider
      value={{
        categoryId,
        setSortedCategory,
        sort,
        getCortedTypes,
        onChangePage,
      }}
    >
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
    </HomeContext.Provider>
  )
}

export default Home
