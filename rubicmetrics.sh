#!/bin/bash

cd rubicmetrics

git pull origin main

echo "Press 'q' to exit"
read -n 1 k <&1
if [[ $k = q ]] ; then
printf "\nQuitting from the program\n"
exit 1
fi

# scrap price and numbers of eth adresses
curl -o etherscan_daily.txt https://etherscan.io/token/0xa4eed63db85311e22df4473f87ccfc3dadcfa3e3
INPUT_PRICE=$(grep "small text-secondary text-nowrap" etherscan_daily.txt)
PRICE=$(echo $INPUT_PRICE | tr -d \'\"$ | cut -d'>' -f 1 | cut -d'=' -f 4)
ETH_INPUT_ADRESSES=$(grep "from previous day" etherscan_daily.txt)
ETH_ADRESSES_=$(echo $ETH_INPUT_ADRESSES | tr -d [:space:] | cut -d'<' -f 1)
ETH_ADRESSES=${ETH_ADRESSES_//[,]/}

# scrap numbers of bsc adresses
curl -o etherscan_daily.txt https://bscscan.com/token/0x8e3bcc334657560253b83f08331d85267316e08a
BSC_INPUT_ADRESSES=$(grep "addresses" etherscan_daily.txt)
BSC_ADRESSES_=$(echo $BSC_INPUT_ADRESSES | cut -d' ' -f 1)
BSC_ADRESSES=${BSC_ADRESSES_//[,]/}

# scrap numbers of polygon adresses
curl -o etherscan_daily.txt https://polygonscan.com/token/0xc3cffdaf8f3fdf07da6d5e3a89b8723d5e385ff8
MATIC_INPUT_ADRESSES=$(grep "addresses" etherscan_daily.txt)
MATIC_ADRESSES_=$(echo $MATIC_INPUT_ADRESSES | cut -d' ' -f 1)
MATIC_ADRESSES=${MATIC_ADRESSES_//[,]/}

# scrap volumes on rubic.exchange
curl -o etherscan_daily.txt https://api.rubic.exchange/api/total_values/

TOTAL_VALUES=$(cat etherscan_daily.txt)
INSTANT_TRADES=$(echo $TOTAL_VALUES | tr -d \'\"\{\} | tr , : | cut -d':' -f 2)
BRIDGES=$(echo $TOTAL_VALUES | tr -d \'\"\{\} | tr , : |  cut -d':' -f 4)

ROUNDED_INSTANT_TRADES=$(printf "%.0f\n" $INSTANT_TRADES)
ROUNDED_BRIDGES=$(printf "%.0f\n" $BRIDGES)

TOTAL_ADRESSES=$(awk "BEGIN {print $ETH_ADRESSES+$BSC_ADRESSES+$MATIC_ADRESSES; exit}")

# retrieving previous data from yesterday for daily variations
PREV_DATA=$( tail -n 1 rubicmetrics.csv)
IFS=","
read -r _ _ _ PREV_TOTAL_ADRESSES _ PREV_ETH_ADRESSES _ PREV_BSC_ADRESSES _ PREV_MATIC_ADRESSES _ PREV_ROUNDED_INSTANT_TRADES _ PREV_ROUNDED_BRIDGES _ <<< $PREV_DATA

# unset IFS cuz $SEP is set at "," after
IFS=" "

# computing daily variations
VAR_TOTAL_ADRESSES=$(awk "BEGIN {print $TOTAL_ADRESSES-$PREV_TOTAL_ADRESSES; exit}")
VAR_ETH_ADRESSES=$(awk "BEGIN {print $ETH_ADRESSES-$PREV_ETH_ADRESSES; exit}")
VAR_BSC_ADRESSES=$(awk "BEGIN {print $BSC_ADRESSES-$PREV_BSC_ADRESSES; exit}")
VAR_MATIC_ADRESSES=$(awk "BEGIN {print $MATIC_ADRESSES-$PREV_MATIC_ADRESSES; exit}")
VAR_ROUNDED_INSTANT_TRADES=$(awk "BEGIN {print $ROUNDED_INSTANT_TRADES-$PREV_ROUNDED_INSTANT_TRADES; exit}")
VAR_ROUNDED_BRIDGES=$(awk "BEGIN {print $ROUNDED_BRIDGES-$PREV_ROUNDED_BRIDGES; exit}")

echo ""
echo ""
echo "Total Eth adresses / yesterday / variation :"
echo "$ETH_ADRESSES / $PREV_ETH_ADRESSES / $VAR_ETH_ADRESSES ok"
echo ""
echo "Total Bsc adresses / yesterday / variation :"
echo "$BSC_ADRESSES / $PREV_BSC_ADRESSES / $VAR_BSC_ADRESSES ok"
echo ""
echo "Total Matic adresses / yesterday / variation :"
echo "$MATIC_ADRESSES / $PREV_MATIC_ADRESSES / $VAR_MATIC_ADRESSES ok"
echo ""
echo "Total adresses / yesterday / variation :"
echo "$TOTAL_ADRESSES / $PREV_TOTAL_ADRESSES / $VAR_TOTAL_ADRESSES ok"
echo ""
echo "Total instants swaps volume / yesterday / variation :"
echo "$ROUNDED_INSTANT_TRADES / $PREV_ROUNDED_INSTANT_TRADES / $VAR_ROUNDED_INSTANT_TRADES ok"
echo ""
echo "Total crosschain swaps + bridges volume / yesterday / variation :"
echo "$ROUNDED_BRIDGES / $PREV_ROUNDED_BRIDGES / $VAR_ROUNDED_BRIDGES ok"
echo ""

NOW=$( date -u +"%Y-%m-%dT%H:%M:%SZ")
SEP=","
SCRAPPEDSTATUS="S"
DAILYMETRICS="$NOW$SEP$SCRAPPEDSTATUS$SEP$PRICE$SEP$TOTAL_ADRESSES$SEP$VAR_TOTAL_ADRESSES$SEP$ETH_ADRESSES$SEP$VAR_ETH_ADRESSES$SEP$BSC_ADRESSES$SEP$VAR_BSC_ADRESSES$SEP$MATIC_ADRESSES$SEP$VAR_MATIC_ADRESSES$SEP$ROUNDED_INSTANT_TRADES$SEP$VAR_ROUNDED_INSTANT_TRADES$SEP$ROUNDED_BRIDGES$SEP$VAR_ROUNDED_BRIDGES"
echo $DAILYMETRICS

echo "Press any key to write values and push, or press 'q' to exit"
read -n 1 k <&1
if [[ $k = q ]] ; then
printf "\nQuitting from the program\n"
exit 1
fi

echo $DAILYMETRICS >> rubicmetrics.csv

git commit rubicmetrics.csv -m "daily metrics"
git push -u origin main


exit 0
