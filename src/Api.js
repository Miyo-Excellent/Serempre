//  Dependencies
import axios from 'axios';
import XMLParser from 'react-xml-parser';

function OnSuccess(data, status) {
  debugger;
}

function OnError(request, status, error) {
  debugger;
}

export default class SOAP {
  static async add({intA = 0, intB = 0}) {
    const url = 'http://www.dneonline.com/calculator.asmx?WSDL';
    let xml = `
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <Add xmlns="http://tempuri.org/">
            <intA>${intA}</intA>
            <intB>${intB}</intB>
          </Add>
        </soap:Body>
      </soap:Envelope>
    `;

    const xmlHeaders = {
      //  method: 'POST',
      Host: 'www.dneonline.com',
      'Content-Type': 'text/xml; charset=utf-8',
      'Content-Length': xml.length,
      SOAPAction: 'http://tempuri.org/Add',
    };

    let result = await axios.post(url, xml, {headers: xmlHeaders});

    if (result && result.data) {
      result = new XMLParser().parseFromString(result.data);
      result = parseInt(result.children[0].children[0].children[0].value);
    }

    return result;
  }
}
