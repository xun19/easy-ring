import './App.css';
import { Switch } from 'antd';
import FunctionDemo from './components/FunctionDemo'
import ComponentDemo from './components/ComponentDemo'
import { Component } from 'react'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFunc: true
    }
    this.onChange = this.onChange.bind(this)
  }
  onChange = (checked) => {
    this.setState({
      isFunc: checked
    })
  }
  render() {
    return (
      <div>
          <div>
            <span style={{color:'black', marginRight: '10px'}}>组件风格 | Component</span>
            <Switch defaultChecked  style={{backgroundColor: 'background-color: rgb(233 37 37)'}} onChange={this.onChange} />
            <span style={{color:'black', marginLeft: '10px'}}>函数风格 | Function</span>
          </div>
          { this.state.isFunc ? <FunctionDemo /> : <ComponentDemo/> }
      </div>
    )
  }
}

export default App;
