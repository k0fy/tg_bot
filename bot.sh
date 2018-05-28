#!/bin/bash

##
info1_2(){
    # by jlgb
    echo "    __   "
    echo " __ )( $1"
    echo " )((__) $2"
    echo "(_')(    "
    echo "  (__)   "
}

info1_2 "telegram" "Bot"

if [ $# -eq 1 ]
then
  case $1 in
    start)
      if [ ! -e PID ]
      then
        echo "+++START BOT+++" > log
        node main.js >> log 2>error &
        echo $! > PID
        
      else
        echo "el bot ya esta corriendo"
      fi
    ;;
    
    stop)
      if [ ! -e PID ]
      then
        echo "The bot is not running"
      else
        kill -9 $(cat PID)
        echo "+++STOP BOT+++" >> log
        rm PID
      fi
    ;;
    *)
      echo "bot.sh [start|stop]"
  esac
else
