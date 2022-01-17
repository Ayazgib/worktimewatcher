import React, {useEffect, useState} from "react";
import { FormControl, InputLabel,  Theme, Select, MenuItem} from "@mui/material";
import {makeStyles, createStyles} from "@mui/styles";
import {ActivityItem, Month, monthsArr, activities} from "../common/models";
import {XAxis,YAxis, BarChart, CartesianGrid, Tooltip, Legend, Bar} from "recharts";
import { useSelector} from "react-redux";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'grey',
            marginBottom: 10
        },
        chartWrapper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        chartFilters: {
            display: 'flex',
            marginLeft: 60,
        },
        chartMainBlock: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
    }),
);


export const Charts = (props: any) => {
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

    const state = useSelector((state:any) => state)
    const {dataFromLs} = state.global


    function MonthForChart () {}

    function byField(fieldName: string){
        return (a: any, b: any) => a[fieldName] > b[fieldName] ? 1 : -1;
    };
    //TODO нет данных для отображения
    useEffect(() => {
        if (dataFromLs) {
            setAllData(dataFromLs);
            let availableMonths = new Set(), availableActivities = new Set(), chartData: any = [];
            console.log(dataFromLs);
            dataFromLs.sort(byField('startTime')).forEach((data:ActivityItem) => {
                let date = data.startTime.slice(0, 10),
                    [year, month, day] = date.split('-');

                if (month){
                    if( month[0] === '0') month = month.slice(1,2);
                    let monthIndex = Number(month) - 1;

                    if (!chartData[monthIndex]) {
                        //@ts-ignore
                        let obj = new MonthForChart();
                        obj.name = monthsArr[monthIndex];
                        obj[data.currentActivity] = Math.trunc(data.duration / correctedTime)
                        chartData.push(obj)
                    } else {
                        chartData[monthIndex][data.currentActivity] = chartData[monthIndex][data.currentActivity]
                            ? chartData[monthIndex][data.currentActivity] + Math.trunc(data.duration / correctedTime)
                            : Math.trunc(data.duration / correctedTime)
                    }

                    availableMonths.add(month);
                }
                if (data.currentActivity) availableActivities.add(data.currentActivity);
            })
            let availableMonthsObjects = Array.from(availableMonths.values()).map((month: any, i) => {
                    return {name: monthsArr[i], value: i}
                }
            )
            let activitiesArr = Array.from(availableActivities.values())

            setSortedMonths(availableMonthsObjects?.map((month: any) => month.name))
            setAllActivities(activitiesArr);
            setSortedActivities(activitiesArr)
            setChartData(chartData);
            setSortedData(chartData);
            setAvailableMonths(availableMonthsObjects);
        }
    } ,[dataFromLs])

    const handleChange = (event: any, filterName: string) => {
        const {
            target: { value },
        } = event;
        if (filterName === 'month') {
            setSortedMonths(typeof value === 'string' ? value.split(',') : value);
        } else if (filterName === 'activities') {
            setSortedActivities(typeof value === 'string' ? value.split(',') : value);
        }

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
        <div className={classes.chartWrapper + ' mainBlock'}>
                {
                    allData.length
                        ? <div className={classes.chartMainBlock}>
                            <div className={classes.chartFilters}>
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
                                                onChange={(e) => handleChange(e, 'month')}
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
                                                onChange={(e) => handleChange(e, 'activities')}
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
                            </div>
                            <BarChart width={730} height={250} data={sortedData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis name='asd'/>
                                <Tooltip />
                                <Legend />
                                {
                                    sortedActivities.length
                                        ? sortedActivities.map((activity: string) => {
                                            // @ts-ignore
                                            let currentActivity: any = activities[activity];
                                            if (currentActivity) {
                                                return <Bar key={currentActivity.name} dataKey={activity} fill={currentActivity.color} />
                                            }
                                        })
                                        : null
                                }
                            </BarChart>
                        </div>
                        : <h1>Нет данных для отображения</h1>
                }
        </div>
    )
}