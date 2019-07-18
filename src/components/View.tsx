import React, { Component } from 'react';

interface IMyProps {
  onPageChangeEdit: Function,
  onPageChange: Function,
}

interface IMyComponentState {
  data: Array<string>,
}

export default class View extends Component<IMyProps, IMyComponentState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
    }
  }

  onDeleteEvent = (id: number): void => {
    fetch('http://localhost:8080/beers/' + id, {
      method: 'DELETE'
    })
      .then(() => window.location.reload());
  }

  componentDidMount() {
    fetch('http://localhost:8080/beers')
      .then((response) => response.json())
      .then((data) => this.setState({ data: data._embedded.beers }))
  }

  render() {
    const { data } = this.state;
    return (
      <>
        <h1 className='tc'>Beers API Front-end</h1>
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Alcohol Percentage</td>
              <td colSpan={2}>Actions</td>
            </tr>
          </thead>
          <tbody>
            {
              data.map((beer: any, key: number) =>
                <tr key={key}>
                  <td>{beer.name}</td>
                  <td>{beer.strength}%</td>
                  <td>
                    <button onClick={
                      () => this.props.onPageChangeEdit('edit', beer._links.self.href[beer._links.self.href.length -1])
                    }>Edit</button>
                  </td>
                  <td>
                    <button onClick={
                      () => this.onDeleteEvent(beer._links.self.href[beer._links.self.href.length -1])
                    }>Delete</button>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
        <div className='tc'>
          <button className='mt-10' onClick={() => this.props.onPageChange('add')}>Add Beer</button>
        </div>
      </>
    );
  }
}
