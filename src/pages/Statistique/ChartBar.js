import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Legend
} from "recharts";


export default function Chart() {

    const [bar, setBar] = useState([]);

    const loadBarChart = async () => {
        const result = await axios.get("http://localhost:4000/api/bar");
        console.log(result.data);
        setBar(result.data);
    }

    useEffect(() => {
        loadBarChart();
    }, [])

    return (
        <div>
            <ResponsiveContainer width={400} height={300}>
                <BarChart data={bar}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="persCodeExp" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
