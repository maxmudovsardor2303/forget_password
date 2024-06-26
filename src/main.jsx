import ReactDom from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css"
import  Router  from './router/index'
ReactDom.createRoot(document.getElementById('root')).render(
  <Router/>
)