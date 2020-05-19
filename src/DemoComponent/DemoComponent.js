import React, { Component } from "react";
import IndexData from "./IndexData";
import _AmigosComponent from "../_AmigosComponent/_AmigosComponent";

class DemoComponent extends Component {

	state = {
		udemo: null,
		nombre: "",
		edad: 0,
		gustos: "",
		especifico: "",
		amigos: []
	} 

	static getDerivedStateFromProps(nextProps, prevState){
		if (nextProps.value !== prevState) {
			return { ...nextProps.value };
		}
	}

	_onChange = (param, value, Tipo) => {
		if (value != null) {
			const obj = {};
			obj[param] = Tipo(value);
			this.setState(obj, () => {
				const send = { target: { value: this.state } }
				this.props.onChange(send);
			});
		}
	}

	render(){
		return (
			<div className="row">
				<div className="col-12">
					<label>Nombre</label>
					<input 
						type="text"
						value={ this.state.nombre }
						onChange={({ target: { value } }) => {
							value = value.toUpperCase();
							this._onChange("nombre", value, String);
						}}
					/>
				</div>
				<div className="col-12">
					<label>Edad</label>
					<input 
						type="number"
						value={ this.state.edad }
						onChange={({ target: { value } }) => {
							this._onChange("edad", value, Number);
						}}
					/>
				</div>
				<div className="col-12">
					<_AmigosComponent
						value={ this.state.amigos }
						onChange={({ target: { value } }) => {
							this._onChange("amigos", value, Array);
						}}
					/>
				</div>
				<div className="col-12">
					<label>Gustos</label>
					<select
						onChange={({ target: { value } }) => {
							this._onChange("gustos", value, String);
						}}
					>
						{ 
							this._renderOptions(
								Object.keys(IndexData.gustos),
								this.state.gustos
							) 
						}
					</select>
				</div>
				<div className="col-12">
					<label>Especifico</label>
					<select
						onChange={({ target: { value } }) => {
							this._onChange("especifico", value, String);
						}}
					>
						{ 
							this._renderOptions(
								(
									this.state.gustos != "" ? 
									IndexData.gustos[this.state.gustos] :
									[]
								),
								this.state.especifico
							) 
						}
					</select>
				</div>
			</div>
		);
	}

	_renderOptions = (options, selected) => {
		const opts = [];
		const parametros_disabled = {};
		if (selected == "") {
			parametros_disabled["selected"] = "selected";
		}
		opts.push(
			<option disabled { ...parametros_disabled }>Seleccionar</option>
		);

		options.map((opt) => {
			const parametros = {};
			if (selected == opt) {
				parametros["selected"] = "selected";
			}
			opts.push(
				<option value={opt} { ...parametros }>{opt}</option>
			);
		});

		return opts;
	}
}

DemoComponent.defaultProps = {
	value: {},
	onChange: (...args) => {}
};

export default DemoComponent;