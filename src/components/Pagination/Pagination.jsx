import ReactPaginate from 'react-paginate'
import { useDispatch } from 'react-redux'
import s from './Pagination.module.scss'
import { setCurrentPage } from '../../redux/slices/filterSlice'

const Pagination = () => {
  const dispatch = useDispatch()

  const onChangePage = (num) => {
    dispatch(setCurrentPage(num))
  }
  return (
    <ReactPaginate
      className={s.root}
      breakLabel="..."
      nextLabel=" >"
      previousLabel="< "
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      renderOnZeroPageCount={null}
    />
  )
}

export default Pagination
