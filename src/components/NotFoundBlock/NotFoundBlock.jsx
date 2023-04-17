import React from 'react'
import s from './NotFoundBlock.module.scss'

const NotFoundBlock = () => {
  return (
    <div className={s.root}>
      <h1>404 Not Found</h1>
      <br />
      <p className={s.decription}>
        к сожалению данная страница отсутствует в нашем интернет-магазине{' '}
      </p>
    </div>
  )
}

export default NotFoundBlock
