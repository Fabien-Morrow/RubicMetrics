# RubicMetrics, unofficial static webpage monitoring metrics from rubic.exchange

### 

FAQ :
* ** What is RubicMetrics ?**
* I wanted to monitor some metrics of the Rubic project, and to share them with others. Goal is quite simple so I wanted it require low tech : no server, no db, etc. 

* ** Are you member of Rubic team ?**
* No.

* ** Why no PHP / bootstrap / jquery...**
* I'm not dev, I'm learning HTML, js and bash while building this project. Also I don't like the idea to include such heavy libraries to build a page as simple as mine.

* ** where data come from ?** 
* Data are scrapped everyday and git pushed with a script manually launched everyday on my smartphone at 10h30UTC (haven't checked if cron can works on termux). Data collected, especially historic ones may contains errors.

* ** I've too much cubes, can I unload some of my bags on you ? **
* 0x3af08f4Eb37F0CA8dAFA33b59f75b962F7e5cE66
-----------------

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
* total_addresses : total addresses on both chains
* var_total_adresses : daily variation between today and yesterday
* eth_addresses : total addresses Ethereum
* var_eth_addresses : daily variation between today and yesterday
* bsc_addresses : total addresses Binance Smart Chain
* var_bsc_addresses : daily variation between today and yesterday
* matic_addresses : total addresses on Polygon
* var_matic_addresses : daily variation between today and yesterday
* instant_trades : Cumulated daily swaps volume on rubic.exchange
* var_instant_trades : daily variation between today and yesterday
* bridges : Cumulated daily bridges volume on rubic.exchange, including crosschains swaps
* var_bridges : daily variation between today and yesterday



