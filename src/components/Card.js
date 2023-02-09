const Card = ({ children }) => {
    return (
        <div className='card border-success mb-3' >
            <div className='card-header text-white bg-success mb-3'>
                <div className='row'>
                    <h5 className='card-title'>Alertas de Fallas, Faltantes y Excesos</h5>
                </div>
            </div>
            <div className='card-body'>
                {children}
                </div>
        </div>
    )
}

export default Card