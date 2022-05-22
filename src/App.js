import {  useState } from 'react'
import {  database } from './firebase';
import styles from './styles.css';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
export default function Home() {
  const [ID, setID] = useState(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState(null);
  const [fireData, setFireData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const databaseRef = collection(database, 'CRUD Data');
 

  const addData = () => {
    addDoc(databaseRef, {
      name: name,
      age: Number(age)
    })
      .then(() => {
        alert('Data Sent')
        getData()
        setName('')
        setAge(null)
      })
      .catch((err) => {
        console.error(err);
      })
  }

  const getData = async () => {
    await getDocs(databaseRef)
      .then((response) => {
        setFireData(response.docs.map((data) => {
          return { ...data.data(), id: data.id }
        }))
      })
  }

  const getID = (id, name, age) => {
    setID(id)
    setName(name)
    setAge(age)
    setIsUpdate(true)
  }

  const updateFields = () => {
    let fieldToEdit = doc(database, 'CRUD Data', ID);
    updateDoc(fieldToEdit, {
      name: name,
      age: Number(age)
    })
    .then(() => {
      alert('Data Updated')
      getData()
      setName('')
      setAge(null)
      setIsUpdate(false)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const deleteDocument = (id) => {
    let fieldToEdit = doc(database, 'CRUD Data', id);
    deleteDoc(fieldToEdit)
    .then(() => {
      alert('Data Deleted')
      getData()
    })
    .catch((err) => {
      alert('Cannot Delete that field..')
    })
  }

  
  return (
    <div className={styles.container}>


      <main className={styles.main}>
        <div>
        </div>
        <h1>Home</h1>

        <input
          placeholder='Name'
          className={styles.inputBox}
          type="text"
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <input
          placeholder='Age'
          className={styles.inputBox}
          type="number"
          value={age}
          onChange={event => setAge(event.target.value)}
        />

        {isUpdate ? (
          <button
            className={styles.button}
            onClick={updateFields}
          >
            UPDATE
          </button>
        ) : (
          <button
            className={styles.button}
            onClick={addData}
          >
            ADD
          </button>
        )}

        <div>
          {fireData.map((data) => {
            return (
              <div className={styles.flex}>
                <h3>Name: {data.name}</h3>
                <p>Age: {data.age}</p>
                <button
                  className={styles.button}
                  onClick={() => getID(data.id, data.name, data.age)}
                >Update</button>
                <button
                  className={styles.button}
                  onClick={() => deleteDocument(data.id)}
                >Delete</button>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}