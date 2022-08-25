interface Props {}

const index: React.FC<Props> = () => {
  return (
    <div className='flex items-center justify-center'>
      <div className='w-2/5 flex flex-col gap-2 '>
        <div className='flex gap-8 bg-gray-100 p-5 rounded'>
          <p>Pregunta - 3</p>
          <div>
            <h3 className='font-black text-gray-800 text-xl'>Pregunta?</h3>
            <div className='flex flex-col gap-2 mt-4'>
              {Array(4)
                .fill(0)
                .map((_, index) => (
                  <div className='flex'>
                    <div className='flex items-center h-5'>
                      <input
                        id='helper-radio'
                        aria-describedby='helper-radio-text'
                        type='radio'
                        defaultValue=''
                        className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2'
                      />
                    </div>
                    <div className='ml-2 text-sm'>
                      <label htmlFor='helper-radio' className='font-medium text-gray-900'>
                        Respuesta {index + 1}
                      </label>
                      <p id='helper-radio-text' className='text-xs font-normal text-gray-500'>
                        Descripcion si existe
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className='flex justify-between bg-gray-100 rounded p-2'>
          <button
            type='button'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
            Anterior
          </button>
          <button
            type='button'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
            Siguiente
          </button>
        </div>
      </div>
    </div>
  )
}

export default index
