import React, { Component } from 'react';

interface IMyProps {
  onPageChange: Function,
}

interface IMyComponentState {
  name: string,
  strength: number,
}

export default class Table extends Component<IMyProps, IMyComponentState> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: '',
      strength: 0,
    };
  }

  onAddEvent = (): void => {
    const { name, strength } = this.state;
    fetch('http://localhost:8080/beers', {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      method: 'POST',
      body: JSON.stringify({
        name: name,
        strength: strength,
      }),
    })
      .then((response) => console.log(response))
      .then(() =>
        this.timeout()
      );
  };

  timeout = () => {
    setTimeout(() => {
      this.props.onPageChange('view')
    }, 1000 / 60);
  }

  onNameChange = (event: any): void => {
    this.setState({
      name: event.target.value,
    });
  }

  onStrengthChange = (event: any): void => {
    this.setState({
      strength: event.target.value,
    });
  }

  render() {
    return (
      <>
        <h1 className='tc'>Beer API POST Example</h1>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>
                <input type='text' onChange={(event) => this.onNameChange(event)}></input>
              </td>
            </tr>
            <tr>
              <td>Alcohol Percentage</td>
              <td>
                <input type='number' onChange={(event) => this.onStrengthChange(event)}></input>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2} className='tc'>
                <button onClick={() => this.props.onPageChange('view')}>Back</button>
                &nbsp;
              <button onClick={() => this.onAddEvent()}>Add</button>
              </td>
            </tr>
          </tfoot>
        </table>
      </>
    );
  }
}
