import { useLocation, useNavigate } from 'react-router-dom'

import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'
import faker from 'faker'

import questions from '../../data.json'
import { IQuizScheme } from '../../utils/validation/QuizScheme'
import { IQuestion } from '../../interfaces/question'

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
)

const labels = [
  'Liderazgo',
  'Toma De Decisiones',
  'Comunicaciones',
  'Manejo De Conflictos',
  'Delegacion',
  'Motivacion Y Desarrollo Del Personal',
  'Manejo Del Tiempo',
  'Direccion De Grupos',
  'Pensamiento Estrategico',
]

interface ILocationState {
  data: IQuizScheme;
}

const dimensions = ['L', 'TD', 'C', 'MC', 'D', 'M y D', 'MT', 'DG', 'PE']

interface IDimensionResult {
  dimension: string;
  score: number;
}

const Result = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { data } = location.state //as ILocationState;

  const resultRaw: IQuestion[] = questions.preguntas.map((element, index) => {
    const result = element.respuestas.find((item) => item.id === data.answers[index].answer)

    return {
      ...element,
      resultado: Number(result?.valor) || 0,
    }
  })

  const resultDimensions: IDimensionResult[] = dimensions.map((dimension) => {
    const dimensionResult = resultRaw.filter((item) => item.dimension === dimension)
    const score = dimensionResult.reduce((acc, curr) => acc + (curr.resultado || 0), 0)
    return {
      dimension,
      score,
    }
  })

  const results = dimensions.map((dimension) => {
    const dimensionResult = resultRaw.filter((item) => item.dimension === dimension)
    const score = dimensionResult.reduce((acc, curr) => acc + (curr.resultado || 0), 0)
    return score
  })

  const score = results.reduce((acc, curr) => acc + curr, 0)
  const time = '12:00'

  //const results = labels.map(() => faker.datatype.number({ min: 1, max: 25 }))

  const dataGraph = {
    labels,
    datasets: [
      {
        type: 'line' as const,
        label: 'Lineal',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 2,
        fill: false,
        data: results,
      },
      {
        type: 'bar' as const,
        label: 'Vertical',
        backgroundColor: 'rgb(53, 162, 235)',
        data: results,
      },
    ],
  }

  console.log('resultRaw', resultRaw)
  console.log('resultDimensions', resultDimensions)
  console.log('results', results)
  console.log('score', score)

  return (
    <div
      className='w-screen min-h-screen overflow-hidden p-4 flex justify-center items-center
    bg-black'>
      <div className='w-full md:w-2/3 lg:w-2/3 p-8 bg-white flex flex-col justify-center items-center'>
        <div className='text-2xl font-bold'>Resultados</div>
        <div className='w-full flex justify-between my-2'>
          <div className='text-xs font-bold'>Tu puntuación es de: {score}</div>
          <div className='text-xs font-bold'>Tiempo utilizado: {time}</div>
        </div>
        <div className='w-full flex justify-between gap-4'>
          <div className='flex-1'>
            <Chart type='bar' data={dataGraph} />
          </div>

          <table className='shadow-lg bg-white my-4'>
            <tr>
              <th className='bg-blue-100 border text-left px-4 py-1'>Habilidad</th>
              <th className='bg-blue-100 border text-left px-4 py-1'>Puntaje</th>
            </tr>
            {resultDimensions.map((item) => (
              <tr>
                <td className='border px-4 py-1'>{item.dimension}</td>
                <td className='border px-4 py-1'>{item.score}</td>
              </tr>
            ))}
          </table>
        </div>

        <button className='bg-blue-500 text-white px-4 py-2 rounded-md mt-4' onClick={() => navigate('/')}>
          Ir al inicio
        </button>
      </div>
    </div>
  )
}

export default Result
