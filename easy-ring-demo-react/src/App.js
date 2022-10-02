import './App.css';
import { Switch } from 'antd';
import FunctionDemo from './components/FunctionDemo'
import ComponentDemo from './components/ComponentDemo'
import { useState } from 'react'

const App = () => {
  const [isFunc, setIsFunc] = useState(true)
  const onChange = (checked) => {
    setIsFunc(checked)
  }
  return (
    <div>
        <div style={{padding: 30}}>
          <span style={{color:'black', marginRight: '10px'}}>组件风格 | Component</span>
          <Switch defaultChecked  style={{backgroundColor: 'background-color: rgb(233 37 37)'}} onChange={onChange} />
          <span style={{color:'black', marginLeft: '10px'}}>函数风格 | Function</span>
        </div>
        { isFunc ? <FunctionDemo /> : <ComponentDemo/> }
    </div>
  )
}

export default App;
