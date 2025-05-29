
import React from 'react'

const Card = () => {
  return (
    <div className='bg-gray-900 border-gray-800 rounded-lg border overflow-hidden'>
      <div className='p-4 pb-2'>
        <div className='text-sm font-media'>
            titulo
        </div>
        <div className='text-sm text-gray-400'>
            Descripcion del card
        </div>
        <div className='p-4'>
            children
        </div>
      </div>
    </div>
  )
}

export default Card
