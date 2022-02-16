/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { Aluno } from "./aluno";

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
	process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());

/**
 * Server Activation
 */

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);


	// CÓDIGO PARA ATENDER OS REQUERIMENTOS
	// R01, R02, R03, R04, R05
	const xl = require("excel4node");
	const wb = new xl.Workbook();
	const ws = wb.addWorksheet('Nome da Planilha');
	var prompt = require('prompt-sync')();
	let alunos: Array<Aluno> = [];

	var quant = prompt('Informe a quantidade de alunos? ');

	var nome: string;
	let nota: number;
	let idade: number;

	for (let i = 1; i <= quant; i++) {
		nome = prompt(`Nome do aluno(a): `);
		console.log("");
		nota = parseFloat(prompt(`Nota do(a) ${nome}: `));
		console.log("");
		idade = parseInt(prompt(`Qual a Idade de ${nome}: `));
		console.log("");

		alunos.push({
			nome: nome,
			idade: idade,
			nota: nota,
		});

	}
	console.log(alunos);
	console.log("");

	const ObjectsToCsv = require('objects-to-csv');

	(async () => {
		const csv = new ObjectsToCsv(alunos);

		await csv.toDisk('./alunos.csv');

		console.log(await csv.toString());
	})();
});


// var somanota = alunos.reduce((a, b) => a + b.nota, 0);

	// console.log("");
	// console.log(`A soma total das notas é: ${somanota}`);

	// const headingColumnNames =[
	// 	"Nome",
	// 	"Nota",
	// 	"Idade"
	// ];

	// let headingColumnIndex = 1;
	// headingColumnNames.forEach(heading => {
	// 	ws.cell(1, headingColumnIndex++).string(heading)
	// });

	// let rowIndex = 2;
	// alunos.forEach(record => {
	// 	let columnIndex = 1;
	// 	Object.keys(record).forEach(columnName =>{
	// 		ws.cell(rowIndex, columnIndex++).string(record[columnName]);

	// 	});
	// 	rowIndex++;
	// });

	// 	wb.write('arquivo.xlsx');
	// 	wb.write('arquivo.csv');