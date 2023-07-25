export interface ApiResponse {
    id:                               string;
    symbol:                           string;
    name:                             string;
    image:                            string;
    current_price:                    number;
    market_cap:                       number;
    market_cap_rank:                  number;
    fully_diluted_valuation:          number;
    total_volume:                     number;
    high_24h:                         number;
    low_24h:                          number;
    price_change_24h:                 number;
    price_change_percentage_24h:      number;
    market_cap_change_24h:            number;
    market_cap_change_percentage_24h: number;
    circulating_supply:               number;
    total_supply:                     number;
    max_supply:                       number;
    ath:                              number;
    ath_change_percentage:            number;
    ath_date:                         Date;
    atl:                              number;
    atl_change_percentage:            number;
    atl_date:                         Date;
    roi:                              null;
    last_updated:                     Date;
}

export type CryptoTypes = {
    id: string,
    symbol: string,
    name: string,
    image: string,
    current_price: number, 
    price_change_percentage_24h: number, 
    total_volume: number
}

export type WeatherTypes = {
    temp: number
    humidity: number
    country: string
    main: string
    icon: string
    date: string
}


interface Edges {
        node: {
          author: {
              bio: string,
              name: string,
              id: string,
              photo: {
                url: string,
              }                
          },
          createdAt: Date,
          slug: string,
          title: string,
          excerpt: string,
          featuredImage: {
            url: string,
          },
          categories: {
              name: string,
              slug: string
          }
      }
  }


export type PostTypes = {
    postsConnection: {
        edges: Array<Edges>
      }
}


