import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@carbon/react'
import moment from 'moment'
import { useEffect, useState } from 'react'

const ConversationLog = ({}) => {
  const headers = ['날짜', '질문', '대답']
  const [conversationLog, setConversatinLog] = useState({
    success: false,
    conversations: [
      {
        id: '',
        request: '',
        response: '',
        createdAt: '',
      },
    ],
  })

  const fetchConversationLog = async () => {
    await fetch('https://pluto3.shutupandtakemy.codes/conversations', {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
      .then((res) => res.json())
      .then((res) => setConversatinLog(res))
  }

  useEffect(() => {
    fetchConversationLog()
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
          {conversationLog.success === true &&
            conversationLog.conversations.map((row) => (
              <TableRow id={row.id}>
                <TableCell>
                  {moment(row.createdAt).format('YYYY년 MM월 DD일')}
                </TableCell>
                <TableCell>{row.request}</TableCell>
                <TableCell>{row.response}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  )
}

export default ConversationLog
