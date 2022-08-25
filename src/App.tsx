import Question from 'components/Quiz/Question'

function App() {
  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-screen-xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8'>
        <div className='flex flex-col items-center mb-4'>
          <div className='flex flex-col justify-between bg-gray-100 rounded p-2 w-2/5'>
            <div className='flex justify-between'>
              <h1>Formulario</h1>
              <span>Tiempo de Limite</span>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700'>
              <div className='bg-blue-600 h-1.5 rounded-full dark:bg-blue-500' style={{ width: '45%' }}></div>
            </div>
          </div>
        </div>

        <Question />
      </div>
    </div>
  )
}

export default App
