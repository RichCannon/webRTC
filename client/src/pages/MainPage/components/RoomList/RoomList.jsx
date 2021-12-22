import { MyButton } from '../../../../components/MyButton/MyButton'
import * as Styles from './RoomListStyles'

const RoomList = ({ rooms = [], roomHandler }) => {

  console.log(`rooms`,rooms)

  return (
    <Styles.Container>
      {rooms.map(room => (
        <Styles.RoomCard key={`ROOM_CARD_${room.id}`}>
          <Styles.RoomName>{room.name}</Styles.RoomName>
          <Styles.RoomName>{room.numOfJoined}</Styles.RoomName>
          <MyButton label={`Join room`} onClick={() => roomHandler({ roomId: room.id })} />
        </Styles.RoomCard>
      ))}
    </Styles.Container>
  )
}

export default RoomList

