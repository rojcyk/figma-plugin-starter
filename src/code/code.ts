import io from 'figmaio/code'

import { APP_START } from '../constants/events'

const main = async () => {
  figma.showUI(__html__, {
    width: 360,
    height: 500
  })

  /* When launching the plugin, figma sets a command 
   * if it standard launch, the command is empty
   * if it is launched from the edit button, it says "edit"
   */
  switch (figma.command) {
    /* so far, we don't differentiate */
    default:
      /* Finally, sending the actual data over to the client */
      io.send(APP_START, {
          cool: true
      })
      break
  }
}

main()
