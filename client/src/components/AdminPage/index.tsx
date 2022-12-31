import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

interface IDataType {
  name: string
  userId: string
  data: {
    data: Buffer
  }
}
const AdminPage: React.FC = () => {
  const [data, setData] = useState<IDataType[]>([]);
  const navigate = useNavigate()

  const appendData = React.useCallback(() => {
    const token = localStorage.getItem('token') ?? ''
    fetch('api/', {
      headers: new Headers({
        Authorization: token
      })
    })
      .then((res) => res.json())
      .then((body) => {
        if(body.statusCode === 401) {
          navigate('/login')
        } else {
          setData(data.concat(body))
        }
      }).catch(err => {
        console.log('err', err)
      })
  }, [])

  React.useEffect(() => {
    appendData();
  }, [])

  return (
    <div style={{ padding: '48px' }}>
      <h3>User Data</h3>
      {data.map((each, index) => {
        const { name, userId, data } = each
        const uint8Array = new Uint8Array(data.data);
        const base64String = btoa(uint8Array.reduce((acc, i) => acc += String.fromCharCode.apply(null, [i]), ''))

        return (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px'}}>
            <div>{name}</div>
            <div>{userId}</div>
            <img width={100} height={100} src={`data:image/png;base64,${base64String}`} alt=""/>
          </div>
        )
        
      })}
    </div>
  )
};

export default AdminPage