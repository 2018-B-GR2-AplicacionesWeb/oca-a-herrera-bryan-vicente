// so.js

module.exports = {
	tipo:'privado',
	activo:true,
	version:'Windows7',
	imprimir:()=>{
		console.log(this.version);
	},
	archivos:[1,2,3],
	programas:[
		{
			nombre:'Excel',
			version:2017
		}
	]
};