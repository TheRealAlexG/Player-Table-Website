import React, { useState, useEffect } from 'react';
import axios from 'axios';
import kingLogo from './assets/King_logo.svg.png';
import './App.css';

function App() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterName, setFilterName] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 20;

  useEffect(() => {
    axios.get('http://localhost:8080/api/data')
      .then(response => {
        setPlayers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener los datos', error);
        setLoading(false);
      });
  }, []);

  const handleNameChange = (e) => {
    setFilterName(e.target.value);
  };

  const handleStatusChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };

  const filteredPlayers = players
    .filter(player => {
      return (
        
        (filterName ? player.name.toLowerCase().includes(filterName.toLowerCase()) : true) &&
        (filterStatus ? player.status === filterStatus : true)
      );
    })
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = filteredPlayers.slice(indexOfFirstPlayer, indexOfLastPlayer);

  const totalPages = Math.ceil(filteredPlayers.length / playersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="table-container">
      <img src={kingLogo} alt="King Logo" className="logo" />
      <h1>Table of Players </h1>
      <input
        type="text"
        placeholder="Filter by name"
        value={filterName}
        onChange={handleNameChange}
      />
      <select value={filterStatus} onChange={handleStatusChange}>
        <option value="">SEE ALL</option>
        <option value="COMPLETED">COMPLETED</option>
        <option value="ERROR">ERROR</option>
        <option value="CANCELED">CANCELED</option>
      </select>

      <div className="table-wrapper">
        <table border="1">
          <thead>
            <tr>
              <th onClick={() => handleSort('id')}>ID</th>
              <th onClick={() => handleSort('name')}>Name</th>
              <th>Status</th>
              <th>Description</th>
              <th>Delta</th>
              <th onClick={() => handleSort('createdOn')}>Created On</th>
            </tr>
          </thead>
          <tbody>
            {currentPlayers.map((player) => (
              <tr key={player.id}>
                <td>{player.id}</td>
                <td>{player.name}</td>
                <td>{player.status}</td>
                <td>{player.description}</td>
                <td>{player.delta}</td>
                <td>{new Date(player.createdOn).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div>
        <p>Developed by: <br />
        <a href="https://www.linkedin.com/in/alex-man-914377233/" target="_blank">Alex Man</a>
        <p>alexmanmichael@gmail.com</p>
        </p>
      </div>
    </div>
  );
}

export default App;
