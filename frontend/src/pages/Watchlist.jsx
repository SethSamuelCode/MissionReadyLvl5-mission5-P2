import React from 'react'
import styles from './Watchlist.module.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

const dummyItems = [
  {
    id: 1,
    title: 'Double bed 1',
    description: 'Description',
    location: 'North shore',
    closingTime: 'Fri 13th July, 4:19pm',
    price: '$1,200',
  },
  {
    id: 2,
    title: 'Double bed 2',
    description: 'Description',
    location: 'North shore',
    closingTime: 'Fri 13th July, 4:19pm',
    price: '$800',
  },
  {
    id: 3,
    title: 'Double bed 3',
    description: 'Description',
    location: 'North shore',
    closingTime: 'Fri 13th July, 4:19pm',
    price: '$1,100',
  },
]

function Watchlist() {}

export default Watchlist
