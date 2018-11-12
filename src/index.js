import React from 'react'
import ReactDom from 'react-dom'
import './board.css'
import Axios from 'axios'

class Board extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			display: '0',
			readyToRefresh: false,
			operation: null,
			result: null,
			current: null,
			lastButton: '',

		}
	}

	getResult() {
		if (this.state.display == 'ERROR') return;
		switch(this.state.operation) {
			case '+':
				this.state.result += this.state.current;
				break;
			case '-':
				this.state.result -= this.state.current;
				break;
			case '*':
				this.state.result *= this.state.current;
				break;
			case '/':
				this.state.result /= this.state.current;
				break;
			case 'M':
				this.state.result %= this.state.current;
				break;
		}

		if (this.state.result > 999999999 || this.state.result < 0) {
			this.setState({
				display: 'ERROR',
				readyToRefresh: false,
				operation: null,
				result: null,
				current: null,
				lastButton: ''
			})
			return;
		} else {
			let resultStr = '' + this.state.result;

			if (resultStr.length > 9) {
				this.setState({display: resultStr.substring(0, 9)})
			} else {
				this.setState({display: '' + this.state.result})
			}
		}

	}

	addToDisplay(input) {
		let display = this.state.display;

		if (display.length < 9) {
			if (display == 0 && input != '.' && display.length<2)
				display = '';


			display += input == '.' && (display.includes('.') || display.length == 8) ? '' : input;
			this.setState({
				display: display,
				current: parseFloat(display),
				readyToRefresh: true
			});
		}
	}

	handleClick(input){
		switch (input) {
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9":
			case "0":
			case '.':
				if (this.state.display == 'ERROR') break;
				if (/[\*|\/|\-|+|M]/g.test(this.state.lastButton)) {
					this.setState({display: '0'}, function() {this.addToDisplay(input)});
				} else {
					this.addToDisplay(input);
				}

				this.setState({readyToRefresh: false})

				break;
			case 'C':
				this.setState({
					display: '0',
					readyToRefresh: false,
					current: null,
					result: null,
					operation: null
				})
				break;
			case '/':
			case '+':
			case '-':
			case '*':
			case 'M':

				if (this.state.readyToRefresh && this.state.operation != null) {
					this.getResult();
					this.setState({readyToRefresh: false})
				} else {
					this.setState({
						current: parseFloat(this.state.display),
						result: parseFloat(this.state.display)
					})
				}
				this.setState({ operation: input })
				break;
			case '=':
				if (this.state.operation != null) {
					this.getResult();
					this.setState({readyToRefresh: false})
				}
				break;
		}
		this.setState({lastButton: input})
	}

	render(){
		return (
			<div className = "mainDiv" >
				<div className = "header">
					<div className = "title"> Calculator </div>
				</div>
				<div className = "calculator">
					<div className = "display"> {this.state.display} </div>
					<button className = "misc_button c_button"
						onClick = {this.handleClick.bind(this, "C")}> C </button>
					<button className = "misc_button"
						onClick = {this.handleClick.bind(this, "M")}> MOD </button>
					<button className = "misc_button"
						onClick = {this.handleClick.bind(this, "/")}> / </button>
					<button className = "number_button"
						onClick = {this.handleClick.bind(this, "7")}> 7 </button>
					<button className = "number_button"
						onClick = {this.handleClick.bind(this, "8")}> 8 </button>
					<button className = "number_button"
						onClick = {this.handleClick.bind(this, "9")}> 9 </button>
					<button className = "misc_button"
						onClick = {this.handleClick.bind(this, "*")}> x </button>
					<button className = "number_button"
						onClick = {this.handleClick.bind(this, "4")}> 4 </button>
					<button className = "number_button"
						onClick = {this.handleClick.bind(this, "5")}> 5 </button>
					<button className = "number_button"
						onClick = {this.handleClick.bind(this, "6")}> 6 </button>
					<button className = "misc_button"
						onClick = {this.handleClick.bind(this, "-")}> - </button>
					<button className = "number_button"
						onClick = {this.handleClick.bind(this, "1")}> 1 </button>
					<button className = "number_button"
						onClick = {this.handleClick.bind(this, "2")}> 2 </button>
					<button className = "number_button"
						onClick = {this.handleClick.bind(this, "3")}> 3 </button>
					<button className = "misc_button"
						onClick = {this.handleClick.bind(this, "+")}> + </button>
					<button className = "number_button button_0"
						onClick = {this.handleClick.bind(this, "0")}> 0 </button>
					<button className = "number_button"
						onClick = {this.handleClick.bind(this, ".")}> . </button>
					<button className = "misc_button"
						onClick = {this.handleClick.bind(this, "=")}> = </button>
				</div>
			</div>
		)
	}
}

ReactDom.render(
	<Board />,
	document.getElementById('root')
)
