"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Country {
    country: string;
    currency: string;
    abbreviation: string;
}

const countries: Country[] = [
    {
        "country": "Germany",
        "currency": "Euro",
        "abbreviation": "EUR"
    },
    {
        "country": "England",
        "currency": "Pound Sterling",
        "abbreviation": "GBP"
    },
    {
        "country": "France",
        "currency": "Euro",
        "abbreviation": "EUR"
    }
];

export default function Test() {

    let [value, setValue] = useState<string>('');
    const [displayValue, setDisplayValue] = useState<string>('');

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setValue(event.target.value);
    }

    const handleButtonClick = () => {
        setDisplayValue(value)
    }


     const handleClear = () => {
        setDisplayValue("");
     }


    const selectedCountry = countries.find(c => c.country === displayValue);


    return (
        <>
            <h1>Test screen</h1>
            <select onChange={handleSelectChange} >
                {countries.map((country) => (
                    <option key={country.country} value={country.country}>
                        {country.country}
                    </option>
                ))}
            </select>
            {/* <select value={value}>
                <option value="Germany">Germany</option>
                <option value="England">England</option>
                <option value="France">France</option>
            </select> */}
            <button onClick={handleButtonClick}>Click here</button>
            <button onClick={handleClear}>clear</button>
            <input placeholder="enter value to change">
            
            </input>
            <p>Selected: {displayValue}</p>
            {
                displayValue && (

                <table>
                    <thead>
                        <th>Country</th>
                        <th>currency</th>
                        <th>abbreviation</th>
                    </thead>
                    <tbody>
                        {
                            selectedCountry &&
                            (
                                <tr>
                                    <td>{selectedCountry.country}</td>
                                    <td>{selectedCountry.currency}</td>
                                    <td>{selectedCountry.abbreviation}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                )
            }
        </>
    )
}