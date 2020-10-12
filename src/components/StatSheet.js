import React, {useState, useEffect} from 'react';
import { TRACKER_INDEX_URL } from "../constants";
import axios from 'axios';

const StatSheet = (props) => {
    const [stats, setStats] = useState({});

    const fetchStats = () => {
        return axios.get(TRACKER_INDEX_URL)
        .then((res) => {
            setStats(res.data);
        })
        .catch((err) => {
            console.warn(err);
        });
    }

    const pollStats = () => {
        const responsePromise = new Promise((resolve, reject) => {
            axios.get(TRACKER_INDEX_URL)
            .then((res) => {
                console.log(res.data);
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
        });
        
        onStatRecievalCompareToState(responsePromise)
    }

    const onStatRecievalCompareToState = (getStatsPromise) => {
        getStatsPromise.then((data) => {
            
            if (data["incomplete_total"] !== stats.incomplete_total) {
                setStats(data);
            }
        })
        .catch((err) => {
            console.warn(err);
        });
    }

    const displayStats = () => {
        return (
          <ul>
            <li>
              <strong>Grand Completed Total: </strong>
              {stats.grand_total}
            </li>
            <li>
              <strong>Weekly Completed Total: </strong>
              {stats.weekly_total}
            </li>
            <li>
              <strong>Daily Completed Total: </strong>
              {stats.daily_total}
            </li>
            <li>
              <strong>Grand Incomplete Total: </strong>
              {stats.incomplete_total}
            </li>
            <li>
              <strong>Weekly Incomplete Total: </strong>
              {stats.incomplete_weekly_total}
            </li>
            <li>
              <strong>Daily Incomplete Total: </strong>
              {stats.incomplete_daily_total}
            </li>
          </ul>
        );
    }

    useEffect(() => {
        fetchStats();
        setInterval(pollStats, 3000);
    }, [])
    return (
        <React.Fragment>
            {displayStats()}
        </React.Fragment>
    );
}

export default StatSheet;
