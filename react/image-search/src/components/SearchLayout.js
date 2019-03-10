import React from "react";
import {  debounce } from "throttle-debounce";


export default class SearchLayout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ""
		};
		this.updateSearchValue = this.updateSearchValue.bind(this);
		// debouncing user search for 500 ms
		this.emitChangeDebounced = debounce(500,this.emitChange);
	}

	componentWillUnmount() {
		this.emitChangeDebounced.cancel();
	}

	// get search value function
	updateSearchValue(e){
		// get search value;
		let value = e.target.value;

		// set search value 
		this.setState({
			value: value
		},() => {
			this.emitChangeDebounced(this.state.value);
		})
	}

	emitChange(value){
		// passing search value to parent
		this.props.getSearchValue(this.state.value);
	}


	render() {
		let isSearchDisabled = this.state.value.length === 0;

		return (
			<form
			className="search-bar"
			onSubmit={this.emitChange}
			>

			<input
			className="search-bar__input"
			placeholder="Hey! try some flickers"
			value={this.state.value}
			onChange={this.updateSearchValue}
			/>
			<button
			className="search-bar__button"
			disabled={isSearchDisabled}
			>
			<i className="fa fa-search"></i>	
			Search
			</button>
			</form>
			);
		}
	}
