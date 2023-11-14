import {
  Button,
  DatePicker,
  DatePickerInput,
  TableContainer,
  TableToolbarContent,
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableToolbarSearch,
  TableBody,
  TableCell,
} from '@carbon/react'
import moment from 'moment/moment'
import { useEffect, useState } from 'react'

const Schedule = () => {
  const headers = ['일정 날짜', '일정 정보', '등록 날짜']
  const [schedule, setSchedule] = useState({
    success: false,
    schedules: [
      {
        id: '',
        content: '',
        date: '',
        createdAt: '',
      },
    ],
  })
  const [date, setDate] = useState('')
  const [text, setText] = useState('')

  const fetchSheduleLog = async (date2) => {
    await fetch(
      'https://pluto3.shutupandtakemy.codes/schedules?date=' +
        moment(date2).format('YYMMDD'),

      {
        method: 'GET',
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      }
    )
      .then((res) => res.json())
      .then((res) => setSchedule(res))
    // .then((res) => console.log(res))
  }

  const addSchedule = async () => {
    console.log(date, text)
    await fetch('https://pluto3.shutupandtakemy.codes/schedules', {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date: moment(date).format('YYMMDD'),
        content: text,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) console.log('성공')
      })
      .then(() => fetchSheduleLog(date))
      .catch((err) => console.log(err))
  }

  const onChangeDate = (e) => {
    setDate(e[0])
    fetchSheduleLog(e[0])
  }

  const onInputChange = (e) => {
    setText(e.target.value)
  }

  useEffect(() => {
    const now = moment()
    fetchSheduleLog(now)
  }, [])

  return (
    <>
      <TableContainer title="사용자 일정 관리">
        <TableToolbarContent>
          <DatePicker
            dateFormat="Y/m/d"
            datePickerType="single"
            onChange={onChangeDate}
          >
            <DatePickerInput
              id="date-picker-calendar-id"
              placeholder="년/월/일"
              type="text"
              size="md"
            />
          </DatePicker>
          <TableToolbarSearch
            label="asdf"
            // tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
            onChange={onInputChange}
          />
          <Button onClick={addSchedule}>일정 추가</Button>
        </TableToolbarContent>

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
          <TableBody className="schedule">
            {schedule.success === true && schedule.schedules.length > 0 ? (
              schedule.schedules.map((row) => (
                <TableRow id={row.id}>
                  <TableCell>
                    {moment(row.date, 'YYMMDD').format('YYYY년 MM월 DD일')}
                  </TableCell>
                  <TableCell>{row.content}</TableCell>
                  <TableCell>
                    {moment(row.createdAt).format('YYYY년 MM월 DD일')}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>등록된 일정이 존재하지 않습니다.</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Schedule
