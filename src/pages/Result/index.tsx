import { useState, useMemo } from 'react'
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

import questions from '../../data.json'
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

const dimensions = ['L', 'TD', 'C', 'MC', 'D', 'M y D', 'MT', 'DG', 'PE']

interface IDimensionResult {
  dimension: string
  score: number
}

const Result = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [finishDate] = useState(new Date())
  const { data, startedDate, name } = location.state //as ILocationState;

  //calculate time difference between start and finish then convert to minutes and seconds
  const timeResult = useMemo(() => {
    const timeDiff = Math.abs(finishDate.getTime() - startedDate.getTime())
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60)
    const seconds = Math.floor((timeDiff / 1000) % 60)
    return `${minutes} minutos y ${seconds} segundos`
  }, [finishDate, startedDate])

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

  const printResult = () => {
    window.print()
  }

  return (
    <div
      className='flex min-h-screen w-screen items-center justify-center overflow-hidden bg-black
    p-4'>
      <div className='flex w-full flex-col items-center justify-center bg-white p-8 md:w-2/3 lg:w-2/3'>
        <h1 className='flex text-2xl font-bold print:mb-10'>
          Resultados <span className='ml-2 hidden print:block'> de: {name}</span>
        </h1>
        <div className='my-2 flex w-full justify-between'>
          <div className='text-xs font-bold'>Tu puntuación es de: {score}</div>
          <div className='text-xs font-bold'>Tiempo utilizado: {timeResult}</div>
        </div>
        <div className='flex w-full justify-between gap-4 print:flex-col'>
          <div className='flex-1'>
            <Chart type='bar' data={dataGraph} />
          </div>

          <table className='my-4 bg-white shadow-lg'>
            <thead>
              <tr>
                <th className='border bg-blue-100 px-4 py-1 text-left'>Habilidad</th>
                <th className='border bg-blue-100 px-4 py-1 text-left'>Puntaje</th>
              </tr>
            </thead>
            <tbody>
              {resultDimensions.map((item, i) => (
                <tr key={i}>
                  <td className='border px-4 py-1'>{item.dimension}</td>
                  <td className='border px-4 py-1'>{item.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='flex w-full justify-center gap-4'>
          <button
            className='mt-4 rounded-md bg-gray-500 px-4 py-2 text-white print:hidden'
            onClick={() => navigate('/')}>
            Ir al inicio
          </button>

          <button className='mt-4 rounded-md bg-blue-500 px-4 py-2 text-white print:hidden' onClick={printResult}>
            Imprimir Resultados
          </button>
        </div>
      </div>
    </div>
  )
}

export default Result
