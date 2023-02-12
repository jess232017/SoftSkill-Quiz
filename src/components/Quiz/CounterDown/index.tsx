import { FC } from 'react'
import useCountdown from '@bradgarropy/use-countdown'

interface ICounterDownProps {
  minutes: number
  seconds: number
  className?: string
  format: 'hh:mm:ss' | 'mm:ss' | 'ss'
  onCompleted?: () => void
}

const CounterDown: FC<ICounterDownProps> = ({ minutes, seconds, format, onCompleted, className }) => {
  const countdown = useCountdown({ minutes, seconds, format, onCompleted })
  return <span className={className}>{countdown.formatted}</span>
}

export default CounterDown
