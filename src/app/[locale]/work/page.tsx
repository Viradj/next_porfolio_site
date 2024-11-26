"use client";

import { useState, useEffect } from "react";
import { Flex } from "@/once-ui/components";
import { Bar } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Import Chart.js components
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";

// Register components for Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Work() {
    const [chartData, setChartData] = useState<any>(null);
    const [tableData, setTableData] = useState<
        { price: number; date: string; hour: string; difference: number; isAboveAverage: boolean }[]
    >([]);
    const [averagePrice, setAveragePrice] = useState(0);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const hiddenMultiplier = 1.0; // Adjust multiplier as needed

    const fetchData = async (date: Date) => {
        setLoading(true);
        try {
            // Convert the selected date to start and end of the day in ISO format
            const startISO = new Date(date.setHours(0, 0, 0, 0)).toISOString();
            const endISO = new Date(date.setHours(23, 59, 59, 999)).toISOString();

            const apiUrl = `https://api.energyzero.nl/v1/energyprices?fromDate=${startISO}&tillDate=${endISO}&interval=4&usageType=1&inclBtw=true`;
            const response = await fetch(apiUrl);
            const data = await response.json();

            const prices = data.Prices || [];
            const adjustedPrices = prices.map((entry: any) => {
                const utcDate = new Date(entry.readingDate);
                const localDate = new Date(
                    utcDate.toLocaleString("en-US", {
                        timeZone: "Europe/Amsterdam",
                    })
                );

                return {
                    price: entry.price * hiddenMultiplier + 0.13, // Apply multiplier and adjustment
                    date: localDate.toLocaleDateString("en-GB"),
                    hour: localDate.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
                };
            });

            // Calculate average price
            const avgPrice =
                adjustedPrices.reduce((sum: number, entry: any) => sum + entry.price, 0) /
                adjustedPrices.length;
            setAveragePrice(avgPrice);

            const labels = adjustedPrices.map((entry: any) => entry.hour);
            const values = adjustedPrices.map((entry: any) => entry.price);
            const colors = adjustedPrices.map((entry: any) =>
                entry.price > avgPrice ? "rgba(255, 99, 132, 0.8)" : "rgba(75, 192, 192, 0.8)" // Red for above avg, green for below avg
            );

            // Set chart data
            setChartData({
                labels,
                datasets: [
                    {
                        label: "",
                        data: values,
                        backgroundColor: colors,
                        borderColor: colors.map((color: string) => color.replace("0.8", "1")),
                        borderWidth: 1,
                    },
                ],
            });

            // Set table data with price comparison
            const table = adjustedPrices.map((entry: any) => ({
                ...entry,
                difference: entry.price - avgPrice, // Calculate difference from average
                isAboveAverage: entry.price > avgPrice,
            }));
            setTableData(table);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(selectedDate); // Fetch data for the initial date
    }, [selectedDate]);

    return (
        <Flex fillWidth maxWidth="m" direction="column" alignItems="center" padding="l">
            {/* Title and Description */}
            <h1 style={{ color: "#cddc39", fontSize: "1.5rem" }}>ANWB Price Tracker</h1>
            <p style={{ color: "#90a4ae", fontSize: "1rem", textAlign: "center" }}>
                View adjusted daily energy prices with taxes included for a realistic view.
            </p>

            {/* Date Selector */}
            <div
                style={{
                    marginBottom: "1rem",
                    display: "flex",
                    gap: "1rem",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <label style={{ color: "#90a4ae", fontSize: "1rem" }}>Select Date:</label>
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date as Date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Pick a date"
                    className="modern-date-picker"
                    style={{
                        padding: "0.5rem",
                        borderRadius: "5px",
                        border: "1px solid #90a4ae",
                        backgroundColor: "#263238",
                        color: "#ffffff",
                    }}
                />
            </div>

            {loading ? (
                <p style={{ color: "#f0f4c3" }}>Loading data...</p>
            ) : chartData ? (
                <>
                    {/* Average Price Display */}
                    <p style={{ color: "#cddc39", fontSize: "1.25rem" }}>
                        Average Price per kWh: €{averagePrice.toFixed(2)}
                    </p>

                    {/* Bar Chart */}
                    <div style={{ width: "100%", maxWidth: "600px", height: "400px" }}>
                        <Bar
                            data={chartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    tooltip: {
                                        callbacks: {
                                            label: function (context: any) {
                                                return `€${context.raw.toFixed(2)}`;
                                            },
                                        },
                                    },
                                    legend: {
                                        display: false, // Remove legend
                                    },
                                },
                                scales: {
                                    x: {
                                        title: {
                                            display: true,
                                            text: "Time",
                                            color: "#b0bec5",
                                        },
                                        ticks: {
                                            color: "#eceff1",
                                        },
                                    },
                                    y: {
                                        title: {
                                            display: true,
                                            text: "Price (€/kWh)",
                                            color: "#b0bec5",
                                        },
                                        ticks: {
                                            color: "#eceff1",
                                            callback: function (value) {
                                                return `€${value}`;
                                            },
                                        },
                                    },
                                },
                            }}
                        />
                    </div>

                    {/* Table Display */}
                    <table
                        style={{
                            marginTop: "2rem",
                            width: "100%",
                            maxWidth: "600px",
                            color: "#eceff1",
                            borderCollapse: "collapse",
                        }}
                    >
                        <thead>
                            <tr style={{ borderBottom: "1px solid #b0bec5" }}>
                                <th style={{ padding: "0.5rem", textAlign: "left" }}>Hour</th>
                                <th style={{ padding: "0.5rem", textAlign: "left" }}>Price (€/kWh)</th>
                                <th style={{ padding: "0.5rem", textAlign: "left" }}>Difference</th>
                                <th style={{ padding: "0.5rem", textAlign: "left" }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((entry, index) => (
                                <tr key={index} style={{ borderBottom: "1px solid #37474f" }}>
                                    <td style={{ padding: "0.5rem" }}>{entry.hour}</td>
                                    <td style={{ padding: "0.5rem" }}>€{entry.price.toFixed(2)}</td>
                                    <td
                                        style={{
                                            padding: "0.5rem",
                                            color: entry.difference > 0 ? "red" : "green",
                                        }}
                                    >
                                        {entry.difference > 0 ? "+" : ""}€{entry.difference.toFixed(2)}
                                    </td>
                                    <td style={{ padding: "0.5rem" }}>
                                        {entry.isAboveAverage ? (
                                            <span style={{ color: "red" }}>▲</span>
                                        ) : (
                                            <span style={{ color: "green" }}>▼</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <p style={{ color: "#f0f4c3" }}>No data available for the selected date.</p>
            )}
        </Flex>
    );
}
