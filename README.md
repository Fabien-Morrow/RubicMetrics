# RubicMetrics, static webpage monitoring metrics from rubic.exchange

### 


Notes on data consistency

* I've started monitor eth adresses 27/07/2021
* I monitor total on 3 chains since 31/08/2021
* I monitor each adresses on each chain since 20/09/2021
* Eth adresses from 25 sept 2020 to 30/06/2021 come from bloxy
* price come from bloxy and from coingecko from 26 june to 26 july

So I've made some approximation on stats between 31/08/21 and 20/09/2021, with linear interpolation (flemme de faire mieux...) :
* 1 to 130 holders between 28/08 (estimated token release) and 20/09 on Polygon is purely linear interpolation
* This interpolation leads to 200 adresses holding wrbc on bsc on 31/08 (cuz 17 polygon adresses this day and a total of 8076 adresses)
* Build bsc interpolation with 200 adresses on 31/08/21 and 2194 adresses on 20/09/2021
* Eth adresses estimation obtained by total adresses - bsc_adresses - polygon_adresses
* Linear interpolation on eth adresses between 1 july and 26 july.

Finally :
* Before 30/08/21, theses are the real eth adresses
* Between 31/08/21 and 20/09/2021 all adresses on all chains are approximations, only total on both 3 chains is real.
* After 20/09/21, accurate adresses on both 3 chains daily

-----------------

notes on holders.csv structure

* date
* status : H = historical values ; S = scrapped on time ; I = missed so interpolated
* price
* total_adresses : total adresses on both chains
* var_total_adresses : daily variation between today and yesterday
* eth_adresses : total adresses Ethereum
* var_eth_adresses : daily variation between today and yesterday
* bsc_adresses : total adresses Binance Smart Chain
* var_bsc_adresses : daily variation between today and yesterday
* matic_adresses : total adresses on Polygon
* var_matic_adresses : daily variation between today and yesterday
* instant_trades : Cumulated daily swaps volume on rubic.exchange
* var_instant_trades : daily variation between today and yesterday
* bridges : Cumulated daily bridges volume on rubic.exchange, including crosschains swaps
* var_bridges : daily variation between today and yesterday



