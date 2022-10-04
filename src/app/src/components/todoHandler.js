//todo code spilt
import { useEffect, useState } from 'react';
import axios from 'axios';
import { formFields, apiUrl } from './urlAndField';

export function TodoHandler(){
  const [fields,setFields] = useState(formFields);
  const [l1,setList] = useState([]);
  const apiURL = apiUrl.URL;
  //console.log(restURL)


  useEffect(() => {
    const getList = async () => {
      try {
        const result = await axios.get(apiURL);
        console.log(result);
        if (result.status === 200) {
          setList(result.data);
        }
      } catch (err) {
        console.log('Some error occurred!', err);
      }
    };
    getList();
  }, []);

  const  fieldsHandler = (e) => {
    const { name } = e.target;
    setFields((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const submissionHandler = () => {
   
    if (fields.task.length <= 0) {
      window.alert('Task cannot be empty!');
      return;
    }
    const data = { task: fields.task };
    axios
      .post(apiURL, data)
      .then((res) => {
        //data.date = res.data.date;
        setList((prev) => [...prev, data]);
        setFields(fields);
      })
      .catch((error) => {
        console.log(error);
      });
  };

return {fields,setFields,l1,setList, apiURL,fieldsHandler,submissionHandler}


}