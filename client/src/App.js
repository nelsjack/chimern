import React from 'react'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
  }
  componentDidMount() {
    this.fetchData()
  }

  render() {
    return (
      <div>{this.state.name}</div>
    )
  }
  
    async fetchData() {
    await fetch("http://localhost:3333/home")
      .then(res => {
        console.log(res.json().name)
        this.setState({name: 'poop'})
      }).catch(err => console.log(err))
    }
}

export default App;
