const Alert = () => {
    return (
        <div className="alert alert-success text-white bg-success" role="alert">
        <div className='row'>
          <div className='col-md-6'>
            <h5 className='card-title'>Coordonación</h5>
          </div>
          <div className='col-md-6'>
            <div className='row'>
              <div className='col-md-6'>
              </div>
              <div className='col-md-6'>
                <button type="button" className="btn btn-danger float-right">Salir</button>
                <button type="button" className="btn btn-secondary float-right">Portal</button>
                <p className='float-left'>nmercaunievas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Alert