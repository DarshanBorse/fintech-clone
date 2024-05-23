export async function GET(request: Request): Promise<Response> {
  //   const response = await fetch(`https://api.coinpaprika.com/v1/tickers/btc-bitcoin/historical?start=2024-01-01&interval=1d`);

  //   const result = await response.json();
  //   return Response.json(result?.data);
  return Response.json(data);
}

let data = [
  {
    timestamp: "2024-01-01T00:00:00Z",
    price: 42850.26,
    volume_24h: 12058361624,
    market_cap: 839292148428,
  },
  {
    timestamp: "2024-01-02T00:00:00Z",
    price: 45285.22,
    volume_24h: 26322994437,
    market_cap: 887025221780,
  },
  {
    timestamp: "2024-01-03T00:00:00Z",
    price: 43976.55,
    volume_24h: 29942388903,
    market_cap: 861431009601,
  },
  {
    timestamp: "2024-01-04T00:00:00Z",
    price: 43532.22,
    volume_24h: 29754873104,
    market_cap: 852771850034,
  },
  {
    timestamp: "2024-01-05T00:00:00Z",
    price: 43841.79,
    volume_24h: 24271454099,
    market_cap: 858879240517,
  },
  {
    timestamp: "2024-01-06T00:00:00Z",
    price: 43908.65,
    volume_24h: 18248808441,
    market_cap: 860227941216,
  },

  {
    timestamp: "2024-05-20T00:00:00Z",
    price: 67636.49,
    volume_24h: 18770294496,
    market_cap: 1332499912601,
  },
  {
    timestamp: "2024-05-21T00:00:00Z",
    price: 70649.95,
    volume_24h: 44122899431,
    market_cap: 1391899483135,
  },
  {
    timestamp: "2024-05-22T00:00:00Z",
    price: 69940.13,
    volume_24h: 34450573263,
    market_cap: 1377936380429,
  },
];
