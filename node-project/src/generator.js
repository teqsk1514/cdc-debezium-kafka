const { generateJson } = require('json-generator');


const generateJsonMessage = () => generateJson({
  id: "id;objectId",
  currentJob: {
    title: "Developer",
    salary: "mask;"
  },
  maxRunDistance: "float;1;20;1",
  cpf: "cpf",
  cnpj: "cnpj",
  pretendSalary: "money",
  age: "int;20;80",
  gender: "gender",
  firstName: "firstName",
  lastName: "lastName",
  phone: "maskInt;+55 (83) 9####-####",
  address: "address",
  hairColor: "color"
})

const generator = async ({ dbConnection, collectionName, flushTime, printMessage, messageCount }) => {
  const collection = dbConnection.collection(collectionName);

  let i = 0

  const intervalId = setInterval(async () => {
		try {
			const insertMessage = await collection.insertMany([generateJsonMessage()]);

      if (printMessage) {
        console.log('Inserted documents =>', insertMessage);
      }

      if (messageCount === -1) {
        i++  
      } else {
        i < messageCount - 1  ? i++ : clearInterval(intervalId)
      }

			
		} catch (err) {
			console.error("could not write message " + err)
		}
	}, flushTime)
}

module.exports = generator