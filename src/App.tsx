import React, { Component } from 'react';
import './App.css';
import View from './components/View';
import Edit from './components/Edit';
import Add from './components/Add';

interface IMyComponentState {
  page: string,
  id: number,
}
export default class App extends Component<any, any> {
  constructor(props: any){
    super(props);
    this.state = {
      page: 'view',
      id: 0,
    }
  }

  onPageChange = (page: string): void => {
    this.setState({
      page,
    });
  }

  onPageChangeEdit = (page: string, id: number): void => {
    this.setState({
      page,
      id,
    });
  }

  render() {
    const { page } = this.state;
    if(page === 'view') {
      return <View onPageChangeEdit={this.onPageChangeEdit} onPageChange={this.onPageChange}/>
    } else if (page === 'edit'){
      return <Edit id={this.state.id} onPageChange={this.onPageChange}/>
    }
    return <Add onPageChange={this.onPageChange}/>
    
  }
}