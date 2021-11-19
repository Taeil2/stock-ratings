// import { marketwatch, yahoo } from '../utils/calls'
import { useEffect, useState } from 'react'

interface ResultsProps {
  search?: string;
}

const Results = () => {
  const [ scores, setScores ] = useState({})
  const [ test, setTest ] = useState(0)

  const yahoo = async (ticker: string) => {
    let buys: number[] = []
  
    const response = await fetch(`https://finance.yahoo.com/quote/${ticker}/`, {mode: 'no-cors'}) // 'cors' by default
    const text = await response.text()
  
    // {"trend":[{"period":"0m","strongBuy":2,"buy":1,"hold":3,"sell":1,"strongSell":0},{"period":"-1m","strongBuy":2,"buy":5,"hold":1,"sell":0,"strongSell":0},{"period":"-2m","strongBuy":2,"buy":5,"hold":1,"sell":0,"strongSell":0},{"period":"-3m","strongBuy":2,"buy":1,"hold":4,"sell":0,"strongSell":0}],"maxAge":86400}
    const buysString = await text.match(/{"trend":(.*?)"maxAge":[0-9]+}/gm)
    if (buysString !== null) {
      const buysJson = JSON.parse(buysString[0])
      
      // console.log(buysJson)
      const current = buysJson.trend[0];
      console.log(current)
      buys = [current.strongBuy, current.buy, current.hold, current.sell, current.strongSell]
    }
  
    setScores({'yahoo': buys})
  }

  

  const yahoo2 = (ticker: string) => {
    fetch(`https://finance.yahoo.com/quote/${ticker}/`, {mode: 'no-cors'})
      .then(response => {
        console.log(response)
        return response.text()
      })
      .then(data => {
        let buys: number[] = [];
        const buysString = data.match(/{"trend":(.*?)"maxAge":[0-9]+}/gm)
        if (buysString !== null) {
          const buysJson = JSON.parse(buysString[0])
          const current = buysJson.trend[0]
          buys = [current.strongBuy, current.buy, current.hold, current.sell, current.strongSell]
        }
      
        setScores({'yahoo': buys})
        console.log(buys)
      })
    // const text = await response.text()
  }

  const marketwatch = async (ticker: string) => {
    const response = await fetch(`https://www.marketwatch.com/investing/stock/${ticker}/analystestimates/`, {mode: 'no-cors'}) // 'cors' by default
    const text = await response.text()
    console.log('text', text)
  }

  const marketwatch2 = (ticker: string) => {
    fetch(`https://www.marketwatch.com/investing/stock/${ticker}/analystestimates/`, {mode: 'no-cors'})
      .then(response => console.log('response', response))
      .then(data => console.log('data', data))
    // const text = await response.text()
  }

  // yahoo('hri')
  // yahoo2('hri')
  // console.log('scores', scores)

  return (
    <div>
      <p>hi</p>
      { scores.hasOwnProperty('yahoo') && 
        <div>
          yahoo
          <div>{scores.yahoo[0]}</div>
          <div>{scores.yahoo[1]}</div>
          <div>{scores.yahoo[2]}</div>
          <div>{scores.yahoo[3]}</div>
          <div>{scores.yahoo[4]}</div>
        </div>
      }
      { scores.hasOwnProperty('marketwatch') && 
        <div>marketwatch</div>
      }
    </div>
  )
}

export default Results;