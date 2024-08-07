
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHistory } from '@fortawesome/free-solid-svg-icons';
// import Loader from '../Components/Loader.js';
// import '../CSS/SearchPage.css';

// const SearchPage = () => {
//   const [query, setQuery] = useState('');
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState('');
//   const [isPanelOpen, setIsPanelOpen] = useState(false);
//   const [expandedItem, setExpandedItem] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [history, setHistory] = useState([]);

//   const apiEndpoint = 'http://localhost:5000/api/search';
//   const apiHistoryEndpoint = 'http://localhost:5000/api/search/history';

//   useEffect(() => {
//     fetchHistory();
//   }, []);

//   const fetchHistory = async () => {
//     try {
//       const response = await axios.get(`${apiHistoryEndpoint}/all`);
//       console.log("Fetched history:", response.data);
//       setHistory(response.data);
//     } catch (error) {
//       console.error('Error fetching history:', error);
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setError('');
//     setResult(null);
//     setLoading(true);

//     try {
//       const response = await axios.post(apiEndpoint, { query });
//       const result = response.data.result;
//       const resultString = typeof result === 'string' ? result : JSON.stringify(result);
//       await saveQuery(query, resultString);
//     } catch (error) {
//       setError('An error occurred while fetching data.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const saveQuery = async (query, result) => {
//     try {
//       await axios.post(`${apiHistoryEndpoint}/save`, { query, result }, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
//       fetchHistory();
//     } catch (error) {
//       console.error('Error saving query:', error);
//     }
//   };

//   const toggleHistoryPanel = () => {
//     setIsPanelOpen(!isPanelOpen);
//   };

//   const handleToggleExpand = (index, date) => {
//     setExpandedItem(expandedItem === index ? null : index);
//     setSelectedDate(expandedItem === index ? null : date);
//   };

//   const getRelativeDateLabel = (date) => {
//     const today = new Date();
//     const diffInMs = today - new Date(date);
//     const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

//     if (diffInDays === 0) return "Today:)";
//     if (diffInDays === 1) return "Yesterday:)";
//     if (diffInDays <= 7) return `${diffInDays} Days Ago:)`;
//     if (diffInDays <= 30) return "This Month:)";
//     if (diffInDays <= 60) return "Last Month:)";
//     return "Older";
//   };

//   const groupByDate = (data) => {
//     return data.reduce((acc, item) => {
//       const dateLabel = getRelativeDateLabel(item.timestamp);
//       if (!acc[dateLabel]) {
//         acc[dateLabel] = [];
//       }
//       acc[dateLabel].push(item);
//       return acc;
//     }, {});
//   };

//   const groupedHistory = groupByDate(history);
//   const filteredQueries = selectedDate ? groupedHistory[selectedDate] : [];

//   return (
//     <div className="search-page">
//       <div className={`history-panel ${isPanelOpen ? 'open' : ''}`}>
//         <h2>Search History</h2>
//         <div className="history-content">
//           {Object.keys(groupedHistory).map((label, index) => (
//             <div key={index} className="history-date-group">
//               <h3>{label}</h3>
//               <ul>
//                 {groupedHistory[label].map((item, idx) => (
//                   <li
//                     key={item._id}
//                     onClick={() => handleToggleExpand(idx, label)}
//                   >
//                     <strong>Query:</strong> {item.query}
//                     {expandedItem === idx && (
//                       <>
//                         <br />
//                         <strong>Output🤖:</strong> {item.result}
//                       </>
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="history-toggle" onClick={toggleHistoryPanel}>
//         <FontAwesomeIcon icon={faHistory} />
//       </div>
//       <div className="main-content">
//         <h2>Search Page</h2>
//         <form className="search-form" onSubmit={handleSubmit}>
//           <input
//             type="text"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             placeholder="Enter your search query"
//           />
//           <button type="submit">Search</button>
//         </form>
//         {selectedDate && (
//           <div className="selected-date-queries">
//             <h3>Queries from {selectedDate}</h3>
//             <ul>
//               {filteredQueries.map((item) => (
//                 <li key={item._id}>
//                   <strong>Query:</strong> {item.query}<br />
//                   <strong>Output:</strong> {item.result}<br />
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//         {loading && <Loader />}
//         {error && <p className="error-message">{error}</p>}
//         {result && (
//           <div className="query-result">
//             <h3>Query:</h3>
//             <p>{query}</p>
//             <h3>Results😊:</h3>
//             <pre>{JSON.stringify(result, null, 2)}</pre>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchPage;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory } from '@fortawesome/free-solid-svg-icons';
import Loader from '../Components/Loader.js';
import '../CSS/SearchPage.css';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [selectedQuery, setSelectedQuery] = useState(null); // Add a state for selected history
  const [error, setError] = useState('');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const apiEndpoint = 'http://localhost:5000/api/search';
  const apiHistoryEndpoint = 'http://localhost:5000/api/search/history';

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${apiHistoryEndpoint}/all`);
      console.log("Fetched history:", response.data);
      setHistory(response.data);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setResult(null);
    setSelectedQuery(null); // Clear selected query when new search is made
    setLoading(true);

    try {
      const response = await axios.post(apiEndpoint, { query });
      const result = response.data.result;
      setResult(result); // Update result state
      const resultString = typeof result === 'string' ? result : JSON.stringify(result);
      await saveQuery(query, resultString);
    } catch (error) {
      setError('An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  const saveQuery = async (query, result) => {
    try {
      await axios.post(`${apiHistoryEndpoint}/save`, { query, result }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      fetchHistory();
    } catch (error) {
      console.error('Error saving query:', error);
    }
  };

  const toggleHistoryPanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const handleToggleExpand = (index, date) => {
    setExpandedItem(expandedItem === index ? null : index);
    setSelectedDate(expandedItem === index ? null : date);
  };

  const handleHistoryClick = (query, result) => {
    setQuery(query); // Update the query state
    setSelectedQuery({ query, result }); // Set the selected query and result for display
    setResult(null); // Clear the current search result
  };

  const getRelativeDateLabel = (date) => {
    const today = new Date();
    const diffInMs = today - new Date(date);
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today :)";
    if (diffInDays === 1) return "Yesterday :)";
    if (diffInDays <= 7) return `${diffInDays} Days Ago :)`;
    if (diffInDays <= 30) return "This Month :)";
    if (diffInDays <= 60) return "Last Month :)";
    return "Older";
  };

  const groupByDate = (data) => {
    return data.reduce((acc, item) => {
      const dateLabel = getRelativeDateLabel(item.timestamp);
      if (!acc[dateLabel]) {
        acc[dateLabel] = [];
      }
      acc[dateLabel].push(item);
      return acc;
    }, {});
  };

  const groupedHistory = groupByDate(history);
  const filteredQueries = selectedDate ? groupedHistory[selectedDate] : [];

  return (
    <div className="search-page">
      <div className={`history-panel ${isPanelOpen ? 'open' : ''}`}>
        <h2>Search History</h2>
        <div className="history-content">
          {Object.keys(groupedHistory).map((label, index) => (
            <div key={index} className="history-date-group">
              <h3>{label}</h3>
              <ul>
                {groupedHistory[label].map((item, idx) => (
                  <li
                    key={item._id}
                    onClick={() => handleHistoryClick(item.query, item.result)} // Use the handleHistoryClick function
                  >
                    <strong>Query:</strong> {item.query}
                    {expandedItem === idx && (
                      <>
                        <br />
                        <strong>Output 🤖:</strong> {item.result}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="history-toggle" onClick={toggleHistoryPanel}>
        <FontAwesomeIcon icon={faHistory} />
      </div>
      <div className="main-content">
        <h2>Search Page</h2>
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your search query"
          />
          <button type="submit">Search</button>
        </form>
        {selectedDate && (
          <div className="selected-date-queries">
            <h3>Queries from {selectedDate}</h3>
            <ul>
              {filteredQueries.map((item) => (
                <li key={item._id}>
                  <strong>Query:</strong> {item.query}<br />
                  <strong>Output:</strong> {item.result}<br />
                </li>
              ))}
            </ul>
          </div>
        )}
        {loading && <Loader />}
        {error && <p className="error-message">{error}</p>}
        {selectedQuery && ( // Render the selected query result
          <div className="query-result">
            <h3>Query:</h3>
            <p>{selectedQuery.query}</p>
            <h3>Results😊:</h3>
            <pre>{JSON.stringify(selectedQuery.result, null, 2)}</pre>
          </div>
        )}
        {result && ( // Render the new search result
          <div className="query-result">
            <h3>Query:</h3>
            <p>{query}</p>
            <h3>Results😊:</h3>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
