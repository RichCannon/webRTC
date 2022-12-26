const ACTIONS = {
   JOIN:'join',
   LEAVE: `leave`,
   SHARE_ROOMS: `share-rooms`, // Send all available rooms
   ADD_PEER: 'add-peer', // Creating new connection between clients
   REMOVE_PEER: 'remove-peer',
   RELAY_SDP: 'relay-sdp', // Passing stream media data (video and audio)
   RELAY_ICE: 'relay-ice', // Passing ice candidate (public ip, port etc. (NAT)). This is our physical connection
   ICE_CANDIDATE: 'ice-candidate',
   SESSION_DESCRIPTION: 'session-description',
   MUTE_TRACK: `mute-track`
   
}

export default ACTIONS