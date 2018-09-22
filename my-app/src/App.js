import React, { Component } from 'react';
import classes from './App.css';
import Loader from './components/Loader/Loader'
import { connect } from 'react-redux';
import * as actionCreators from './store/actions/actions';
import FromCurrencyList from './components/FromCurrency/FromCurrencyList';
import ToCurrencyList from './components/ToCurrency/ToCurrencyList';
import AllCurrencyes from './components/AllCurrencyes/AllCurrencyes';
import Aux from './Wrraper/Aux';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";


class App extends Component {
  state = {
    from: "BTC",
    to: "USD"
  }

  onChangeCurrency = (value, type) => {
    this.setState({
      [type]: value
    }, () => this.props.onGetAnswear(this.state.from, this.state.to))
  }

  componentDidMount() {
    this.props.onGetData()
    this.props.onGetAnswear(this.state.from,this.state.to)
  }

  render() {
    if (!this.props.data.data) {
      return <Loader />
    }

    return (
      <div className="container-fluid">
        <Router>
          <Aux>
            <div className="row justify-content-center pb-4 pt-4">
              <nav className="col-4 d-flex justify-content-around">
                  <div className=""><Link to="/"><span className={classes.Text}>Choose Currency</span></Link></div>
                  <div className=""><Link to="/all-list"><span className={classes.Text}>All List</span></Link></div>
              </nav>
            </div>
            <Switch>
              <Route path="/all-list" exact component={AllCurrencyes} />
              <Route path="/" exact render={() => (
                <div className="row justify-content-center">
                    <div className="col-6 pt-5">
                      <FromCurrencyList currency={this.props.data.data.fromCurrency} onChange={(value) => this.onChangeCurrency(value, 'from')} />
                    </div>
                    <div className="col-1 pt-5">
                      <ToCurrencyList currency={this.props.data.data.toCurrency} onChange={(value) => this.onChangeCurrency(value, 'to')} />
                    </div>
                  <div className="col-12 d-flex justify-content-center">
                    <h1 className={classes.Result}>{this.props.answer}</h1>
                  </div>
                </div>
              )} />
            </Switch>
          </Aux>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.data,
    answer: state.answer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetData: () => dispatch(actionCreators.loadData()),
    onGetAnswear: (from, to) => dispatch(actionCreators.loadAnswear(from, to))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
