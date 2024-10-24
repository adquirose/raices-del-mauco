const convertirAMoneda = (cantidad) => {
    return new Intl.NumberFormat(
        'es-CL',
        {style: 'currency', currency:'' , minimumFractionDigits:0}
    ).format(cantidad)
  }
  export default convertirAMoneda