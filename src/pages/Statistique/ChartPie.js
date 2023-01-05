import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    PieChart,
    Pie,
    Tooltip,
    ResponsiveContainer,
} from "recharts";


export default function ChartPie() {

    const [pie, setPie] = useState([]);

    const loadPieChart = async () => {
        const result = await axios.get("http://localhost:4000/api/pie");
        console.log(result.data);
        setPie(result.data);
    }

    useEffect(() => {
        loadPieChart();
    }, [])

    return (
        <div>
            <ResponsiveContainer width={400} height={300}>
                <PieChart>
                    <Pie
                        dataKey="total"
                        isAnimationActive={false}
                        data={pie}
                        nameKey="etabCode"
                        cx={200}
                        cy={150}
                        innerRadius={70}
                        outerRadius={120}
                        fill="#8884d8"
                        label
                    />
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}
