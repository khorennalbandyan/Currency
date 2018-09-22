import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../Loader/Loader'
import * as actionCreators from '../../store/actions/actions';
import classes from './AllCurrencyes.css'

class AllCurrencyes extends Component {
    componentDidMount() {
        this.props.getFullList()
        
    }


   

    render() {
        if (!this.props.fullList) {
            return <Loader />
        }
        const listSorted = [];
        this.props.fullList.forEach((itemFrom, index) => {
            const elem =  (
                <div key={index} className="col-2">
                    <ul className={classes.List} key={itemFrom.title}>
                        <li>
                        <i onClick={() => this.props.makeFavoriteAct(index.toString())} 
                            className={this.props.makeFavorite.includes(index.toString()) ?
                                `fas fa-star pr-3 ${classes.ChoosenTrue} ` :
                                `fas fa-star pr-3 ${classes.ChoosenFalse} `}>
                            </i><span className={classes.Title}>{itemFrom.title}</span></li>
                        {itemFrom.data.map((itemTo) => {
                            return <li key={itemTo.title}><span className={classes.Text}>{itemTo.title} - {itemTo.data}</span> </li>
                        })}
                    </ul>
                </div>
            );
            if(this.props.makeFavorite.includes(index.toString())){
                listSorted.unshift(elem);
            } else {
                listSorted.push(elem);
            }
        });
        return (
            <div className="row">
              { listSorted}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        fullList: state.fullList,
        makeFavorite: state.favorite
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getFullList: () => dispatch(actionCreators.loadAllData()),
        makeFavoriteAct: (index) => dispatch(actionCreators.makeFavorite(index))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCurrencyes);