import React from 'react'
import ReactDOM from 'react-dom'

// Tee summafunktio

const Header = ({ otsikko }) => {
  return <h1>{otsikko}</h1>
}

const Button = ({ handleClick, name }) => {
  return <button onClick={handleClick}>{name}</button>
}

const Statistics = props => {
  console.log(props.statistiikka[0].name, props.statistiikka[0].amount)

  props.statistiikka[0].amount = sum(props.arvostelut.map(a => a.amount * a.value))

  let arvosteluRivit = props.arvostelut.map(s => (
    <StatisticRow key={s.name} name={s.name} amount={s.amount} />
  ))

  let statistiikkaRivit = props.statistiikka.map(s => (
    <StatisticRow key={s.name} name={s.name} amount={s.amount} />
  ))

  return (
    <div>
      <h2>Arvostelut</h2>
      {arvosteluRivit}
      <h2>Statistiikka</h2>
      {statistiikkaRivit}
    </div>
  )
}

const StatisticRow = ({ name, amount }) => {
  return (
    <p>
      {name}: {amount}
    </p>
  )
}

class App extends React.Component {
  state = {
    arvostelut: [
      {
        name: 'hyvä',
        value: 1,
        amount: 0
      },
      {
        name: 'neutraali',
        value: 0,
        amount: 0
      },
      {
        name: 'huono',
        value: -1,
        amount: 0
      }
    ],
    statistiikka: [
      {
        name: 'keskiarvo',
        amount: 0
      },
      {
        name: 'positiivisia',
        amount: 0
      }
    ]
  }

  lisaaArvostelu = arvostelu => {
    arvostelu.amount += 1
    this.setState({ arvostelut: this.state.arvostelut })
  }

  render () {
    let buttons = this.state.arvostelut.map(s => (
      <Button
        key={s.name}
        handleClick={() => this.lisaaArvostelu(s)}
        name={s.name}
      />
    ))

    return (
      <div>
        <Header otsikko='Anna palautetta' />
        {buttons}
        <Statistics arvostelut={this.state.arvostelut} statistiikka={this.state.statistiikka} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
