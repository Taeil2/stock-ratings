import { constants } from "buffer"

// const jsdom = require("jsdom")
// const { JSDOM } = jsdom

const Results = () => {
  const getResults = async (ticker: string) => {
    console.log(ticker);

    // Yahoo
    // fetch('examples/example.json')
    //   .then(function(response) {
    //     if (!response.ok) {
    //       throw Error(response.statusText);
    //     }
    //     // Do stuff with the response
    //   })
    //   .catch(function(error) {
    //     console.log('Looks like there was a problem: \n', error);
    //   });

    const response = await fetch(`https://finance.yahoo.com/quote/${ticker}/`)
    const text = await response.text()
    // const dom = await new JSDOM(text)

    // {"trend":[{"period":"0m","strongBuy":2,"buy":1,"hold":3,"sell":1,"strongSell":0},{"period":"-1m","strongBuy":2,"buy":5,"hold":1,"sell":0,"strongSell":0},{"period":"-2m","strongBuy":2,"buy":5,"hold":1,"sell":0,"strongSell":0},{"period":"-3m","strongBuy":2,"buy":1,"hold":4,"sell":0,"strongSell":0}],"maxAge":86400}
    const yahooBuysString = text.match(/{"trend":(.*?)"maxAge":[0-9]+}/gm)
    if (yahooBuysString !== null) {
      const yahooBuysJson = JSON.parse(yahooBuysString[0])
      console.log(yahooBuysJson)
    }
    console.log('fetching');
  }

  getResults('HRI')

  return <div><p>hi</p></div>;
}

export default Results;