import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService'

export class FetchBank extends Component {
  static displayName = FetchBank.name;

  constructor(props) {
    super(props);
    this.state = { banks: [], loading: true };
  }

  componentDidMount() {
    this.populateBankData();
  }

  static renderBanksTable(banks) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>ID</th>
            <th>BankName</th>
          </tr>
        </thead>
        <tbody>
          {banks.map(bank =>
            <tr >
              <td>{bank}</td>
              <td>{bank}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchBank.renderBanksTable(this.state.banks);

    return (
      <div>
        <h1 id="tabelLabel" >Bank List</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  async populateBankData() {
    const token = await authService.getAccessToken();
      const response = await fetch('banks/1', {
      headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
    });
    console.log(response);
      const data = await response.json();
      console.log(data);
    this.setState({ banks: data, loading: false });
  }
}
