import styled from 'styled-components'


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  width: min(95vw, 1440px);
`

export const VideosWrapper = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 16px;
  height: 100vh;
`

export const VideoCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 14px;
  font-weight: 600;
`