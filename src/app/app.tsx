import * as React from 'react'
import styled from 'styled-components'

import { GlobalStyles } from './globalStyles'

// ******************** //
// APP MAIN CLASS
// ******************** //

const Main = styled.main`
  position: relative;
  width: 100%;
  height: 100%;
`

export default class App extends React.Component<{}, {}> {
  public constructor(props: {}) {
    super(props)
  }


  // ************************************************ //
  // Main render method
  // ************************************************ //

  public render(): React.ReactNode {
    return (
      <Main>
        <GlobalStyles />

        Tmp

      </Main>
    )
  }
}