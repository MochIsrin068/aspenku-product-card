import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import ListPage from './pages/list'
import DetailPage from './pages/detail'


const Routes = () =>{
    return (
        <Router>
            <Switch>
                <Route path="/detail/:permalink" component={DetailPage}/>
                <Route path="/" exact  component={ListPage}/>
            </Switch>
        </Router>
    )
}

export default Routes