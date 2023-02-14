import Menu from './components/Menu';
import Card from './components/Card';
import GridView from './components/GridView';


const demo = () => {
  return (
    <>
    <div className='container-fluid' style={{ marginTop: '20px' }}>
      <div className='row'>
        <div className='col-12'>
          <Menu />
        </div>
      </div>
      <div className='row'>
        <div className='col-12'>
          <Card>
              <GridView />
          </Card>
        </div>
      </div>
    </div>

  </>
  )
}


export default demo