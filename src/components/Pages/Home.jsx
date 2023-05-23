import { useState, useEffect } from 'react'
import axios from 'axios'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import Categories from './Categories'
import Sort from './Sort'
import Skeleton from '../PizzaBlock/Skeleton'
import PizzaBlock from '../PizzaBlock/PizzaBlock'
import Pagination from '../Pagination/Pagination'
import { useContext } from 'react'
import { MainContext } from '../../App'
import { useDispatch, useSelector } from 'react-redux'
import { setItems } from '../../redux/slices/pizzasSlice'

const Home = () => {
  const categoryId = useSelector((state) => state.filter.categoryId) // получение начальной категории при загрузке страницы. Изменение прописано в Categories
  const sort = useSelector((state) => state.filter.sort.sortProperty) // получение начального значения сортировки при загрузке страницы. Изменение прописано в Sort
  const currentPage = useSelector((state) => state.filter.currentPage)
  const { value } = useContext(MainContext) // значение инпута из компонента Search
  const [isLoading, setIsLoading] = useState(true) // загрузочное окно
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const items = useSelector((state) => state.pizzas.items) // начальный стейт с редакса. Пустой массив

  const fetchPizzas = async () => {
    setIsLoading(true)

    const category = categoryId > 0 ? `category=${categoryId}` : '' // фильтр по категориям
    const search = value ? `&search=${value}` : '' // при изменении инпута оставляем те пиццы, которое подходят под требования

    try {
      const mockapiResponce = await axios.get(
        `https://63f4babd3f99f5855db60353.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}${search}&sortBy=${sort}&order=desc`
      ) // избавляемся от then с помощью await. Данные сразу записываются в переменную
      dispatch(setItems(mockapiResponce.data)) // при рендере в функцию передаем ответ с бэка. И массив заполняется данными
    } catch (error) {
      console.log(error, 'ERROR')
    } finally {
      setIsLoading(false) // выполнится в любом случае. Т.к setIsLoading в любом случае
      // делаем false - то можем добавить его сюда. И он будет false в любом из 2 вариантов
    }
    window.scroll(0, 0) // при загрузке страницы скролл будет идти с самого верха.
  }

  useEffect(() => {
    const queryString = qs.stringify({
      categoryId,
      currentPage,
    }) // из объекта делаем строчку.
    navigate(`?${queryString}`) // с помощью useNavigate вшиваем ее в адресную строку
  }, [categoryId, sort, value, currentPage]) // когда делаем qs - всегда пихаем его в useEffect и следим за переменными

  useEffect(() => {
    fetchPizzas()
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
