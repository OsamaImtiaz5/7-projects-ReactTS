import { useEffect, useState, useCallback, useMemo } from "react";
import AppLayout from "../PersistentDrawer";
import MainContainer from "../MainContainer";

// API key and URL for fetching exchange rates
const APIKey = "6ad0c7eed4c217d3e5ae2a96";
const Url = `https://v6.exchangerate-api.com/v6/${APIKey}/latest/USD`;

// Define the structure of exchange rates (key-value pairs where key is currency code and value is rate)
interface ExchangeRates {
  [key: string]: number;
}

// Define the structure of the API response
interface ApiResponse {
  conversion_rates: ExchangeRates;
}

const CurrencyConverter = () => {
  const [amount1, setAmount1] = useState<number | null>(null);

  const [amount2, setAmount2] = useState<number | null>(null);

  const [currency1, setCurrency1] = useState<string>("USD");

  const [currency2, setCurrency2] = useState<string>("PKR");

  const [exchangeRate, setExchangeRate] = useState<ExchangeRates>({});

  const [error, setError] = useState<string | null>(null);

  // Function to fetch exchange rates from the API
  const fetchCurrency = useCallback(async () => {
    try {
      const response = await fetch(Url);

      // Check if the response is not OK (e.g., network error, invalid API key)
      if (!response.ok) {
        throw new Error("Failed to fetch exchange rates");
      }

      // Parse the response as JSON
      const data: ApiResponse = await response.json();

      // Update the exchange rates state with the fetched data
      setExchangeRate(data.conversion_rates);

      // Clear any previous errors
      setError(null);
    } catch (error) {
      // Log the error and set an error message for the user
      console.error("Error fetching API:", error);
      setError("Failed to fetch exchange rates. Please try again later.");
    }
  }, []); // Empty dependency array ensures this function is only created once

  // Fetch exchange rates when the component mounts
  useEffect(() => {
    fetchCurrency();
  }, [fetchCurrency]);

  // Function to convert an amount from one currency to another
  const convertCurrency = useCallback(
    (amount: number, fromCurrency: string, toCurrency: string): number => {
      // If both currencies are the same, return the original amount
      if (fromCurrency === toCurrency) return amount;

      // Calculate the conversion rate and return the converted amount
      const rate = exchangeRate[toCurrency] / exchangeRate[fromCurrency];
      return amount * rate;
    },
    [exchangeRate] // Recalculate if exchangeRate changes
  );

  // Update the second amount whenever amount1, currency1, or currency2 changes
  useEffect(() => {
    if (
      amount1 !== null && // Check if amount1 is not null
      amount1 !== undefined && // Check if amount1 is not undefined
      exchangeRate[currency1] && // Check if exchange rate for currency1 exists
      exchangeRate[currency2] // Check if exchange rate for currency2 exists
    ) {
      // Convert the amount and update amount2
      const convertedAmount = convertCurrency(amount1, currency1, currency2);
      setAmount2(convertedAmount);
    } else {
      // If any condition fails, set amount2 to null
      setAmount2(null);
    }
  }, [amount1, currency1, currency2, convertCurrency, exchangeRate]);

  // Memoize the list of currencies to avoid recalculating on every render
  const currencies = useMemo(() => Object.keys(exchangeRate), [exchangeRate]);

  return (
    <AppLayout>
      <MainContainer heading="Currency Converter">
        {/* Display error message if there's an error */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="flex flex-col mt-4 gap-8">
          <div className="bg-white rounded-2xl p-2">
            <select
              className="bg-red-400 text-white p-2 rounded-2xl mx-2 "
              value={currency1}
              onChange={(e) => setCurrency1(e.target.value)} // Update currency1 when the user selects a new currency
            >
              {/* Map through all available currencies and create options */}
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>

            <input
              type="number"
                // The ?? operator is called the nullish coalescing operator in JavaScript/TypeScript.
                // 
                // It returns the value on its left-hand side if that value is not null or undefined.
                // 
                // If the left-hand side value is null or undefined, it returns the value on its right-hand side.
              value={amount1 ?? ""} // Use empty string if amount1 is null
              onChange={(e) => setAmount1(parseFloat(e.target.value))} // Update amount1 when the user types
              className="outline-none border-b-2 focus:border-b-blue-700"
            />
          </div>

          <div className="bg-white rounded-2xl p-2">
            <select
              className="bg-green-400 text-white p-2 rounded-2xl mx-2"
              value={currency2}
              onChange={(e) => setCurrency2(e.target.value)} 
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>

            {/* Input field for the second amount (read-only) */}
            <input
              type="number"
              value={amount2 ?? ""} // Use empty string if amount2 is null
              readOnly // Prevent user from editing this field directly
              className="outline-none border-b-2 focus:border-b-blue-700"
            />
          </div>
        </div>
      </MainContainer>
    </AppLayout>
  );
};

export default CurrencyConverter;
