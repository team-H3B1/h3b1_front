import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@carbon/react'
import { useEffect, useState } from 'react'

const EventLog = () => {
  const headers = ['날짜', '이벤트유형']
  const [eventLog, setEventLog] = useState({
    success: false,
    alerts: [
      {
        id: '',
        message: '',
        createdAt: '',
      },
    ],
  })

  const fetchEventLog = async () => {
    await fetch('https://pluto3.shutupandtakemy.codes/cv', {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
      .then((res) => res.json())
      .then((res) => setEventLog(res))
    // .then((res) => console.log(res))
  }

  useEffect(() => {
    fetchEventLog()
  }, [])

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableHeader id={header.key} key={header}>
                {header}
              </TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {eventLog.success === true &&
            eventLog.alerts.map((row) => (
              <TableRow id={row.id}>
                <TableCell>{row.createdAt}</TableCell>
                <TableCell>{row.message}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  )
}

export default EventLog
