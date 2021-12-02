import { MyButton } from '../../../../components/MyButton/MyButton'
import * as Styles from './RoomListStyles'

const RoomList = ({ rooms = [], roomHandler }) => {
  return (
    <Styles.Container>
      {rooms.map((r, idx) => (
        <Styles.RoomCard key={`ROOM_CARD_${idx}`}>
          <Styles.RoomName>{r}</Styles.RoomName>
          <MyButton label={`Join room`} onClick={() => roomHandler({ roomId: r })} />
        </Styles.RoomCard>
      ))}
    </Styles.Container>
  )
}

export default RoomList

