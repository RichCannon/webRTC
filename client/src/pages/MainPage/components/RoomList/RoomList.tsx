import { FC, memo } from 'react'
import { MyButton } from '../../../../components/MyButton/MyButton'
import { RoomT } from '../../MainPage'
import * as Styled from './RoomListStyles'



type RoomListP = {
  rooms: RoomT[]
  roomHandler: ({ roomId }: { roomId: string }) => void
}

const RoomList:FC<RoomListP> = ({ rooms = [], roomHandler }) => {

  return (
    <Styled.Container>
      {rooms.map(room => (
        <Styled.RoomCard key={`ROOM_CARD_${room.id}`}>
          <Styled.RoomName>{room.name}</Styled.RoomName>
          <Styled.RoomName>{room.numOfJoined}</Styled.RoomName>
          <MyButton label={`Join room`} onClick={() => roomHandler({ roomId: room.id })} />
        </Styled.RoomCard>
      ))}
    </Styled.Container>
  )
}

export default memo(RoomList)

