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
import { setItems, fetchPizzas } from '../../redux/slices/pizzasSlice'

const Home = () => {
  const categoryId = useSelector((state) => state.filter.categoryId) // получение начальной категории при загрузке страницы. Изменение прописано в Categories
  const sort = useSelector((state) => state.filter.sort.sortProperty) // получение начального значения сортировки при загрузке страницы. Изменение прописано в Sort
  const currentPage = useSelector((state) => state.filter.currentPage)
  const { value } = useContext(MainContext) // значение инпута из компонента Search
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { items, status } = useSelector((state) => state.pizzas) // начальный стейт с редакса. Пустой массив и начальное значение для загрузки

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '' // фильтр по категориям
    const search = value ? `&search=${value}` : '' // при изменении инпута оставляем те пиццы, которое подходят под требования

    dispatch(
      fetchPizzas({
        category,
        search,
        currentPage,
        sort,
      })
    ) // UPD: убрал try/catch т.к все запросы идут через редакс и обработка будет в extraReducers
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
    getPizzas()
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
      {status === 'error' ? (
        <>
          <h2>Произошла ошибка 😕</h2>
          <p>Не удалось получить пиццы</p>
        </>
      ) : (
        <div className="content__items">
          {status === 'loading'
            ? skeletons //  при загрузке создаем массив undef , и перебираем его
            : pizzas}
        </div>
      )}

      <Pagination />
    </div>
  )
}

export default Home
