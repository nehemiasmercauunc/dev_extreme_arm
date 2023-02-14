const AlertMsg = ({ tipo, titulo, mensaje }) => {
    return (
        <div className={`alert alert-${tipo}`} role="alert">
            {titulo === undefined ? null : <><h5 className="alert-heading">{titulo}</h5><hr /></>}
            <h5 className="alert-heading">{titulo}</h5>
            
            <p className="mb-0">{mensaje}</p>
        </div>
    )
}

export default AlertMsg