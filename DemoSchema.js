
const IndexData = {
	gustos: {
		"Autos": [ "Llantas", "Faros" ],
		"Musica": [ "Piano", "Bateria" ]
	}
}

const Amigos = new Schema({
	nombre: String
});

const Demo = new Schema({
	udemo: Number,
	nombre: String,
	edad: Number,
	gustos: { type: String, enum: Object.keys(IndexData.gustos) },
	especifico: String, // Despendiendo de gustos
	amigos: [ Amigos ]
});