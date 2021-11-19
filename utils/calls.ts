/*
To do:

Yahoo To Do
- capture chart events
  - bullish / bearish
  - short to long term performance outlook
- anything with other time periods?
*/

export const yahoo = async (ticker: string) => {
  let buys: number[] = []

  const response = await fetch(`https://finance.yahoo.com/quote/${ticker}/`, {mode: 'no-cors'}) // 'cors' by default
  const text = await response.text()

  // {"trend":[{"period":"0m","strongBuy":2,"buy":1,"hold":3,"sell":1,"strongSell":0},{"period":"-1m","strongBuy":2,"buy":5,"hold":1,"sell":0,"strongSell":0},{"period":"-2m","strongBuy":2,"buy":5,"hold":1,"sell":0,"strongSell":0},{"period":"-3m","strongBuy":2,"buy":1,"hold":4,"sell":0,"strongSell":0}],"maxAge":86400}
  const buysString = text.match(/{"trend":(.*?)"maxAge":[0-9]+}/gm)
  if (buysString !== null) {
    const buysJson = JSON.parse(buysString[0])
    
    // console.log(buysJson)
    const current = buysJson.trend[0];
    buys = [current.strongBuy, current.buy, current.hold, current.sell, current.strongSell]
  }

  console.log('buys', buys)
  return buys
}

export const marketwatch = async (ticker: string) => {
  const marketwatchResponse = await fetch(`https://www.marketwatch.com/investing/stock/${ticker}/analystestimates/`, {mode: 'no-cors'}) // 'cors' by default
  const marketwatchText = await marketwatchResponse.text()
}