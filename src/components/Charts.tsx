import React, {useEffect, useState} from "react";
import {Autocomplete, FormControl, InputLabel, TextField, Theme, Select, MenuItem} from "@mui/material";
import {makeStyles, createStyles} from "@mui/styles";
import {ActivityItem, Month, monthsArr} from "../common/models";
import {XAxis,YAxis, BarChart, CartesianGrid, Tooltip, Legend, Bar} from "recharts";
import moment from "moment";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'grey',
            marginBottom: 10
        },

    }),
);

interface ChartsProps {
    data: ActivityItem[],
}

const data = [
    {
        "name": "Page A",
        "uv": 4000,
        "pv": 2400
    },
    {
        "name": "Page B",
        "uv": 3000,
        "pv": 1398
    },
    {
        "name": "Page C",
        "uv": 2000,
        "pv": 9800
    },
    {
        "name": "Page D",
        "uv": 2780,
        "pv": 3908
    },
    {
        "name": "Page E",
        "uv": 1890,
        "pv": 4800
    },
    {
        "name": "Page F",
        "uv": 2390,
        "pv": 3800
    },
    {
        "name": "Page G",
        "uv": 3490,
        "pv": 4300
    }
]

export const Charts = (props: ChartsProps) => {
    const classes = useStyles();
    const [allData, setAllData] = useState<any>([])
    const [months, setMonths] = useState<any>([])
    const [availableMonths, setAvailableMonths] = useState<Month []>([]);
    const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
    const [sortedMonths, setSortedMonths] = useState<Month []>([]);
    const [chartData, setChartData] = useState<any>([])
    const [sortedData, setSortedData] = useState<any>([]);
    const [correctedTime, setCorrectedTime] = useState<number>(60000);
    const [allActivities, setAllActivities] = useState<any>([]);
    const [sortedActivities, setSortedActivities] = useState<any>([])

    function MonthForChart () {}

    function byField(fieldName: string){
        return (a: any, b: any) => a[fieldName] > b[fieldName] ? 1 : -1;
    };
    /* TODO перевести время в минуты,
        добавить фильтр месяца
         фильтр активности (активность через компонент изи)
    * */
    useEffect(() => {
        if (props.data) {
            console.log(props.data)
            setAllData(props.data);
            let availableMonths = new Set(), availableActivities = new Set(), chartData: any = [];

            props.data.sort(byField('startTime')).forEach((data:ActivityItem) => {
                let date = data.startTime.slice(0, 10),
                    [year, month, day] = date.split('-');

                if (month){
                    if( month[0] === '0') month = month.slice(1,2);
                    let monthIndex = Number(month) - 1;

                    if (!chartData[monthIndex]) {
                        //@ts-ignore
                        let obj = new MonthForChart();
                        obj.name = monthsArr[monthIndex];
                        obj[data.activityType] = Math.ceil(data.duration / correctedTime)
                        chartData.push(obj)
                    } else {
                        chartData[monthIndex][data.activityType] = chartData[monthIndex][data.activityType]
                            ? chartData[monthIndex][data.activityType] + Math.ceil(data.duration / correctedTime)
                            : Math.ceil(data.duration / correctedTime)
                    }

                    availableMonths.add(month);
                }
                availableActivities.add(data.activityType);
            })
            let availableMonthsObjects = Array.from(availableMonths.values()).map((month: any, i) => {
                    return {name: monthsArr[i], value: i}
                }
            )
            let activitiesArr = Array.from(availableActivities.values())
            setAllActivities(activitiesArr);
            setSortedActivities(activitiesArr)
            setChartData(chartData);
            setSortedData(chartData);
            setAvailableMonths(availableMonthsObjects);
        }
    } ,[props.data])

    const handleChange = (event: any) => {
        const {
            target: { value },
        } = event;

        setSortedMonths(typeof value === 'string' ? value.split(',') : value);
    }

    const sortByMonthName = (a: any, b: any) => {
        let month1 = monthsArr.findIndex(month => month.toLowerCase() === a.toLowerCase()),
            month2 = monthsArr.findIndex(month => month.toLowerCase() === b.toLowerCase())
        if(month1 < month2) { return -1; }
        if(month1 > month2) { return 1; }
        return 0;
    }

    useEffect(() => {
        let sortedArr:any = []
        sortedMonths.sort(sortByMonthName).forEach(monthsName => {
            sortedArr.push(...chartData.filter((data:any) => data.name === monthsName))
        })
        setSortedData(sortedArr);
    }, [sortedMonths])

    return (
        <div>
            {
                availableMonths && availableMonths.length ?
                    <FormControl sx={{m: 1, width: 300}}>
                        <InputLabel id="demo-multiple-name-label">Фильтр месяца</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            label='Фильтр по месяцу'
                            id="demo-multiple-name"
                            multiple
                            value={sortedMonths}
                            onChange={handleChange}
                        >
                            {availableMonths.map((month: any) => (
                                <MenuItem
                                    key={month.value}
                                    value={month.name}
                                >
                                    {month.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    : null
            }
            {
                allActivities && allActivities.length
                    ? <FormControl sx={{m: 1, width: 300}}>
                        <InputLabel id="demo-multiple-name-label">Фильтр активности</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            label='Фильтр по месяцу'
                            id="demo-multiple-name"
                            multiple
                            value={sortedActivities}
                            onChange={handleChange}
                        >
                            {allActivities.map((activity: any, index: number) => (
                                <MenuItem
                                    key={index}
                                    value={activity}
                                >
                                    {activity}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    : null
            }


            <BarChart width={730} height={250} data={sortedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="work" fill="#8884d8" />
                <Bar dataKey="study" fill="#82ca9d" />
            </BarChart>
        </div>
    )
}