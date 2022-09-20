import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const triggerError = (error: string, title = 'Error!') => {
  return MySwal.fire({
    title: title,
    text: error,
    icon: 'error',
  })
}

const triggerLoading = (loading: string, title = 'Cargando...') => {
  return MySwal.fire({
    title: title,
    text: loading,
    icon: 'info',
  })
}

const triggerSuccess = (success: string, title = 'Todo correcto!') => {
  return MySwal.fire({
    title: title,
    text: success,
    icon: 'success',
  })
}

const triggerWarning = (warning: string, title = 'Alerta!') => {
  return MySwal.fire({
    title: title,
    text: warning,
    icon: 'warning',
  })
}

const triggerRequest = async (request: string, title = 'Petición!') => {
  return MySwal.fire({
    title: title,
    input: 'text',
    inputLabel: request,
    inputAttributes: {
      autocapitalize: 'off',
    },
    showCancelButton: true,
    confirmButtonText: 'Entiendo y acepto',
    confirmButtonColor: '#ef4444',
  })
}

export { triggerError, triggerLoading, triggerSuccess, triggerRequest, triggerWarning }
export default MySwal
