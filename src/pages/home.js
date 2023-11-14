import { useEffect, useRef, useState } from 'react'
import banner from '../assets/banner.png'
import EventLog from '../components/eventLog'
import Schedule from '../components/schedule'
import ConversationLog from '../components/conversation'

const Home = () => {
  const useInterval = (callback, delay) => {
    const savedCallback = useRef(null)

    useEffect(() => {
      savedCallback.current = callback
    }, [callback])

    useEffect(() => {
      const executeCallback = () => {
        savedCallback.current()
      }

      const id = setInterval(executeCallback, delay)

      return () => clearInterval(id)
    }, [])
  }

  return (
    <div>
      <div className="row">
        <img src={banner} className="banner" alt="banner" />
      </div>
      <div className="row">
        <div className="live-cam">
          <h3>실시간 이용자 상황</h3>
          <img
            src="http://10.243.223.105:8000/video_feed1/"
            // src="https://dummyimage.com/1600x900/000000/fff.png"
            className="broadcast"
            alt="m-jpeg 브로드 캐스팅"
          />
        </div>
        <div className="event-log">
          <h3>이용자 이벤트 로그</h3>
          <EventLog />
        </div>
      </div>
      <div className="row">
        <div className="conversation-log">
          <h3>대화 로그</h3>
          <ConversationLog />
        </div>
        <div className="schedule-log">
          <h3>일정 관리</h3>
          <Schedule />
        </div>
      </div>
    </div>
  )
}

export default Home
