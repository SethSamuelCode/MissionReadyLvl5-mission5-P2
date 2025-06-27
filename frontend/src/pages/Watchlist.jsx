import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import styles from '../styles/Watchlist.module.css'

const Watchlist = () => {
  const [watchlistItems, setWatchlistItems] = useState([])
  const navigate = useNavigate()
}
