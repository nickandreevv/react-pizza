import { useContext } from 'react'
import ReactPaginate from 'react-paginate'
import { HomeContext } from '../Pages/Home'
import s from './Pagination.module.scss'

const Pagination = () => {
  const { onChangePage } = useContext(HomeContext)
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
